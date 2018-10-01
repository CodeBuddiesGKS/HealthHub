package com.magenic.healthhub.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "offices")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Office {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	@Column(name = "title")
	private String title;
	@Column(name = "phone")
	private String phone;
	@Column(name = "address1")
	private String address1;
	@Column(name = "address2")
	private String address2;
	@Column(name = "address3")
	private String address3;
	@Column(name = "city")
	private String city;
	@Column(name = "state")
	private String state;
	@Column(name = "zipcode")
	private int zipcode;
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "office_id", referencedColumnName="id")
//	@OneToMany(mappedBy = "office", cascade = CascadeType.ALL, orphanRemoval = true)
	@OneToMany(mappedBy = "office", cascade = CascadeType.ALL)
    private List<OfficeHour> hours;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public String getAddress3() {
		return address3;
	}
	public void setAddress3(String address3) {
		this.address3 = address3;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public int getZipcode() {
		return zipcode;
	}
	public void setZipcode(int zipcode) {
		this.zipcode = zipcode;
	}
	public List<OfficeHour> getHours() {
		return hours;
	}
	public void setHours(List<OfficeHour> hours) {
		this.hours = hours;
	}
	public void addOfficeHour(OfficeHour hour) {
		if (hour == null) {
			return;
		}
		hour.setOffice(this);
		if (this.hours == null) {
			this.hours = new ArrayList<OfficeHour>();
			this.hours.add(hour);
		} else if (!this.hours.contains(hour)) {
			this.hours.add(hour);
		}
	}
//	public void removeOfficeHour(OfficeHour hour) {
//		this.hours.remove(hour);
//		hour.setOffice(null);
//	}
	
}
