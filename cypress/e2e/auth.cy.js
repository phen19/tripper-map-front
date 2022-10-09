beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe("Login", () => {
  it("should login successfully", () => {
    const password = "Teste123";
    const user = {
      email: "teste@teste.com",
      password: password,
      confirmPassword: password,
    };

    cy.request("POST", "http://localhost:5000/signup", user);

    cy.visit("http://localhost:5173");

    cy.get("#email").type(user.email);
    cy.get("#password").type(password);
    cy.intercept("POST", "http://localhost:5000/signin").as("signIn");
    cy.get("button").click();
    cy.wait("@signIn");
    cy.url().should("equal", "http://localhost:5173/map");
  });
});
