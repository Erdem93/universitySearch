package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class OkulService {
    @Autowired
    private OkulRepository okulRepository;
    public List<tum_okullar> getAllItems(){
        return okulRepository.findAll();
    }

    public List<tum_okullar> getOkullarWithSiralama2023(int siralama){
        return okulRepository.findBySiralama2023GreaterThan(siralama);
    }

    public List<Integer> getSiralamaWithPuan2023(int puan){

        return Arrays.asList(okulRepository.findByPuan2023GreaterThan(puan).getFirst().getSiralama_2023(),okulRepository.findByPuan2023LessThan(puan).getFirst().getSiralama_2023());
    }

    public List<tum_okullar> getOkullarWithPuan2023(int puan){
        return okulRepository.findByPuan2023LessThan(puan);
    }


}
