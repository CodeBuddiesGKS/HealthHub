package com.magenic.healthhub.controller;

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

import com.magenic.healthhub.model.OfficeHour;
import com.magenic.healthhub.repository.OfficeHourRepository;

@RestController
@RequestMapping("/api/v1/office_hours")
public class OfficeHourController {

	@Autowired
	private OfficeHourRepository officeHourRepository;
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public OfficeHour getOfficeHour(@PathVariable("id") long id) {
		return officeHourRepository.getOne(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public OfficeHour createOfficeHour(@RequestBody OfficeHour officeHour) {
		return officeHourRepository.save(officeHour);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public OfficeHour updateOfficeHour(@PathVariable("id") long id, @RequestBody OfficeHour requestOfficeHour) {
		return officeHourRepository.save(requestOfficeHour);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public OfficeHour deleteOfficeHour(@PathVariable("id") long id) {
		OfficeHour officeHourToDelete = officeHourRepository.getOne(id);
		officeHourRepository.delete(officeHourToDelete);
		return officeHourToDelete;
	}
	
}
