package com.example.demo;

public class PuanRequest {
    private Integer puan;
    private Integer year;
    private String bolum_adi_req;

    // Getter and Setter
    public Integer getPuan() {
        return puan;
    }

    public void setPuan(Integer puan) {
        this.puan = puan;
    }

    public String getBolum_adi_req() {
        return bolum_adi_req;
    }

    public void setBolum_adi_req(String bolum_adi_req) {
        this.bolum_adi_req = bolum_adi_req;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
