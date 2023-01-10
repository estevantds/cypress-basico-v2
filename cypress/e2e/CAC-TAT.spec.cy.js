/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
  })
  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type('Estevan')

    .should('have.value', 'Estevan')
    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type('Timotheo dos Santos')

    .should('have.value', 'Timotheo dos Santos')
    cy.get('input[type="email"]')
    .should('be.visible')
    .type('estevan@mail.com')
    .should('have.value', 'estevan@mail.com')

    cy.get('textarea[id=open-text-area]')
    .should('be.visible')
    .type('testing application')
    .should('have.value', 'testing application')
    
    cy.get('button[type=submit]')
    .should('be.visible')
    .click()

    cy.get('span[class=success]')
    .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type('Estevan')

    .should('have.value', 'Estevan')
    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type('Timotheo dos Santos')

    .should('have.value', 'Timotheo dos Santos')
    cy.get('input[type="email"]')
    .should('be.visible')
    .type('estevan@mail,com')

    cy.get('textarea[id=open-text-area]')
    .should('be.visible')
    .type('testing application')
    .should('have.value', 'testing application')
    
    cy.get('button[type=submit]')
    .should('be.visible')
    .click()

    cy.get('span[class=error]')
    .should('be.visible')
  })

  it('testa se o campo telefone é valor numérico', function() {
    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type('Estevan')
    .should('have.value', 'Estevan')

    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type('Timotheo dos Santos')
    .should('have.value', 'Timotheo dos Santos')

    cy.get('input[type="email"]')
    .should('be.visible')
    .type('estevan@mail.com')

    cy.get('input[id=phone]')
    .should('be.visible')
    .type('estevan')
    .should('not.have.value')

    cy.get('textarea[id=open-text-area]')
    .should('be.visible')
    .type('testing application')
    .should('have.value', 'testing application')
    
    cy.get('button[type=submit]')
    .should('be.visible')
    .click()

    cy.get('span[class=success]')
    .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um check box de telefone marcado mas sem preencher o campo', function() {
    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type('Estevan')

    .should('have.value', 'Estevan')
    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type('Timotheo dos Santos')
    .should('have.value', 'Timotheo dos Santos')

    cy.get('input[type="email"]')
    .should('be.visible')
    .type('estevan@mail.com')

    cy.get('#phone-checkbox').check()

    cy.get('textarea[id=open-text-area]')
    .should('be.visible')
    .type('testing application')
    .should('have.value', 'testing application')
    
    cy.get('button[type=submit]')
    .should('be.visible')
    .click()

    cy.get('span[class=error]')
    .should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor', function() {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu valor', function() {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
  })
})
