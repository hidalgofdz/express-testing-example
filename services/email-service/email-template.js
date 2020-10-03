class EmailTemplate {
  constructor(fromEmail, to, subject, body) {
    this.to = to;
    this.from = fromEmail;
    this.subject = subject;
    this.body = body;
  }

  wow() {
    return this.to;
  }
}

module.exports = EmailTemplate;
