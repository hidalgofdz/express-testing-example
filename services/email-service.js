async function sendEmail(emailTemplate) {
  // send mail to real users D:
}

class EmailerTimeoutError extends Error {}

module.exports = {
  sendEmail,
  EmailerTimeoutError,
};
