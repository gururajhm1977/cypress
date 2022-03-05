/// <reference types="@bahmutov/cy-api" />

describe("CRUD API", () => {
    let id;
    it("Create a member", () => {
        cy.api({
            url: "/api/articles?tag=welcome&limit=10&offset=0",
            method: "GET",

        }).then((res) => {

            cy.fixture('apiTest1Data.json').then(function (data) {

                expect(res.body.articles[0].slug).to.eql(data.articles[0].slug);

                // expect(res.body.articles[0].slug).to.eql("Welcome-to-RealWorld-project-1");
            })

        });
    });
});
