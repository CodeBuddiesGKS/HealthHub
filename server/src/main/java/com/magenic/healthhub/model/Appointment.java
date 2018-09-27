package com.magenic.healthhub.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "appointments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	@Column(name = "description")
	private String description;
	@Column(name = "end_date", columnDefinition= "TIMESTAMP WITH TIME ZONE")
	private Date endDate;
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(
		name = "patient_id",
		referencedColumnName = "id",
		insertable=false,
		updatable=false,
		nullable=false
	)
	private Patient patient;
	@Column(name = "patient_id")
	private Long patientId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(
		name = "physician_id",
		referencedColumnName = "id",
		insertable=false,
		updatable=false,
		nullable=false
	)
	private Physician physician;
	@Column(name = "physician_id")
	private Long physicianId;
	@Column(name = "start_date", columnDefinition= "TIMESTAMP WITH TIME ZONE")
	private Date startDate;
	
	public Long getId() {
		return id;
	}
	public String getDescription() {
		return description;
	}
	public Date getEndDate() {
		return endDate;
	}
	public Patient getPatient() {
		return patient;
	}
	public Long getPatientId() {
		return patientId;
	}
	public Physician getPhysician() {
		return physician;
	}
	public Long getPhysicianId() {
		return physicianId;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}
	public void setPhysician(Physician physician) {
		this.physician = physician;
	}
	public void setPhysicianId(Long physicianId) {
		this.physicianId = physicianId;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
}
