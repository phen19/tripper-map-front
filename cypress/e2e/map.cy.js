beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe("Login", () => {
  it("should mark state as gone", () => {
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
    cy.intercept("GET", "http://localhost:5000/map").as("getMap");
    cy.url().should("equal", "http://localhost:5173/map");
    cy.wait("@getMap");
    cy.get("#ac").click({ force: true });
    cy.contains("Já fui").click({ force: true });
    cy.get("#ac").should("have.css", "fill", "rgb(40, 98, 64)");
  });

  it("should mark state as wishlist", () => {
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
    cy.intercept("GET", "http://localhost:5000/map").as("getMap");
    cy.url().should("equal", "http://localhost:5173/map");
    cy.wait("@getMap");
    cy.get("#ac").click({ force: true });
    cy.contains("Quero ir").click({ force: true });
    cy.get("#ac").should("have.css", "fill", "rgb(108, 142, 159)");
  });
});
