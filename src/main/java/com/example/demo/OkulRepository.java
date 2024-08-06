package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OkulRepository extends JpaRepository<tum_okullar, Integer> {

    @Query("SELECT o FROM tum_okullar o where o.siralama_2023< :siralama and not o.siralama_2023=-1")
    List<tum_okullar> findBySiralama2023GreaterThan(@Param("siralama") int siralama);


    @Query("select o from tum_okullar o where o.puan_2023 < :puan  and o.puan_turu='SAY' and not o.puan_2023 = -1 order by o.siralama_2023")
    List<tum_okullar> findByPuan2023LessThan(@Param("puan") int puan);

    @Query("select o from tum_okullar o where o.puan_2023 > :puan  and o.puan_turu='SAY' and not o.puan_2023 = -1 order by o.siralama_2023 desc")
    List<tum_okullar> findByPuan2023GreaterThan(@Param("puan") int puan);
}
