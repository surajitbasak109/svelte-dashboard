import send_user_verification_link from '$/lib/mails/send_user_verification_link';

export default function test_env_vars() {
  send_user_verification_link("surajitbasak109@gmail.com", "https://google.com");
}
