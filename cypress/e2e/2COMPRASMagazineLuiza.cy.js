/// <reference types="cypress" />


const produtos = require('../fixtures/produtos.json');
//pegando informação de JSON externo, alocado na pasta [fixture(produtos.json)]


produtos.forEach(produto => {
  //realizar todo processo para cada item na JSON


  describe(`Compra na Magazine Luiza ${produto.item}`, () => {
    //cada processo sera nomeado com o item que esta sendo feito o teste


    it('Acesso ao site MAgazine Luiza', () => {
      //acessando o site

      cy.visit('https://www.magazineluiza.com.br')
    })

    it('fazendo busca por produto', () => {
      //encontrando a barra de pesquisa
      //digitando o produto com aperto do ENTER

      cy.get('[id=input-search]').type(produto.item).type('{enter}')
      
    })

    it('validando o retorno da busca', () => {
      //verificando se retorna o produto pesquisado no texto de pesquisa do site "Resultados para"

      cy.get('.gSXySR', { timeout: 10000 }).contains(produto.item)
      
      //verifica se o methodo GET realizado pelo https retorno positivo (200) e com informação como resposta

      cy.request({
        method: 'GET',
        url:`${produto.busca}`

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

      cy.get('.iGQNsZ > div > [data-testid="bagButton"] > .sc-bYoBSM').click()
      

      //verfica atravez da requisição GET se existe um item na sacola

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

})