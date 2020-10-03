const { sendEmail } = require("./email-service");
const EmailTemplate = require("./email-service/email-template");
const SERVICE_EMAIL_THAT_SHOULD_BE_A_CONSTANT_OR_IN_DATABASE =
  "movie@service.com";

function createMovieEmailTemplate(subscriptions, movie) {
  const fromEmail = SERVICE_EMAIL_THAT_SHOULD_BE_A_CONSTANT_OR_IN_DATABASE;
  const toEmails = subscriptions.map((u) => u.email).join(",");
  const subject = `${movie.title} has arrived!`;
  const body = movie.description;
  return new EmailTemplate(fromEmail, toEmails, subject, body);
}

async function sendNewMovieEmail(subscriptions, movie) {
  const activeSubscribers = subscriptions.filter((u) => u.active);
  if (activeSubscribers.length === 0) {
    return;
  }
  // get list of suscriptions
  // prepare email
  // send email
  const newMovieEmail = createMovieEmailTemplate(activeSubscribers, movie);
  try {
    await sendEmail(newMovieEmail);
  } catch (error) {
    throw new UnavailableNotifierError();
  }
}

class UnavailableNotifierError extends Error {}
module.exports = { sendNewMovieEmail, UnavailableNotifierError };
