package com.ssm.service;

import com.ssm.dao.UserDao;
import com.ssm.entity.User;

public class UserServiceImpl implements UserService{
	private UserDao userDao;

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	@Override
	public User login(String name, String password) {
		return userDao.login(name, password);
	}

}
