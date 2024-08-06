package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@Controller
public class OkulController {
    @Autowired
    private OkulService okulService;

    @GetMapping("/")
    public String index(Model model) {

        List<tum_okullar> tumokullarList =okulService.getOkullarWithSiralama2023(3000);

        List<Integer> siralamaAralik2023= okulService.getSiralamaWithPuan2023(480);

        System.out.println(siralamaAralik2023);

        model.addAttribute("siralamaAralik2023",siralamaAralik2023);
        model.addAttribute("okullarList", tumokullarList);
        return "index2";

    }


}
