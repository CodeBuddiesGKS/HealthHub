package com.magenic.healthhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.magenic.healthhub.model.Physician;
import com.magenic.healthhub.repository.AppointmentRepository;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentRepository appointmentRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Appointment getAppointment(@PathVariable("id") long id) {
		return appointmentRepository.getOne(id);
	}

	@GetMapping("/physicianId/{physicianId}")
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAppointmentByPhysicianId(@PathVariable("physicianId") Long physicianId) {
		return appointmentRepository.findByPhysicianId(physicianId);
	}

	@GetMapping("/patientId/{patientId}")
	@ResponseStatus(HttpStatus.OK)
	public List<Appointment> getAppointmentByPatientId(@PathVariable("patientId") Long patientId) {
		return appointmentRepository.findByPatientId(patientId);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Appointment createAppointment(@RequestBody Appointment appointment) {
		return appointmentRepository.save(appointment);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Appointment updateAppointment(@PathVariable("id") long id, @RequestBody Appointment requestAppointment) {
		return appointmentRepository.save(requestAppointment);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Appointment deleteAppointment(@PathVariable("id") long id) {
		Appointment appointmentToDelete = appointmentRepository.getOne(id);
		appointmentRepository.delete(appointmentToDelete);
		return appointmentToDelete;
	}
	
}
