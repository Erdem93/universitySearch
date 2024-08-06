package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        Integer puan=puanRequest.getPuan();
        return okulService.getOkullarWithPuan2023(puan);
    }

//    public String index(Model model) {
//
//        List<tum_okullar> tumokullarList =okulService.getOkullarWithSiralama2023(3000);
//
//
//        System.out.println(siralamaAralik2023);
//
//        model.addAttribute("siralamaAralik2023",siralamaAralik2023);
//        model.addAttribute("okullarList", tumokullarList);
//        return "index2";
//
//    }


}
