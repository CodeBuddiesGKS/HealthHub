package com.magenic.healthhub.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.magenic.healthhub.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findByPatientIdOrderByStartDateAscEndDateAsc(Long patientId);

	List<Appointment> findByPhysicianIdOrderByStartDateAscEndDateAsc(Long physicianId);

	List<Appointment> findByPatientIdAndStartDateGreaterThanEqualAndEndDateLessThanEqualOrderByStartDateAscEndDateAsc(Long patientId, Date startDate, Date endDate);

	List<Appointment> findByPhysicianIdAndStartDateGreaterThanEqualAndEndDateLessThanEqualOrderByStartDateAscEndDateAsc(Long physicianId, Date startDate, Date endDate);

}
