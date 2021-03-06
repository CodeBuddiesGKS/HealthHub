package com.magenic.healthhub.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;

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

import com.magenic.healthhub.model.Office;
import com.magenic.healthhub.model.OfficeHour;
import com.magenic.healthhub.repository.OfficeRepository;

@RestController
@RequestMapping("/api/v1/offices")
public class OfficeController {

	@Autowired
	private OfficeRepository officeRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Office> getAllOffices() {
		return officeRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Office getOffice(@PathVariable("id") long id) {
		return officeRepository.getOne(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Office createOffice(@RequestBody Office office) {
		Office newOffice = new Office();
		newOffice.setTitle(office.getTitle());
		newOffice.setPhone(office.getPhone());
		newOffice.setAddress1(office.getAddress1());
		newOffice.setAddress2(office.getAddress2());
		newOffice.setAddress3(office.getAddress3());
		newOffice.setCity(office.getCity());
		newOffice.setState(office.getState());
		newOffice.setZipcode(office.getZipcode());
		
		for (OfficeHour hour: office.getHours()) {
			OfficeHour newHour = new OfficeHour();
			newHour.setDay(hour.getDay());
			newHour.setOpenTime(hour.getOpenTime());
			newHour.setCloseTime(hour.getCloseTime());
			newOffice.addOfficeHour(newHour);
		};
//		
		return officeRepository.save(newOffice);
	}

	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public Office updateOffice(@RequestBody Office requestOffice) {
		return officeRepository.save(requestOffice);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Office deleteOffice(@PathVariable("id") long id) {
		Office officeToDelete = officeRepository.getOne(id);
		officeRepository.delete(officeToDelete);
		return officeToDelete;
	}
	
}
