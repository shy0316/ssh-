package com.ssm.dao;

import java.awt.List;

import com.ssm.entity.User;

public interface UserDao {
	public User login(String name,String password);
}
