describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('https://plataformarh.duon.io/login')
    })

    it ('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Duon - RH')
    })

    it('realiza login', () => {
      cy.get('[data-pc-name="inputtext"]')
      .type('pedro.vinicius@dsgtechnology.com.br', {delay: 0})
      .should('have.value', 'pedro.vinicius@dsgtechnology.com.br')

      cy.get('[data-pc-name="password"]')
      .type('Dsg@2024', {delay: 0})

      cy.get('[data-pc-name="button"]').eq(1).click()
      cy.get(':nth-child(1) > .p-3 > .gap-x-3 > .footer-content > .relative').click()

      cy.get('[data-cy="avancar"]').click().should('have.text', 'Avançar')
      
      cy.get('[role="combobox"]').eq(0).click()
      cy.contains('li', 'Periódico').click()

      cy.get('[data-cy="cidade"]')
      .type('Criciúma')

      cy.get('[aria-label="Criciúma"]').click()

      // Abrir o dropdown
      cy.get('[data-cy="funcionarios"]').click()
      cy.get('[data-cy="funcionarios"]').type('FuncioTesteSexta')

      // Selecionar a opção desejada
      // Aguarda o texto aparecer
      cy.contains('FuncioTesteSexta', { timeout: 10000 }) // Aumenta o tempo limite para 10 segundos
      .should('be.visible')
      .click();


      cy.get('[data-cy="avancar"]').click().should('exist')//seleciona em avançar apos preencher nome do funcionario agendamento
      
      cy.get('[data-cy="avancar"]').click().should('exist')// seleciona avançar em tela procedimentos

      cy.get('.p-dropdown-label').click();

      //cy.get('aria-label="Prestador KIT [TESTE - NÃO EXCLUIR]"').click()
      
      
     





      


      
      
  

    })

    it('agenda colaborador', () => {
      cy.get('[data-pc-name="button"]').eq(1).click()
    })

    it('Seleciona a opção "Periódico" no dropdown', () => {
      // Abre o dropdown
      cy.get('[role="combobox"]').click();
    
      // Seleciona a opção "Periódico"
      cy.contains('li', 'Periódico').click();
    
      // Verifica se "Periódico" foi selecionado
      cy.get('[role="combobox"]').should('contain', 'Periódico');
    });
    
    
   

})