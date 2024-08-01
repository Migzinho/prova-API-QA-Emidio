describe('Tokenização e Criptograma do Cartão', () => {
    const baseUrlToken = '/v1/tokenization/token'
    const baseUrlCrypt = '/v1/tokenization/crypt'
  
    let authToken
    let networkTokenId
  
    before(() => {
      describe('Valida Status Code', () => {
  const baseUrlToken = '/v1/tokenization/token'
  const baseUrlCrypt = '/v1/tokenization/crypt'

  let authToken
  let networkTokenId

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
      cy.request({
      method: 'POST',
      url: '/v1/authenticate',
      body: {
        username: 'seu-usuario',
        password: 'sua-senha'
      }
    }).then((response) => {
      authToken = response.body.token
    })
  })

  it('Deve gerar um token do cartão', () => {
    cy.request({
      method: 'POST',
      url: baseUrlToken,
      headers: {
        'Content-Type': 'application/json charset=utf-8',
        'Authorization': `Bearer ${authToken}`
      },
      body: {
        customer_id: 'emidio_51559012',
        card_pan: '5155901222280001',
        card_pan_source: 'Emidio Mignozzetti',
        card_brand: 'MASTERCARD',
        expiration_year: '2029',
        expiration_month: '01',
        security_code: '321',
        email: 'emidio.mig@hotmail.com'
      },
      failOnStatusCode: false
    }).then((response) => {
      switch (response.status) {
        case 200:
          expect(response.body).to.have.property('network_token_id')
          expect(response.body).to.have.property('status')
          networkTokenId = response.body.network_token_id 
          break
        case 400:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        case 401:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        case 404:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        case 500:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        default:
          throw new Error(`Código de status inesperado: ${response.status}`)
      }
    })
  })

  it('Deve gerar um criptograma do cartão', function() {
    if (!networkTokenId) {
      throw new Error('O token de cartão não foi gerado, não é possível continuar.')
    }

    cy.request({
      method: 'POST',
      url: baseUrlCrypt,
      headers: {
        'Content-Type': 'application/json charset=utf-8',
        'Authorization': `Bearer ${authToken}`
      },
      body: {
        network_token_id: networkTokenId,
        transaction_type: 'CIT',
        cryptogram_type: 'VISA_TAVV',
        amount: 1000,
        customer_id: 'emidio_45678900',
        email: 'emidio.mig@hotmail.com',
        card_brand: 'VISA'
      },
      failOnStatusCode: false
    }).then((response) => {
      switch (response.status) {
        case 200:
          expect(response.body).to.have.property('cryptogram')
          expect(response.body).to.have.property('token_pan_card')
          expect(response.body).to.have.property('token_expiration_month')
          expect(response.body).to.have.property('token_expiration_year')
          expect(response.body).to.have.property('token_status')
          break
        case 400:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        case 401:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        case 404:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        case 500:
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('status_code')
          break
        default:
          throw new Error(`Código de status inesperado: ${response.status}`)
      }
    })
  })
})

      cy.request({
        method: 'POST',
        url: '/v1/authenticate',
        body: {
          username: 'seu-usuario',
          password: 'sua-senha'
        }
      }).then((response) => {
        authToken = response.body.token 
      })
    })
  
    it('Deve gerar um token do cartão', () => {
      cy.request({
        method: 'POST',
        url: baseUrlToken,
        headers: {
          'Content-Type': 'application/json charset=utf-8',
          'Authorization': `Bearer ${authToken}`
        },
        body: {
          customer_id: 'emidio_45678900',
          card_pan: '4622943120000493',
          card_pan_source: 'Emidio Mignozzetti',
          card_brand: 'VISA',
          expiration_year: '2031',
          expiration_month: '07',
          security_code: '123',
          email: 'emidio.mig@hotmail.com'
        },
        failOnStatusCode: false
      }).then((response) => {
        switch (response.status) {
          case 200:
            expect(response.body).to.have.property('network_token_id')
            expect(response.body).to.have.property('status')
            networkTokenId = response.body.network_token_id
            break
          case 400:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          case 401:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          case 404:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          case 500:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          default:
            throw new Error(`Código de status inesperado: ${response.status}`)
        }
      })
    })
  
    it('Deve gerar um criptograma do cartão', function() {
      
      if (!networkTokenId) {
        throw new Error('O token de cartão não foi gerado, não é possível continuar.')
      }
  
      cy.request({
        method: 'POST',
        url: baseUrlCrypt,
        headers: {
          'Content-Type': 'application/json charset=utf-8',
          'Authorization': `Bearer ${authToken}`
        },
        body: {
          network_token_id: networkTokenId,
          transaction_type: 'CIT',
          cryptogram_type: 'VISA_TAVV',
          amount: 1000, 
          customer_id: 'emidio_45678900',
          email: 'emidio.mig@hotmail.com',
          card_brand: 'VISA'
        },
        failOnStatusCode: false
      }).then((response) => {
        switch (response.status) {
          case 200:
            expect(response.body).to.have.property('cryptogram')
            expect(response.body).to.have.property('token_pan_card')
            expect(response.body).to.have.property('token_expiration_month')
            expect(response.body).to.have.property('token_expiration_year')
            expect(response.body).to.have.property('token_status')
            break
          case 400:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          case 401:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          case 404:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          case 500:
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('status_code')
            break
          default:
            throw new Error(`Código de status inesperado: ${response.status}`)
        }
      })
    })
  })
  