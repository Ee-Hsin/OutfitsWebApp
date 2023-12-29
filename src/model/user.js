export class User {
  constructor(email = null, googleId = null) {
    this.email = email;
    this.googleId = googleId;
  }

  // Constructor with email
  static fromEmail(email) {
    return new User(email);
  }

  // Constructor with googleId
  static fromGoogleId(googleId) {
    return new User(null, googleId);
  }

  // Getter method to check if the user is a Google user
  get is_google_user() {
    return this.googleId !== null;
  }
}
