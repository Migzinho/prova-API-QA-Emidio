package com.getnet.tests;

import com.getnet.auth.Auth;
import com.getnet.tokenization.TokenizeCard;
import com.getnet.tokenization.response.CardTokenResponse;
import com.getnet.tokenization.response.ErrorResponse;
import com.getnet.tokenization.response.UnauthorizedResponse;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ApiTest {

    @Test
    public void testTokenizeCard() {
        String accessToken = Auth.getAccessToken();
        Response response = TokenizeCard.tokenizeCard(accessToken);
        Assert.assertEquals(response.getStatusCode(), 201);
        CardTokenResponse cardTokenResponse = response.as(CardTokenResponse.class);
        Assert.assertNotNull(cardTokenResponse.getNumber_token());
    }

    @Test
    public void testInvalidRequests() {
        String accessToken = Auth.getAccessToken();
        Response response = TokenizeCard.validateInvalidRequests(accessToken);
        Assert.assertEquals(response.getStatusCode(), 400);
        ErrorResponse errorResponse = response.as(ErrorResponse.class);
        Assert.assertNotNull(errorResponse.getMessage());
    }

    @Test
    public void testUnauthorized() {
        Response response = TokenizeCard.validateUnauthorized();
        Assert.assertEquals(response.getStatusCode(), 401);
        UnauthorizedResponse unauthorizedResponse = response.as(UnauthorizedResponse.class);
        Assert.assertNotNull(unauthorizedResponse.getMessage());
    }
}
