describe('Acessando com login a DUON', () => {
    beforeEach(() => {
        cy.visit('https://duon.hml.dsgdev.com.br/#/painel')
        cy.get('#input')
        .type('pedro.vinicius@dsgtechnology.com.br', {delay: 20})
        .should('have.value', 'pedro.vinicius@dsgtechnology.com.br')
  
        cy.get('.password-container')
        .type('Abcd-1234!', {delay: 20})

        cy.wait(500)
        cy.contains('button', 'Acessar').click()
    })


    it('acessando menu atendimento', ()=> {
        cy.get('.layout-menu > :nth-child(5) > [href="#"]').click() //acessa menu atendimento
        cy.get('.active-menuitem > .submenu > :nth-child(3) > .p-ripple').click() //acessa tela area medica

        cy.get('.gap-2 > :nth-child(2)').click() //abrir filtro

        cy.get('#situacao').click() // clicar na situação cadastral

        cy.get('.p-multiselect-header > .p-checkbox > .p-checkbox-box').click()  //selecionar todos status do filtro
        cy.contains('button', 'Confirmar').click()

        cy.get('input[placeholder="Pesquisar"]')
        .type('Funcionário India')

        cy.contains('.p-selectable-row', 'Funcionário India').click() // seleciona a linha onde tem funcionario india e acessa
        cy.contains('.p-selectable-row', '04/02/2025').click() // seleciona a linha ontemtem a data especifica do exame que almejo
        cy.wait(500)
        cy.contains('a', /^ASO$/).click()  // Seleciona a coluna ASO
        

        cy.get('#crm-medico-examinador')
        .type('Médico Pedro') //preenchendo campo medico examinador
        .should('have.value', 'Médico Pedro')

        cy.get('.p-radiobutton-box').eq(0).click() // Clica no primeiro radio button

        cy.get(':nth-child(6) > .col-12 > .p-button').click() //clica em incluir arquivo

        cy.get('.p-dialog-header-icons').click() //fechar dialgo




    })
    

   
})