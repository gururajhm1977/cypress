describe("Intercept Network Request", () => {
    beforeEach(() => {
        cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/intercept.html");
    });

    it("SPY - INTERCEPT VIA SERVER-ROUTE XHR GET Request", () => {
        // cy.server();
        cy.intercept({
            method: 'GET',
            path: '/users?*',
        }).as('users')

        cy.get("#loadThreeUsersXHR").click();
        cy.wait(2000);
        cy.wait('@users').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
        cy.get("#xhrusers > tbody >tr").should("have.length", 3);
    });

    it("SPY - INTERCEPT VIA SERVER-ROUTE XHR POST Request", () => {

        cy.intercept({
            method: 'POST',
            path: '/users',
        }).as('users')

        const user = {
            name: "Avi",
            email: "a.b@c.com",
        };

        cy.get("#xhrname").type(user.name);
        cy.get("#xhremail").type(user.email);
        cy.get("#xhrbtn").click();

        cy.wait('@users').then(({ response }) => {
            expect(response.statusCode).to.eq(201)
            expect(response.body.name).to.eq(user.name);
            expect(response.body.email).to.eq(user.email);

        })

        cy.get("#xhrspan").should("contain.text", `${user.name} - ${user.email}`);
    });

    it("STUB - Intercept FETCH GET Request - 3 Users", () => {
        // Intercept and Stub network request
        cy.intercept(
            {
                pathname: "/users",
                method: "GET",
                query: {
                    _limit: "3",
                },
            },
            {
                fixture: "users.json",
            }
        ).as("users");
        cy.get("#loadThreeUsersFETCH").click();
        cy.wait("@users")
            .its("response.body")
            .should("have.length", 3);

        cy.get("#fetchusers > tbody >tr").should("have.length", 3);
    });
});