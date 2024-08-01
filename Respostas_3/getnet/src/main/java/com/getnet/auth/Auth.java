package com.getnet.auth;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class Auth {
    private static final String AUTH_URL = "https://api-homologacao.getnet.com.br/v1/authenticate";
    private static final String CLIENT_ID = "your_client_id";
    private static final String CLIENT_SECRET = "your_client_secret";

    public static String getAccessToken() {
        RequestSpecification request = RestAssured.given();
        request.header("Content-Type", "application/x-www-form-urlencoded");

        String requestBody = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&grant_type=client_credentials";

        request.body(requestBody);

        Response response = request.post(AUTH_URL);
        return response.jsonPath().getString("access_token");
    }
}
