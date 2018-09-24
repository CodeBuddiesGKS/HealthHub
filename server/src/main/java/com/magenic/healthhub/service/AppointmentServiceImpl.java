package com.magenic.healthhub.service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.magenic.healthhub.model.Appointment;
import com.magenic.healthhub.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {
	
	@Autowired
	private AppointmentRepository appointmentRepository;

	@Override
	public List<Appointment> getAllAppointments() {
		Sort sort = new Sort(Direction.ASC, Arrays.asList("startDate", "endDate"));
		return appointmentRepository.findAll(sort);
	}

	@Override
	public Appointment getAppointment(long id) {
		return appointmentRepository.getOne(id);
	}

	@Override
	public List<Appointment> getAppointmentsByPatientId(Long patientId) {
		return appointmentRepository.findByPatientIdOrderByStartDateAscEndDateAsc(patientId);
	}

	@Override
	public List<Appointment> getAppointmentsByPhysicianId(Long physicianId) {
		return appointmentRepository.findByPhysicianIdOrderByStartDateAscEndDateAsc(physicianId);
	}
	
	@Override
	public List<Appointment> getAppointmentsByPatientIdBetweenStartDateAndEndDate(Long patientId, Date startDate, Date endDate) {
		return appointmentRepository.findByPatientIdAndStartDateGreaterThanEqualAndEndDateLessThanEqualOrderByStartDateAscEndDateAsc(patientId, startDate, endDate);
	}
	
	@Override
	public List<Appointment> getAppointmentsByPhysicianIdBetweenStartDateAndEndDate(Long physicianId, Date startDate, Date endDate) {
		return appointmentRepository.findByPhysicianIdAndStartDateGreaterThanEqualAndEndDateLessThanEqualOrderByStartDateAscEndDateAsc(physicianId, startDate, endDate);
	}

	@Override
	public Appointment createAppointment(Appointment appointment) {
		return appointmentRepository.save(appointment);
	}

	@Override
	public Appointment updateAppointment(Appointment requestAppointment) {
		return appointmentRepository.save(requestAppointment);
	}

	@Override
	public Appointment deleteAppointment(long id) {
		Appointment appointmentToDelete = appointmentRepository.getOne(id);
		appointmentRepository.delete(appointmentToDelete);
		return appointmentToDelete;
	}

}
