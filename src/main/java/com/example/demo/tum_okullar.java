package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class tum_okullar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String bolum_adi;
    private String universite_adi;
    private String puan_turu;
    private int siralama_2023;
    private int siralama_2022;
    private int siralama_2021;
    private int siralama_2020;
    private float puan_2023;
    private float puan_2022;
    private float puan_2021;
    private float puan_2020;





    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBolum_adi() {
        return bolum_adi;
    }

    public void setBolum_adi(String bolum_adi) {
        this.bolum_adi = bolum_adi;
    }

    public String getUniversite_adi() {
        return universite_adi;
    }

    public void setUniversite_adi(String universite_adi) {
        this.universite_adi = universite_adi;
    }

    public String getPuan_turu() {
        return puan_turu;
    }

    public void setPuan_turu(String puan_turu) {
        this.puan_turu = puan_turu;
    }

    public int getSiralama_2023() {
        return siralama_2023;
    }

    public void setSiralama_2023(int siralama_2023) {
        this.siralama_2023 = siralama_2023;
    }

    public int getSiralama_2022() {
        return siralama_2022;
    }

    public void setSiralama_2022(int siralama_2022) {
        this.siralama_2022 = siralama_2022;
    }

    public int getSiralama_2021() {
        return siralama_2021;
    }

    public void setSiralama_2021(int siralama_2021) {
        this.siralama_2021 = siralama_2021;
    }

    public int getSiralama_2020() {
        return siralama_2020;
    }

    public void setSiralama_2020(int siralama_2020) {
        this.siralama_2020 = siralama_2020;
    }

    public float getPuan_2023() {
        return puan_2023;
    }

    public void setPuan_2023(float puan_2023) {
        this.puan_2023 = puan_2023;
    }

    public float getPuan_2022() {
        return puan_2022;
    }

    public void setPuan_2022(float puan_2022) {
        this.puan_2022 = puan_2022;
    }

    public float getPuan_2021() {
        return puan_2021;
    }

    public void setPuan_2021(float puan_2021) {
        this.puan_2021 = puan_2021;
    }

    public float getPuan_2020() {
        return puan_2020;
    }

    public void setPuan_2020(float puan_2020) {
        this.puan_2020 = puan_2020;
    }
}
