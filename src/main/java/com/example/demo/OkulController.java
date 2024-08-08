package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OkulController {
    @Autowired
    private OkulService okulService;

    @GetMapping("/")
    public List<tum_okullar> getTumOkullar(){
        return okulService.getOkullarWithSiralama2023(580);
    }


    @PostMapping("/okullarWithSiralama")
    public List<tum_okullar> getOkullarWithSiralama(@RequestParam Integer siralama) {
        return okulService.getOkullarWithSiralama2023(siralama);
    }




    @PostMapping("/okullarWithPuan")

    public List<tum_okullar> getOkullarWithPuan(@RequestBody PuanRequest puanRequest) {



        int puan = puanRequest.getPuan();
        Integer year = puanRequest.getYear();
        String bolum_adi = puanRequest.getBolum_adi_req();
        System.out.println(year);

        if (year==2023){

            return okulService.getOkullarWithPuan2023(puan,bolum_adi);
        } else if (year==2022) {

            return okulService.getOkullarWithPuan2022(puan,bolum_adi);
        } else if (year==2021) {

            return okulService.getOkullarWithPuan2021(puan,bolum_adi);
        } else if (year==2020) {

            return okulService.getOkullarWithPuan2020(puan,bolum_adi);
        }

        return Collections.emptyList();
    }




}
