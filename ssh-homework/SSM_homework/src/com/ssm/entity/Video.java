package com.ssm.entity;

public class Video {
	private int id;
	private String vName;
	private String vPath;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getvName() {
		return vName;
	}
	public void setvName(String vName) {
		this.vName = vName;
	}
	public String getvPath() {
		return vPath;
	}
	public void setvPath(String vPath) {
		this.vPath = vPath;
	}
	@Override
	public String toString() {
		return "Video [id=" + id + ", vName=" + vName + ", vPath=" + vPath + "]";
	}
	
	
}
