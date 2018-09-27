package com.magenic.healthhub.model;

import java.time.LocalTime;

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
@Table(name = "office_hours")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class OfficeHour {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
//	@ManyToOne(fetch = FetchType.LAZY, targetEntity = Office.class, optional = false)
//    @JoinColumn(name = "office_id", nullable = false)
//	private Office office;
	@Column(name = "office_id")
	private Long officeId;
	@Column(name = "day")
	private int day;
	@Column(name = "open_time")
	private LocalTime openTime;
	@Column(name = "close_time")
	private LocalTime closeTime;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
//	public Office getOffice() {
//		return office;
//	}
//	public void setOffice(Office office) {
//		this.office = office;
//	}
	public Long getOfficeId() {
		return officeId;
	}
	public void setOfficeId(Long officeId) {
		this.officeId = officeId;
	}
	public int getDay() {
		return day;
	}
	public void setDay(int day) {
		this.day = day;
	}
	public LocalTime getOpenTime() {
		return openTime;
	}
	public void setOpenTime(LocalTime openTime) {
		this.openTime = openTime;
	}
	public LocalTime getCloseTime() {
		return closeTime;
	}
	public void setCloseTime(LocalTime closeTime) {
		this.closeTime = closeTime;
	}

}
