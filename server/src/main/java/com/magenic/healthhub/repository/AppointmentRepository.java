package com.magenic.healthhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.magenic.healthhub.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findByPhysicianId(@Param("physicianId") Long physicianId);

	List<Appointment> findByPatientId(@Param("patientId") Long patientId);

}
