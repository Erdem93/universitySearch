package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OkulController {
    @Autowired
    private OkulService okulService;

    @GetMapping("/")
    public List<tum_okullar> getTumOkullar(){
        return okulService.getOkullarWithSiralama2023(50);
    }


    @GetMapping("/bolum_isimleri")
    public List<String> getBolumIsimleri(){
        return okulService.getAllDepartmants();
    }

    @PostMapping("/okullarWithSiralama")
    public List<tum_okullar> getOkullarWithSiralama(@RequestParam Integer siralama) {
        return okulService.getOkullarWithSiralama2023(siralama);
    }

    @PostMapping("/okullarWithPuan")

    public List<tum_okullar> getOkullarWithPuan(@RequestBody PuanRequest puanRequest) {



        int points = puanRequest.getPuan();
        Integer year = puanRequest.getYear();
        String depName = puanRequest.getBolum_adi_req();

        if (year==2023){
            return okulService.getOkullarWithPuan2023(points,depName);
        } else if (year==2022) {

            return okulService.getOkullarWithPuan2022(points,depName);
        } else if (year==2021) {

            return okulService.getOkullarWithPuan2021(points,depName);
        } else if (year==2020) {

            return okulService.getOkullarWithPuan2020(points,depName);
        }

        return Collections.emptyList();
    }




}
