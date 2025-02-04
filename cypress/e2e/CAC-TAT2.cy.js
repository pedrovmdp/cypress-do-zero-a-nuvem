describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('./src/index.html')
    })

    it ('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it ('preenche os campos obrigatórios', () => {
        const longText = Cypress._.repeat('abcedfg', 10)
         //query           //action       // assertion
        cy.get('#firstName')
        .type('Pedro', {delay: 25})
        .should('have.value', 'Pedro').clear().should('have.value', '')

        cy.get('#lastName')
        .type('Vinicius', {delay: 25})
        .should('have.value', 'Vinicius').clear().should('have.value', '')

        cy.get('#email')
        .type('pedro@teste.com', {delay: 25})
        .should('have.value', 'pedro@teste.com').clear().should('have.value', '')

        cy.get('#open-text-area')
        .type(longText, {delay: 0})
        .should('have.value', longText).clear().should('have.value', '')

        cy.contains('button', 'Enviar').click()
        }) 

        it('Marca qual o meio de contato preferencial', () => {
            cy.get('#email-checkbox').click()
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
        .type('Pedro', {delay: 25})
        .should('have.value', 'Pedro').clear().should('have.value', '')

        cy.get('#lastName')
        .type('Vinicius', {delay: 25})
        .should('have.value', 'Vinicius').clear().should('have.value', '')

        cy.get('#email')
        .type('pedro@teste,com', {delay: 25})
        .should('have.value', 'pedro@teste,com').clear().should('have.value', '')

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        })

 
        it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
            cy.get('#phone')
            .type('abcde ') // foi tentado validar um campo nao numerico
            .should('have.value', '') //se foi algum nao numerico, deveria estar vazio ''.
        })
        
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
        cy.get('#firstName')
        .type('Pedro', {delay: 25})
        .should('have.value', 'Pedro').clear().should('have.value', '')

        cy.get('#lastName')
        .type('Vinicius', {delay: 25})
        .should('have.value', 'Vinicius').clear().should('have.value', '')

        cy.get('#email')
        .type('pedro@teste.com', {delay: 25})
        .should('have.value', 'pedro@teste.com').clear().should('have.value', '')

        cy.get('#phone-checkbox').check()

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
            cy.get('button[type="submit"]').click()  // Ajuste o seletor se necessário
            // Passo 3: Verifique se a mensagem de erro é exibida
            cy.get('.error')  // Seletor do elemento de erro
                .should('be.visible')  // A mensagem de erro deve estar visível
                .and('contain.text', 'Valide os campos obrigatórios!')  // Verifique o texto da mensagem de erro
            })
            
        it('envia o formulário com sucesso usando um comando customizado', () => {
            const data = {
                firstName: 'Pedro',
                lastName: 'Vinicius',
                email: 'pedro@teste.com',
                text: 'Teste.'

            }
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('exist')
        })

        it('seleciona um produto (Youtube) por seu texto', () => {
            cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
        })

        it('seleciona um produto (Mentoria) por seu valor (value)', () => {
            cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
        })

        it('seleciona um produto (Blog) por seu indice', () => {
            cy.get('#product')
            .select(1).should('have.value', 'blog')
        })

        it('marca o tipo de atendimento "Feedback"', () => {
            cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
        })

        it('marca cada tipo de atendimeto', () => {
            cy.get('input[type="radio"]')
            .each(typeOfService => {
                cy.wrap(typeOfService)
                .check()
                .should('be.checked')
            })
        })

        it('marca ambos checkboxes, depois desmarca o ultimo', () => {
            cy.get('#email-checkbox')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })

        it('seleciona um arquivo da pasta fixtures', ()=> {
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/black_Image.jpg')
            .should( input=> {
                expect(input[0].files[0].name).to.equal('black_Image.jpg')

            }) 
        })

        it('seleciona um arquivo simulando uum drag-and-drop', () =>{
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/black_Image.jpg', {action: 'drag-drop'})
            .should(input => {
                expect(input[0].files[0].name).to.equal('black_Image.jpg')
            })
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
            cy.fixture('black_Image.jpg').as('sampleFile')
            cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(input => {
                expect(input[0].files[0].name).to.equal('black_Image.jpg')
            })
        })

        it('verifica que a politica de priv abre em outra aba sem a necessidade de um click', () =>{
            cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'href', 'privacy.html')
            .and('have.attr', 'target', '_blank')
        })

        it('acesso a politica de privacidade removendo o target e entao clicando no link', () => {
            cy.contains('a', 'Política de Privacidade')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
        })

        

    
})