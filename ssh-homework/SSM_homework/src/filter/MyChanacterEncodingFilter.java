package filter;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyChanacterEncodingFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("MyChanacterEncodingFilter  init  。。。。。");		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("MyChanacterEncodingFilter  doFilter");
		HttpServletRequest hsRequest=(HttpServletRequest) request;
		HttpServletResponse httpServletResponse=(HttpServletResponse) response;
		
		Enumeration<String> en= request.getParameterNames();
		while(en.hasMoreElements()){
			String string=en.nextElement();
			String value=hsRequest.getParameter(string);
			System.out.println(string+":"+value);
			String newValue=new String(value.getBytes("iso8859-1"),"utf-8");
			System.out.println(string+":"+newValue);
			
		}
		chain.doFilter(request, response);
		
	}

	@Override
	public void destroy() {
		System.out.println("MyChanacterEncodingFilter  destroy。。。。");
	}

}
