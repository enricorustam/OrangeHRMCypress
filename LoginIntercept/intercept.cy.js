describe("OrangeHRM Login Feature", () => {

  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });

  // TC01 - Valid Login
  it("TC01 - Login dengan credential valid", () => {
      cy.intercept("POST", "**/auth/validate").as("validLoginAPI");
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();

      cy.url().should("include", "dashboard");
      cy.contains("Dashboard").should("be.visible");
  });

  // TC02 - Username salah
  it("TC02 - Login dengan username salah", () => {
    cy.intercept("POST", "**/auth/validate").as("invalidUsernameAPI");
    cy.get('input[name="username"]').type("WrongUser");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });

  // TC03 - Password salah
  it("TC03 - Login dengan password salah", () => {
    cy.intercept("POST", "**/auth/validate").as("invalidPasswordAPI");
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("WrongPass");
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });

  // TC04 - Username dan Password kosong
  it("TC04 - Login tanpa mengisi apapun", () => {
    cy.intercept("GET", "**/auth/login").as("reloadLoginPage");
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  // TC05 - Username kosong
  it("TC05 - Login tanpa username", () => {
    cy.intercept("POST", "**/auth/validate").as("emptyUsernameAPI");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  // TC06 - Password kosong
  it("TC06 - Login tanpa password", () => {
    cy.intercept("POST", "**/auth/validate").as("emptyPasswordAPI");
    cy.get('input[name="username"]').type("Admin");
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  // TC07 - Verifikasi URL Login Page
  it("TC07 - Verifikasi URL login page", () => {
    cy.intercept("GET", "**/auth/login").as("loginPageLoad");
    cy.url().should("include", "auth/login");
  });

  // TC08 - Verifikasi elemen utama login tampil
  it("TC08 - Verifikasi elemen login tampil", () => {
    cy.intercept("POST", "**/auth/validate").as("loginAPI");
    cy.intercept("GET", "**/dashboard/**").as("dashboardLoad");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

});
