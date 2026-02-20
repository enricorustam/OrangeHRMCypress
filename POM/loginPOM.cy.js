import LoginPage from "pages/LoginPage";

describe("OrangeHRM Login Feature - POM Version", () => {

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  // TC01 - Valid Login
  it("TC01 - Valid Login", () => {
    cy.fixture("loginData").then((data) => {
      loginPage.login(data.validUser.username, data.validUser.password);

      cy.url().should("include", "dashboard");
      cy.contains("Dashboard").should("be.visible");
    });
  });

  // TC02 - Invalid Username
  it("TC02 - Invalid Username", () => {
    cy.fixture("loginData").then((data) => {
      loginPage.login(data.invalidUsername.username, data.invalidUsername.password);

      loginPage.errorMessage()
        .should("be.visible")
        .and("contain", "Invalid credentials");
    });
  });

  // TC03 - Invalid Password
  it("TC03 - Invalid Password", () => {
    cy.fixture("loginData").then((data) => {
      loginPage.login(data.invalidPassword.username, data.invalidPassword.password);

      loginPage.errorMessage()
        .should("be.visible")
        .and("contain", "Invalid credentials");
    });
  });

  // TC04 - Empty Username & Password
  it("TC04 - Empty Credentials", () => {
    loginPage.clickLogin();

    loginPage.requiredMessage()
      .should("have.length", 2);
  });

  // TC05 - Empty Username
  it("TC05 - Empty Username", () => {
    loginPage.fillPassword("admin123");
    loginPage.clickLogin();

    loginPage.requiredMessage()
      .should("contain", "Required");
  });

  // TC06 - Empty Password
  it("TC06 - Empty Password", () => {
    loginPage.fillUsername("Admin");
    loginPage.clickLogin();

    loginPage.requiredMessage()
      .should("contain", "Required");
  });

  // TC07 - Verify Login Page URL
  it("TC07 - Verify Login Page URL", () => {
    cy.url().should("include", "auth/login");
  });

  // TC08 - Verify Login Elements Visible
  it("TC08 - Verify Login UI Elements", () => {
    loginPage.usernameField().should("be.visible");
    loginPage.passwordField().should("be.visible");
    loginPage.loginButton().should("be.visible");
  });

});