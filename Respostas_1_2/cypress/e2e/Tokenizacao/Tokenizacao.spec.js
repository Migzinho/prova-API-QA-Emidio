describe('Tokenização API Test', () => {
    let authToken
  
    before(() => {
      
      cy.request({
        method: 'POST',
        url: '/auth/oauth2/token',
        form: true,
        body: {
          grant_type: 'client_credentials',
        },
        auth: {
          clientID: '67823c6d-58de-494f-96d9-86a4c22682cb',
          clientSecret: 'c2d6a06f-5f31-448b-9079-7e170e8536e4',
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        authToken = response.body.access_token
      })
    })
  
    it('Deve tokenizar com sucesso', () => {
      cy.request({
        method: 'POST',
        url: '/v1/tokens/card',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          cardNumber: '5155901222280001',
          cardExpirationDate: '12/25',
          cardHolderName: 'Emidio Mignozzetti',
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.token).to.not.be.empty
        expect(response.body.status).to.eq('Sucesso')
      })
    })
  })
  