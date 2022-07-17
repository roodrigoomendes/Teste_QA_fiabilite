/// <reference types="cypress" />


describe('Compra na Magazine Luiza', () => {

 const produtos ='sofa retratil'

  it('Acesso ao site MAgazine Luiza', () => {
    //acessando o site

    cy.visit('https://www.magazineluiza.com.br')
  })

  it('fazendo busca por produto', () => {
    //encontrando a barra de pesquisa
    //digitando o produto com aperto do ENTER

    cy.get('[id=input-search]').type(produtos).type('{enter}')
    
  })

  it('validando o retorno da busca', () => {
    //verificando se retorna o produto pesquisado no texto de pesquisa do site "Resultados para"
    //verifica se o methodo GET realizado pelo https retorno positivo (200) e com alguma informação
    cy.get('.gSXySR', { timeout: 10000 }).contains(produtos)

    cy.request({
      method: 'GET',
      url:'https://www.magazineluiza.com.br/busca/sofa+retratil'

    }).then((res) => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.not.empty
    })

  })

  it('Escolhendo um produto na lista', () => {
    //selecionar o produto na posição 1

    cy.get(':nth-child(1) > [data-testid="product-card-container"] > [data-testid="product-card-content"] > [data-testid="product-title"]',{ timeout: 10000 }).click()
        
  })


  it('adicionando e validando item no carinho', () => {
    //Clica no botão de adicionar ao carinho
    //verfica atravez da requisição GET se existe um item na sacola

    cy.get('.iGQNsZ > div > [data-testid="bagButton"] > .sc-bYoBSM').click()
    
    cy.request({
      method: 'GET',
      url:'https://sacola.magazineluiza.com.br/'

    }).then((res) => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.not.empty
      expect(res.body[0]).to.have
    })

  })

  

})