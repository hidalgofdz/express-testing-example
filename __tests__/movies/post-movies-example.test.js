const request = require("supertest");
const app = require("../../app");
const NewsletterSubscriptionFactory = require("../../factories/newslettersubscriptions");
const { StatusCodes } = require("http-status-codes");
const { NewsletterSubscription } = require("../../models");
const { sendEmail } = require("../../services/email-service");
// As an admin, I want to add a movie to the system DONE
// As a subscribed user to the newsletter, I want to receive an email every time a new movie is added.

// MODELS
// Subscription
//  - email: string
//  - active: bool
// Movie
//  - name: string
//  - title: string

// Services
// Email service (./services/email-services.js)
//   methods: sendEmail

// Setup
// Given
// A set of preconditions
// When
// A request to the API is Send
// Then
// Validate
//   - Http status
//   - Response body structure
//   - Response body attributes
//   - Events or calls to third party services where called
