describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('./src/index.html')
    })

    it ('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios', () => {
        cy.clock()
        const longText = Cypress._.repeat('abcedfg', 10)
         //query           //action       // assertion
        cy.get('#firstName')
        .type('Pedro', {delay: 25})
        .should('have.value', 'Pedro')

        cy.get('#lastName')
        .type('Vinicius', {delay: 25})
        .should('have.value', 'Vinicius')

        cy.get('#email')
        .type('pedro@teste.com', {delay: 25})
    

        cy.get('#open-text-area')
        .type(longText, {delay: 0})

        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(3000)

        cy.get('.success').should('not.be.visible')
        }) 

        it('Marca qual o meio de contato preferencial', () => {
            cy.get('#email-checkbox').click()
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => { 
        cy.clock()

        cy.get('#firstName')
        .type('Pedro', {delay: 25})
        .should('have.value', 'Pedro')

        cy.get('#lastName')
        .type('Vinicius', {delay: 25})
        .should('have.value', 'Vinicius')

        cy.get('#email')
        .type('pedro@teste,com', {delay: 25})
        .should('have.value', 'pedro@teste,com')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
        })

 
        it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
            cy.get('#phone')
            .type('abcde ') // foi tentado validar um campo nao numerico
            .should('have.value', '') //se foi algum nao numerico, deveria estar vazio ''.
        })
        
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
        cy.clock()
        cy.get('#firstName')
        .type('Pedro', {delay: 25})
        .should('have.value', 'Pedro')
        cy.get('#lastName')
        .type('Vinicius', {delay: 25})
        .should('have.value', 'Vinicius')

        cy.get('#email')
        .type('pedro@teste.com', {delay: 25})
        .should('have.value', 'pedro@teste.com')

        cy.get('#phone-checkbox').check()

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(3000)
        cy.get('.error').should('not.be.visible')

        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

            cy.clock()
            cy.contains('button', 'Enviar').click()  // Ajuste o seletor se necessário
            // Passo 3: Verifique se a mensagem de erro é exibida
            cy.get('.error')  // Seletor do elemento de erro
                .should('be.visible')  // A mensagem de erro deve estar visível
                .and('contain.text', 'Valide os campos obrigatórios!')  // Verifique o texto da mensagem de erro

            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
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

        it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
            cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')

            cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
        })

        it('preenche o campo da área de texto usando o comando invoke', () => {
            cy.get('#open-text-area')
            .invoke('val', 'um texto qualquer')
            .should('have.value', 'um texto qualquer')
        })

        it('faz uma requisicao HTTP', () => {
            cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
            .as('getRequest')
            .its('status')
            .should('be.equal', 200)

            cy.get('@getRequest')
            .its('statusText')
            .should('be.equal', 'OK')

            cy.get('@getRequest')
            .its('body')
            .should('include', 'CAC TAT')
        })

        it.only('encontrando o gato desafio final', () => {
            cy.get('#cat')
            .invoke('show')
            .should('be.visible')

            cy.get('#title')
            .invoke('text', 'CAT TAT')

            cy.get('#subtitle')
            .invoke('text', 'Perceba!')
        })
        

    
})