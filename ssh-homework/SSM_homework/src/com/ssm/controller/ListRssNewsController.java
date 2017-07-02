package com.ssm.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public class ListRssNewsController implements Controller{


	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String str=request.getParameter("url");
		URL url=new URL(str);
		HttpURLConnection connection=(HttpURLConnection) url.openConnection();
		if(connection.getResponseCode()==HttpURLConnection.HTTP_OK)
			System.out.println("请求新闻数据成功");
		InputStream in=connection.getInputStream();
		InputStreamReader inReader=new InputStreamReader(in,"utf-8");
		BufferedReader bReader=new BufferedReader(inReader);
		
		//将流读入到string中
		StringBuffer stringBuffer=new StringBuffer();
		String line=null;
		while((line=bReader.readLine())!=null){
			stringBuffer.append(line);
		}
		System.out.println(stringBuffer);
		
		PrintWriter writer= response.getWriter();
		response.setCharacterEncoding("utf-8");
		writer.print(stringBuffer);
		writer.flush();
		writer.close();
		return null;
	}

}
