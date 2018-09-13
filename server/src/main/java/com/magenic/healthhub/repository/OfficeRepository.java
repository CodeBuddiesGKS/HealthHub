package com.magenic.healthhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.magenic.healthhub.model.Office;

@Repository
public interface OfficeRepository extends JpaRepository<Office, Long> {

}
