package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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



    public List<tum_okullar> getOkullarWithPuan2023(int puan,String bolum_adi){
        return okulRepository.findByPuan2023LessThan(puan,bolum_adi);
    }

    public List<tum_okullar> getOkullarWithPuan2022(int puan,String bolum_adi){
        return okulRepository.findByPuan2022LessThan(puan,bolum_adi);
    }

    public List<tum_okullar> getOkullarWithPuan2021(int puan,String bolum_adi){
        return okulRepository.findByPuan2021LessThan(puan,bolum_adi);
    }

    public List<tum_okullar> getOkullarWithPuan2020(int puan,String bolum_adi){
        return okulRepository.findByPuan2020LessThan(puan,bolum_adi);
    }


    public List<String> getAllDepartmants(){
        return okulRepository.findAllDepartmants();
    }





}
