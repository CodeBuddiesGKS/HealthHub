package com.magenic.healthhub.service;

import java.util.Date;
import java.util.List;

import com.magenic.healthhub.model.Appointment;

public interface AppointmentService {
	
	public List<Appointment> getAllAppointments();
	
	public Appointment getAppointment(long id);
	
	public List<Appointment> getAppointmentsByPatientId(Long patientId);
	
	public List<Appointment> getAppointmentsByPhysicianId(Long physicianId);
	
	public List<Appointment> getAppointmentsByPatientIdBetweenStartDateAndEndDate(
			Long patientId,
			Date startDate,
			Date endDate);
	
	public List<Appointment> getAppointmentsByPhysicianIdBetweenStartDateAndEndDate(
			Long physicianId,
			Date startDate,
			Date endDate);
	
	public Appointment createAppointment(Appointment appointment);
	
	public Appointment updateAppointment(Appointment requestAppointment);
	
	public Appointment deleteAppointment(long id);
	
}
