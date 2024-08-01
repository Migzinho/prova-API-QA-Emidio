describe('Validar Regras de accessToken', () => {
    let accessToken
  
    before(() => {
      
      cy.request({
        method: 'POST',
        url: '/auth/oauth/v2/token',
        headers: {
          'Authorization': 'Basic ' + Cypress.env('AUTH_STRING'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
          scope: 'oob',
          grant_type: 'client_credentials'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('access_token')
        accessToken = response.body.access_token
      })
    })
  
    it('deve validar um accessToken com sucesso', () => {
      cy.request({
        method: 'POST',
        url: '/v1/tokens/card',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json charset=utf-8'
        },
        body: {
          card_number: '5155901222280001',
          customer_id: 'emidio_123456'
        }
      }).then((response) => {
        // Verifica se a resposta da API ao tentar tokenizar um cartão é bem-sucedida e se o token retornado é do tamanho correto.
        expect(response.status).to.eq(201) 
        expect(response.body).to.have.property('number_token')
        expect(response.body.number_token).to.have.lengthOf(128)
      })
    })
  
    it('deve validar requisições inválidas', () => {
      cy.request({
        method: 'POST',
        url: '/v1/tokens/card',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json charset=utf-8'
        },
        // Número de cartão inválido
        body: {
          card_number: '', 
          customer_id: ''
        },
        failOnStatusCode: false
      }).then((response) => {
        // Testa a resposta da API quando são enviados dados inválidos (código de status 400).
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('status_code')
        expect(response.body.status_code).to.eq(400)
      })
    })
  
    it('deve validar acesso não autorizado', () => {
      cy.request({
        method: 'POST',
        url: '/v1/tokens/card',
        headers: {
          'Authorization': 'Bearer invalid_token',
          'Content-Type': 'application/json charset=utf-8'
        },
        body: {
          card_number: '5155901222280001',
          customer_id: 'emidio_123456'
        },
        failOnStatusCode: false
      }).then((response) => {
        // Verifica a resposta da API quando um token de acesso inválido é usado (código de status 401).
        expect(response.status).to.eq(401)
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('status_code')
        expect(response.body.status_code).to.eq(401)
      })
    })
  
    it('deve validar erros de não encontrado', () => {
      cy.request({
        method: 'POST',
        // Endpoint inválido
        url: '/v1/tokens/card/invalid',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json charset=utf-8'
        },
        body: {
          card_number: '5155901222280001',
          customer_id: 'emidio_123456'
        },
        failOnStatusCode: false
      }).then((response) => {
        // Testa a resposta da API quando um endpoint inválido é acessado (código de status 404).
        expect(response.status).to.eq(404)
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('status_code')
        expect(response.body.status_code).to.eq(404) 
      })
    })
  
    it('deve validar erros internos do servidor', () => {
      cy.request({
        method: 'POST',
        url: '/v1/tokens/card',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json charset=utf-8'
        },
        body: {
          card_number: '5155901222280001',
          customer_id: 'emidio_123456'
        },
        failOnStatusCode: false
      }).then((response) => {
        // Verifica a resposta da API para erros internos do servidor (código de status 500).
        expect(response.status).to.eq(500)
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('status_code') 
        expect(response.body.status_code).to.eq(500) 
      })
    })
  })
  