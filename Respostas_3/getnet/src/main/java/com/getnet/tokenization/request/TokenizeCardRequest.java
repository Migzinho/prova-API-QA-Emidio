package com.getnet.tokenization.request;

public class TokenizeCardRequest {
    private String customer_id;
    private String card_pan;
    private String card_pan_source;
    private String card_brand;
    private String expiration_year;
    private String expiration_month;
    private String security_code;
    private String email;

    public String getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(String customer_id) {
        this.customer_id = customer_id;
    }

    public String getCard_pan() {
        return card_pan;
    }

    public void setCard_pan(String card_pan) {
        this.card_pan = card_pan;
    }

    public String getCard_pan_source() {
        return card_pan_source;
    }

    public void setCard_pan_source(String card_pan_source) {
        this.card_pan_source = card_pan_source;
    }

    public String getCard_brand() {
        return card_brand;
    }

    public void setCard_brand(String card_brand) {
        this.card_brand = card_brand;
    }

    public String getExpiration_year() {
        return expiration_year;
    }

    public void setExpiration_year(String expiration_year) {
        this.expiration_year = expiration_year;
    }

    public String getExpiration_month() {
        return expiration_month;
    }

    public void setExpiration_month(String expiration_month) {
        this.expiration_month = expiration_month;
    }

    public String getSecurity_code() {
        return security_code;
    }

    public void setSecurity_code(String security_code) {
        this.security_code = security_code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
