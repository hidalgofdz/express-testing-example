const NewsletterSubscriptionFactory = require("../factories/newslettersubscriptions");
const MovieFactory = require("../factories/movies");
const {
  sendNewMovieEmail,
  UnavailableNotifierError,
} = require("./newsletter-notifier-service");
const { sendEmail, EmailerTimeoutError } = require("./email-service");
const EmailTemplate = require("./email-service/email-template");

jest.mock("./email-service");
describe("NewsletterSubscription test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("email was send to all active subscribers", async () => {
    // Given
    sendEmail.mockResolvedValue(null);
    const subscription = NewsletterSubscriptionFactory.build({
      email: "first@email.com",
    });
    const subscription2 = NewsletterSubscriptionFactory.build({
      email: "second@email.com",
    });
    const subscription3 = NewsletterSubscriptionFactory.build({
      email: "thirdEmail.com",
      active: false,
    });
    const subscriptions = [subscription, subscription2, subscription3];
    const movie = MovieFactory.build();
    // a list of subscriber and a movie
    // When
    await sendNewMovieEmail(subscriptions, movie);
    // Then
    expect(sendEmail).toHaveBeenCalledTimes(1);
    const fromEmails = `${subscription.email},${subscription2.email}`;
    const sendEmailFirstArg = sendEmail.mock.calls[0][0];
    expect(sendEmailFirstArg).toBeInstanceOf(EmailTemplate);
    expect(sendEmailFirstArg).toHaveProperty("to", fromEmails);
    expect(sendEmailFirstArg).toHaveProperty(
      "subject",
      expect.stringContaining(movie.title)
    );
    expect(sendEmailFirstArg).toHaveProperty(
      "body",
      expect.stringContaining(movie.description)
    );
  });

  test("email was not send if there are no active subscribers", async () => {
    const subscription3 = NewsletterSubscriptionFactory.build({
      email: "thirdEmail.com",
      active: false,
    });
    const subscriptions = [subscription3];
    const movie = MovieFactory.build();
    // a list of subscriber and a movie
    // When
    await sendNewMovieEmail(subscriptions, movie);
    // Then
    expect(sendEmail).toHaveBeenCalledTimes(0);
  });

  test("throws UnavailableNotifierError when email notifier fails because bad connection", async () => {
    // Given
    sendEmail.mockRejectedValue(new EmailerTimeoutError());
    const subscription = NewsletterSubscriptionFactory.build({
      email: "first@email.com",
    });

    const movie = MovieFactory.build();
    // a list of subscriber and a movie
    // When
    await expect(async () => {
      await sendNewMovieEmail([subscription], movie);
    }).rejects.toThrowError(UnavailableNotifierError);
  });
});
