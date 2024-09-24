import queue from '$/config/queue';
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
  console.log(job.data);
});

console.log('Worker started');

export default crmQueue;
