describe("ReqRes API Automation - QA Submission", () => {

  //  GET List Users
  it("GET - List Users (Page 2)", () => {
    cy.request("GET", "/users?page=2").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.page).to.eq(2);
      expect(res.body.data).to.have.length.greaterThan(0);
      expect(res.duration).to.be.lessThan(2000);
    });
  });

  //  GET Single User
  it("GET - Single User ID 2", () => {
    cy.request("GET", "/users/2").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.id).to.eq(2);
      expect(res.body.data.email).to.include("@reqres.in");
    });
  });

  //  GET User Not Found (Negative Test)
  it("GET - User Not Found", () => {
    cy.request({
      method: "GET",
      url: "/users/23",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  // POST Create User
  it("POST - Create User", () => {
    cy.request("POST", "/users", {
      name: "Enrico",
      job: "QA Engineer",
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.name).to.eq("Enrico");
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("createdAt");
    });
  });

  // PUT Update User
  it("PUT - Update User", () => {
    cy.request("PUT", "/users/2", {
      name: "Enrico Updated",
      job: "Senior QA",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq("Enrico Updated");
      expect(res.body).to.have.property("updatedAt");
    });
  });

  // PATCH Update User
  it("PATCH - Update User Job Only", () => {
    cy.request("PATCH", "/users/2", {
      job: "Lead QA",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.job).to.eq("Lead QA");
    });
  });

  // DELETE User
  it("DELETE - Delete User", () => {
    cy.request("DELETE", "/users/2").then((res) => {
      expect(res.status).to.eq(204);
    });
  });

  // POST Register Successful
  it("POST - Register Successful", () => {
    cy.request("POST", "/register", {
      email: "eve.holt@reqres.in",
      password: "pistol",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");
    });
  });

  // POST Register Unsuccessful (Negative)
  it("POST - Register Unsuccessful", () => {
    cy.request({
      method: "POST",
      url: "/register",
      failOnStatusCode: false,
      body: {
        email: "sydney@fife",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.exist;
    });
  });

});