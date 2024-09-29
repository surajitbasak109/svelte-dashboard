import queue from '$/config/queue';
import { CRM_QUEUE_TYPES } from '$/const';
import send_user_verification_link from '$/lib/mails/send_user_verification_link';
import Queue from 'bull';
import type { Job } from 'bull';

const { host, port } = queue.redis;

const crmQueue = new Queue('crm-queue', {
  redis: {
    host: host as string,
    port: port as number
  }
});

crmQueue.process(async (job: Job) => {
  const { type, data } = job.data;
  console.log({ type, data });

  const { SEND_VERIFICATION_LINK } = CRM_QUEUE_TYPES;

  switch (type) {
    case SEND_VERIFICATION_LINK:
      send_user_verification_link(data.email, data.verificationLInk);
      break;
    default:
      break;
  }
});

console.log('Worker started');

export default crmQueue;
