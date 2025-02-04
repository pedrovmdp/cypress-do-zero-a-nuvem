Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
        firstName: 'Carlitos',
        lastName: 'Elencar',
        email: 'carlito@gmail.com',
        text: 'Testing.'

    }) => {
    cy.get('#firstName')
        .type(data.firstName, {delay: 25})
        
        cy.get('#lastName')
        .type(data.lastName, {delay: 25})
        
        cy.get('#email')
        .type(data.email, {delay: 25})
        
        cy.get('#open-text-area')
        .type(data.text, {delay: 0})
        .should('have.value', data.text).clear().should('have.value', '')

        cy.contains('button', 'Enviar').click()
        
})

