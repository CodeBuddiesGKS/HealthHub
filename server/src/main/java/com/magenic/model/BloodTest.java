package com.magenic.model;

import java.util.Date;

public class BloodTest {
	private Date testDate;
	
	private long redBloodCellCount;
	private int whiteBloodCellCount;
	private int plateletCount;
	private int hemoglobinLevel;
	private float hematocritLevel;
	private long meanCorpuscularVolume;
	
	private int plasmaGlucoseLevel;

	private int totalCholesterolLevel;
	private int ldlCholesterolLevel;
	private int hdlCholesterolLevel;
	
	public Date getTestDate() {
		return testDate;
	}
	public void setTestDate(Date testDate) {
		this.testDate = testDate;
	}
	public long getRedBloodCellCount() {
		return redBloodCellCount;
	}
	public void setRedBloodCellCount(long redBloodCellCount) {
		this.redBloodCellCount = redBloodCellCount;
	}
	public int getWhiteBloodCellCount() {
		return whiteBloodCellCount;
	}
	public void setWhiteBloodCellCount(int whiteBloodCellCount) {
		this.whiteBloodCellCount = whiteBloodCellCount;
	}
	public int getPlateletCount() {
		return plateletCount;
	}
	public void setPlateletCount(int plateletCount) {
		this.plateletCount = plateletCount;
	}
	public int getHemoglobinLevel() {
		return hemoglobinLevel;
	}
	public void setHemoglobinLevel(int hemoglobinLevel) {
		this.hemoglobinLevel = hemoglobinLevel;
	}
	public float getHematocritLevel() {
		return hematocritLevel;
	}
	public void setHematocritLevel(float hematocritLevel) {
		this.hematocritLevel = hematocritLevel;
	}
	public long getMeanCorpuscularVolume() {
		return meanCorpuscularVolume;
	}
	public void setMeanCorpuscularVolume(long meanCorpuscularVolume) {
		this.meanCorpuscularVolume = meanCorpuscularVolume;
	}
	public int getPlasmaGlucoseLevel() {
		return plasmaGlucoseLevel;
	}
	public void setPlasmaGlucoseLevel(int plasmaGlucoseLevel) {
		this.plasmaGlucoseLevel = plasmaGlucoseLevel;
	}
	public int getTotalCholesterolLevel() {
		return totalCholesterolLevel;
	}
	public void setTotalCholesterolLevel(int totalCholesterolLevel) {
		this.totalCholesterolLevel = totalCholesterolLevel;
	}
	public int getLdlCholesterolLevel() {
		return ldlCholesterolLevel;
	}
	public void setLdlCholesterolLevel(int ldlCholesterolLevel) {
		this.ldlCholesterolLevel = ldlCholesterolLevel;
	}
	public int getHdlCholesterolLevel() {
		return hdlCholesterolLevel;
	}
	public void setHdlCholesterolLevel(int hdlCholesterolLevel) {
		this.hdlCholesterolLevel = hdlCholesterolLevel;
	}
}
