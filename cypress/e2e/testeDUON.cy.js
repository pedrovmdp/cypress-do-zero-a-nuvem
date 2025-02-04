describe('Testando Duon', () => {
    beforeEach(() => {
        
        cy.visit('https://app.duon.io/#')
    })

    it('realizando login', () => {
        cy.get('#input')
        .type('pedro.vinicius@dsgtechnology.com.br')
        .should('have.value', 'pedro.vinicius@dsgtechnology.com.br')

        cy.wait(2000);

        cy.get('[data-pc-name="inputtext"][type="password"]') 
        .type('Abcd-1234!')
        .should('have.value', 'Abcd-1234!')

        cy.contains('button', 'Acessar').click()

        cy.get('.layout-menu > :nth-child(1) > :nth-child(2)').click() //clica engrenagem config
        cy.wait(1200);

        cy.get('.active-menuitem > [style=""] > :nth-child(1) > :nth-child(1)').click() // clica no BASE

        cy.get('.active-menuitem > [style=""] > :nth-child(4) > .p-ripple').click() // clica no GED

        cy.get(':nth-child(4) > .item-content').click() //clica na pasta desejada (Pedro QA)

        cy.contains('button', 'Nova Pasta').click()

        cy.get('#folderName') //seleciona o campo pra digitar nova pasta
        .type('Pasta Teste V2')
        .should('have.value', 'Pasta Teste V2')

        cy.contains('button', 'Criar').click() //criar a nova pasta desejada

        cy.get(':nth-child(3) > .item-content').click() //acessa a nova pasta criada

        cy.contains('button', 'Nova Pasta').click()

        cy.get('#folderName') //seleciona o campo pra digitar nova pasta
        .type('Pasta Teste Dentro da Pasta2')
        .should('have.value', 'Pasta Teste Dentro da Pasta2')

        cy.contains('button', 'Criar').click()

        cy.get(':nth-child(1) > .item-content > .item-actions > .p-button > .p-button-icon').click() //seleciona para abrir opções

        cy.get('#overlay_menu_100_0 > .p-menuitem-content > .p-menuitem-link').click() //clica em editar

        cy.get('#folderName:visible').clear().should('have.value', '') // deixa o campo limpo

        cy.get('#folderName:visible') //usar o visible para priorizar elemetnos visiveis qnd ha muitos usados
        .type('Testando ALTERAÇÃO') 
        .should('have.value', 'Testando ALTERAÇÃO')
     
        cy.contains('button', 'Salvar').click() //salva alteração de nome da pasta

        cy.get('.p-button-outlined').click() //clica para criar novo arquivo 

        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/black_Image.jpg')
        .should( input=> {
            expect(input[0].files[0].name).to.equal('black_Image.jpg')

        }) 


    })

   
        
    
    
})