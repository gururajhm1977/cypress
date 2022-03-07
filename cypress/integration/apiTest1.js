/// <reference types="@bahmutov/cy-api" />

describe(" API sample test ", () => {
    let id;
    it.skip("Create a member", () => {
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

    it('create another api test with sample book ', function () {
        const baseURL = 'https://momo-book.herokuapp.com'
        const rand = new Date().getTime()
        const name = `Test Name ${rand}`

        cy.visit(baseURL + '/')
        cy.wait(2000)
        cy.get('.add-author').click()
        cy.wait(2000)

        cy.get('input[name=name]').type(`${name}{enter}`)
        cy.url().should('include', baseURL + '/')
        cy.get('td').should('contain', name)
    })

    it('create Auther api test...', function () {
        const baseURL = 'https://momo-book.herokuapp.com'
        const statusCode = 201
        const rand = new Date().getTime()
        const name = `Test Name ${rand}`

        cy.request({
            method: 'POST',
            url: `${baseURL}/api/v1/author`,
            body: {
                'name': name
            },
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            expect(response.status).to.equal(statusCode)
            expect(response.body.status).to.equal(statusCode)
            expect(response.body.success).to.equal(true)
            expect(response.body.message).to.equal('Author created successfully')
            expect(response.body.errors).to.equal(null)
            expect(response.body.data.name).to.equal(name)
        })
    })
});
