package com.ssm.controller;

import java.awt.Dialog.ModalExclusionType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.ssm.entity.User;
import com.ssm.service.UserService;

public class TestController implements Controller{
	UserService userService;
	
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String name=request.getParameter("name");
		String password=request.getParameter("password");
		System.out.println(name+":"+password);
		User user= this.userService.login(name, password);
		System.out.println(user.toString());
		ModelAndView mv=new ModelAndView();
		if(user!=null){
			mv.setViewName("success");
			return mv;
		}
		mv.setViewName("error");
		return mv;
		
	}
	
}
