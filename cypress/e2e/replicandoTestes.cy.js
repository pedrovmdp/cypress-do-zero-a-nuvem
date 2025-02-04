describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verificar campos obrigatórios', () => {
        cy.get('#firstName')
        .type('Pedrão')
        .should('have.value', 'Pedrão')

        cy.get('#lastName')
        .type('Vinicius')
        .should('have.value', 'Vinicius')

        cy.get('#email')
        .type('pedro@teste.com')
        .should('have.value', 'pedro@teste.com')

        cy.get('#email-checkbox').check()

        cy.get('#open-text-area')
        .type('Preenchendo por obrigatoridade apenas!')
        .should('have.value', 'Preenchendo por obrigatoridade apenas!' )

        cy.contains('button', 'Enviar').click()
        cy.get('button').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    it('verificando campos invalidos', () => {
        cy.get('#firstName')
        .type('Pedrão')
        .should('have.value', 'Pedrão')

        cy.get('#lastName')
        .type('Vinicius')
        .should('have.value', 'Vinicius')

        cy.get('#email')
        .type('pedro@teste,com')
        .should('have.value', 'pedro@teste,com')

        cy.get('#email-checkbox').check()

        cy.get('#open-text-area')
        .type('Preenchendo por obrigatoridade apenas!')
        .should('have.value', 'Preenchendo por obrigatoridade apenas!' )

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible').and('contain.text', 'Valide os campos obrigatór')
    })


})