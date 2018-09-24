package com.magenic.healthhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.magenic.healthhub.model.Physician;

@Repository
public interface PhysicianRepository extends JpaRepository<Physician, Long> {

	List<Physician> findByOfficeIdOrderByFirstNameAscLastNameAsc(@Param("officeId") Long officeId);
	
}
