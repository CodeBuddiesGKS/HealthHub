package com.magenic.controller;

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

import com.magenic.model.Patient;
import com.magenic.repository.PatientRepository;
import com.magenic.utility.Utility;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientsController {
	
	@Autowired
	private PatientRepository patientRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Patient> getAllPatients() {
		return patientRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Patient getPatient(@PathVariable("id") long id) {
		return patientRepository.getOne(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createPatient(@RequestBody Patient patient) {
		patientRepository.save(patient);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Patient updatePatient(@PathVariable("id") long id, @RequestBody Patient requestPatient) {
		Patient patientToUpdate = patientRepository.getOne(id);
		Utility.copyNonNullProperties(requestPatient, patientToUpdate);
		return patientRepository.save(patientToUpdate);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Patient deletePatient(@PathVariable("id") long id) {
		Patient patientToDelete = patientRepository.getOne(id);
		patientRepository.delete(patientToDelete);
		return patientToDelete;
	}
}
