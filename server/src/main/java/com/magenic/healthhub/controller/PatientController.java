package com.magenic.healthhub.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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

import com.magenic.healthhub.model.Patient;
import com.magenic.healthhub.repository.PatientRepository;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

	@Autowired
	private PatientRepository patientRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Patient> getAllPatients() {
		Sort sort = new Sort(Direction.ASC, Arrays.asList("firstName", "lastName"));
		return patientRepository.findAll(sort);
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Patient getPatient(@PathVariable("id") long id) {
		return patientRepository.getOne(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Patient createPatient(@RequestBody Patient patient) {
		return patientRepository.save(patient);
	}

	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public Patient updatePatient(@RequestBody Patient requestPatient) {
		return patientRepository.save(requestPatient);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Patient deletePatient(@PathVariable("id") long id) {
		Patient patientToDelete = patientRepository.getOne(id);
		patientRepository.delete(patientToDelete);
		return patientToDelete;
	}
	
}
