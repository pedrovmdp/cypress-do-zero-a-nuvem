describe('Testando plataforma rh', () => {
    beforeEach(() => {
        cy.visit('https://plataformarh.duon.io/login')
    })

    it('verifica titulo aplicação', () => {
        cy.title().should('be.eual', 'Duon - RH')
    })
})