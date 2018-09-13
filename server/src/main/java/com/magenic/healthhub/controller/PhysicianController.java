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

import com.magenic.healthhub.model.Physician;
import com.magenic.healthhub.repository.PhysicianRepository;

@RestController
@RequestMapping("/api/v1/physicians")
public class PhysicianController {

	@Autowired
	private PhysicianRepository physicianRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Physician> getAllPhysicians() {
		return physicianRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Physician getPhysician(@PathVariable("id") long id) {
		return physicianRepository.getOne(id);
	}

	@GetMapping("/officeId/{officeId}")
	@ResponseStatus(HttpStatus.OK)
	public List<Physician> getPhysiciansByOfficeId(@PathVariable("officeId") Long officeId) {
		return physicianRepository.findByOfficeId(officeId);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Physician createPhysician(@RequestBody Physician physician) {
		return physicianRepository.save(physician);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Physician updatePhysician(@PathVariable("id") long id, @RequestBody Physician requestPhysician) {
		return physicianRepository.save(requestPhysician);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Physician deletePhysician(@PathVariable("id") long id) {
		Physician physicianToDelete = physicianRepository.getOne(id);
		physicianRepository.delete(physicianToDelete);
		return physicianToDelete;
	}
	
}
