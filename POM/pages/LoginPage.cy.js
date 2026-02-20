class LoginPage {

  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  }

  usernameField() {
    return cy.get('input[name="username"]');
  }

  passwordField() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('button[type="submit"]');
  }

  errorMessage() {
    return cy.get('.oxd-alert-content-text');
  }

  requiredMessage() {
    return cy.get('.oxd-input-field-error-message');
  }

  fillUsername(username) {
    this.usernameField().clear().type(username);
  }

  fillPassword(password) {
    this.passwordField().clear().type(password);
  }

  clickLogin() {
    this.loginButton().click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }
}

export default LoginPage;