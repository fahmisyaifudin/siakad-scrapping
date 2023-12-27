require("dotenv").config();

describe("template spec", () => {
  it("Get Nilai akademik", () => {
    cy.task("log", "Login SSO with " + Cypress.env("SSO_NRP"));

    cy.visit("http://akademik.its.ac.id/");
    cy.get("input#username").type(Cypress.env("SSO_NRP"));
    cy.get("button#continue").click();
    cy.get("input#password").type(Cypress.env("SSO_PASSWORD"));
    cy.get("button#login").click();

    cy.visit("https://akademik.its.ac.id/data_nilaipersem.php");
    const b = [];
    cy.get("form#sipform").each("table", ($row, i) => {
      cy.wrap($row)
        .find("tbody tr")
        .each(($row, j) => {
          const c = [];
          cy.wrap($row)
            .find("td")
            .each(($cell, cellIndex) => {
              const cellText = $cell.text();
              c.push(cellText);
            });
          b.push(c);
        });
    });

    cy.writeFile("dist/nilai.json", b);
  });
});
