it('Logs In in the app', ()=> {

	cy.fixture('data').then( (data)=> {

		cy.visit('/login');

		cy
			.get('#email')
			.type(data.email)
			.should('have.value', data.email)

		cy
			.get('#pass')
			.type(data.pass)
			.should('have.value', data.pass)

		cy
			.get('#btnLogin')
			.click()

		cy.location('pathname').should('eq', '/acortador');

	})		

});

it('Search a saved URL', ()=> {

	cy.fixture('data').then( (data)=> {

		cy
			.get('#toSaved')
			.click()

		cy
			.get('#searchUrl')
			.type(data.urlName)
			.should('have.value', data.urlName)

		cy
			.get('#searchButton')
			.click()

		cy
			.get('.url-name')
			.contains(data.urlName)

	})

});


