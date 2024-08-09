package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OkulRepository extends JpaRepository<tum_okullar, Integer> {

    @Query("SELECT o FROM tum_okullar o where o.siralama_2023< :siralama and not o.siralama_2023=-1")
    List<tum_okullar> findBySiralama2023GreaterThan(@Param("siralama") int siralama);





    @Query("select o from tum_okullar o where o.puan_2023 < :puan  and o.puan_turu='SAY' and o.puan_2023 != -1 and o.bolum_adi=:bolum_adi order by o.puan_2023 desc limit 15")
    List<tum_okullar> findByPuan2023LessThan(@Param("puan") int puan,@Param("bolum_adi") String bolum_adi);

    @Query("select o from tum_okullar o  where o.puan_2022<:puan and o.puan_turu='SAY' and  o.puan_2022!=-1 and o.bolum_adi=:bolum_adi order by o.puan_2022 desc limit 15")
    List<tum_okullar> findByPuan2022LessThan(@Param("puan") int puan,@Param("bolum_adi") String bolum_adi);

    @Query("select o from tum_okullar o  where o.puan_2021<:puan and o.puan_turu='SAY' and  o.puan_2021!=-1 and o.bolum_adi=:bolum_adi order by o.puan_2021 desc limit 15")
    List<tum_okullar> findByPuan2021LessThan(@Param("puan") int puan,@Param("bolum_adi") String bolum_adi);

    @Query("select o from tum_okullar o  where o.puan_2020<:puan and o.puan_turu='SAY' and  o.puan_2020!=-1 and o.bolum_adi=:bolum_adi order by o.puan_2020 desc limit 15")
    List<tum_okullar> findByPuan2020LessThan(@Param("puan") int puan,@Param("bolum_adi") String bolum_adi);









    @Query("select distinct bolum_adi from tum_okullar")
    List<String> findAllDepartmants();

}
