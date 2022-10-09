beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe("POST: signUp", () => {
  it("should register a user", () => {
    const password = "Teste123";
    const user = {
      email: "teste@teste.com",
      password: password,
      confirmPassword: password,
    };

    cy.visit("http://localhost:5173/signup");
    cy.get("#email").type(user.email);
    cy.get("#password").type(password);
    cy.get("#confirmPassword").type(password);

    cy.intercept("POST", "http://localhost:5000/signup").as("signUp");
    cy.get("button").click();
    cy.wait("@signUp");

    cy.url().should("equal", "http://localhost:5173/");
  });
});
