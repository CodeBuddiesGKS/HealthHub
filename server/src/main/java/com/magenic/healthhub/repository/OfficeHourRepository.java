package com.magenic.healthhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.magenic.healthhub.model.OfficeHour;

@Repository
public interface OfficeHourRepository extends JpaRepository<OfficeHour, Long> {

}
