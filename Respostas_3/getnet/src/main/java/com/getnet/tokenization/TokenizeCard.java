package com.getnet.tokenization;

import com.getnet.tokenization.request.TokenizeCardRequest;
import com.getnet.tokenization.response.CardTokenResponse;
import com.getnet.tokenization.response.ErrorResponse;
import com.getnet.tokenization.response.UnauthorizedResponse;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class TokenizeCard {
    private static final String TOKENIZE_URL = "https://api-homologacao.getnet.com.br/v1/tokenization/token";

    public static Response tokenizeCard(String accessToken) {
        RequestSpecification request = RestAssured.given();
        request.header("Authorization", "Bearer " + accessToken);
        request.header("Content-Type", "application/json; charset=utf-8");

        TokenizeCardRequest requestBody = new TokenizeCardRequest();
        requestBody.setCustomer_id("emidio_123456");
        requestBody.setCard_pan("5204731600014784");
        requestBody.setCard_pan_source("ON_FILE");
        requestBody.setCard_brand("Mastercard");
        requestBody.setExpiration_year("2023");
        requestBody.setExpiration_month("12");
        requestBody.setSecurity_code("226");
        requestBody.setEmail("emidio.mig@hotmail.com");

        request.body(requestBody);

        return request.post(TOKENIZE_URL);
    }

    public static Response validateInvalidRequests(String accessToken) {
        RequestSpecification request = RestAssured.given();
        request.header("Authorization", "Bearer " + accessToken);
        request.header("Content-Type", "application/json; charset=utf-8");

        TokenizeCardRequest requestBody = new TokenizeCardRequest();
        requestBody.setCustomer_id("");
        requestBody.setCard_pan("");
        requestBody.setCard_pan_source("");
        requestBody.setCard_brand("");
        requestBody.setExpiration_year("");
        requestBody.setExpiration_month("");
        requestBody.setSecurity_code("");
        requestBody.setEmail("");

        request.body(requestBody);

        return request.post(TOKENIZE_URL);
    }

    public static Response validateUnauthorized() {
        RequestSpecification request = RestAssured.given();
        request.header("Authorization", "Bearer invalid_token");
        request.header("Content-Type", "application/json; charset=utf-8");

        TokenizeCardRequest requestBody = new TokenizeCardRequest();
        requestBody.setCustomer_id("emidio_123456");
        requestBody.setCard_pan("5204731600014784");
        requestBody.setCard_pan_source("ON_FILE");
        requestBody.setCard_brand("Mastercard");
        requestBody.setExpiration_year("2023");
        requestBody.setExpiration_month("12");
        requestBody.setSecurity_code("226");
        requestBody.setEmail("emidio.mig@hotmail.com");

        request.body(requestBody);

        return request.post(TOKENIZE_URL);
    }
}
