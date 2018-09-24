package com.magenic.healthhub.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.magenic.healthhub.model.Appointment;
import com.magenic.healthhub.service.AppointmentService;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAllAppointments() {
		return appointmentService.getAllAppointments();
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Appointment getAppointment(@PathVariable("id") long id) {
		return appointmentService.getAppointment(id);
	}

	@GetMapping("/patientId/{patientId}")
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAppointmentsByPatientId(@PathVariable("patientId") Long patientId) {
		return appointmentService.getAppointmentsByPatientId(patientId);
	}

	@GetMapping("/physicianId/{physicianId}")
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAppointmentsByPhysicianId(@PathVariable("physicianId") Long physicianId) {
		return appointmentService.getAppointmentsByPhysicianId(physicianId);
	}

	@GetMapping("/patientIdBetweenDates/{patientId}/{startDate}/{endDate}")
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAppointmentsByPatientIdBetweenStartDateAndEndDate(
			@PathVariable("patientId") Long patientId,
			@PathVariable("startDate") @DateTimeFormat(iso=ISO.DATE_TIME) Date startDate,
			@PathVariable("endDate") @DateTimeFormat(iso=ISO.DATE_TIME) Date endDate) {
		return appointmentService.getAppointmentsByPatientIdBetweenStartDateAndEndDate(patientId, startDate, endDate);
	}

	@GetMapping("/physicianIdBetweenDates/{physicianId}/{startDate}/{endDate}")
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAppointmentsByPhysicianIdBetweenStartDateAndEndDate(
			@PathVariable("physicianId") Long physicianId,
			@PathVariable("startDate") @DateTimeFormat(iso=ISO.DATE_TIME) Date startDate,
			@PathVariable("endDate") @DateTimeFormat(iso=ISO.DATE_TIME) Date endDate) {
		return appointmentService.getAppointmentsByPhysicianIdBetweenStartDateAndEndDate(physicianId, startDate, endDate);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Appointment createAppointment(@RequestBody Appointment appointment) {
		return appointmentService.createAppointment(appointment);
	}

	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public Appointment updateAppointment(@RequestBody Appointment requestAppointment) {
		return appointmentService.updateAppointment(requestAppointment);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Appointment deleteAppointment(@PathVariable("id") long id) {
		return appointmentService.deleteAppointment(id);
	}
	
}
