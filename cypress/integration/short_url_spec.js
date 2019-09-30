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

it('Shortens an URL', ()=> {

	cy.fixture('data').then( (data)=> {

		cy
			.get('#urlInput')
			.type(data.url)
			.should('have.value', data.url)

		cy
			.get('#urlButton')
			.click()


		cy
			.get('#shortUrl')
			.contains(data.short)

	})

});

it('Save an URL', ()=> {

	cy.fixture('data').then( (data)=> {

		cy
			.get('#urlName')
			.type(data.urlName)
			.should('have.value', data.urlName)

		cy
			.get('#saveUrl')
			.click()

		cy
			.get('#successUrl')
			.should('be.visible')

	})

});
