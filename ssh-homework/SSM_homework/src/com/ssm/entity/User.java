package com.ssm.entity;

public class User {
	public String name;
	public String password;
	public int id;
	
	//!!!一定要显示的写无参构造函数
	public User(){}
	
	public User( int id,String name, String password) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "User [name=" + name + ", password=" + password + ", id=" + id + "]";
	}
	
}
