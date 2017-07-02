package com.ssm.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.alibaba.fastjson.JSON;
import com.ssm.entity.Music;
import com.ssm.service.MusicService;

/*@Controller
@RequestMapping(value="/music")*/
public class MusicController extends MultiActionController {
	/* @Autowired */
	private MusicService musicService;

	public void setMusicService(MusicService musicService) {
		this.musicService = musicService;
	}
	
	
	//请求:http://localhost:8080/SSM_homework/getMusic.action?action=getMusicById&mid=1
	//根据id获得音乐
	public void getMusicById(HttpServletRequest request,HttpServletResponse response){
		int mid=Integer.parseInt(request.getParameter("mid"));
		Music music= musicService.getMusicById(mid);
		String jsonMusic= JSON.toJSONString(music);
		renderData(response,jsonMusic);
		
	}

	// 首次加载页面,得到当前页的数据
	public void ajaxDatas(HttpServletRequest request, HttpServletResponse response) {
		request.getSession().setAttribute("page", null);

		List<Music> lists = null;
		lists = getMusic(request, -1);
		for (Music music : lists) {
			System.out.println(music.toString());
		}
		String jsonString = JSON.toJSONString(lists);
		renderData(response, jsonString);
	}

	// 下一页
	public void ajaxDatasNext(HttpServletRequest request, HttpServletResponse response) {
		List<Music> lists = null;
		lists = getMusic(request, 1);
		for (Music music : lists) {
			System.out.println(music.toString());
		}
		String jsonString = JSON.toJSONString(lists);
		renderData(response, jsonString);
	}

	// 上一页
	public void ajaxDatasFront(HttpServletRequest request, HttpServletResponse response) {
		List<Music> lists = null;
		lists =getMusic(request, 0);
		for (Music music : lists) {
			System.out.println(music.toString());
		}
		String jsonString = JSON.toJSONString(lists);
		renderData(response, jsonString);
	}


	// 得到分页需要的音乐数据
	public List<Music> getMusic(HttpServletRequest request, int a) {
		List<Music> lists = new ArrayList<>();
		int totalMusic = musicService.getCount();
		System.out.println(musicService);
		System.out.println("总条数：" + totalMusic);

		int currentPage = (request.getSession().getAttribute("page") == null ? 1
				: (int) request.getSession().getAttribute("page"));

		int pageSize = request.getParameter("pageSize") == null ? 6
				: (int) Integer.parseInt(request.getParameter("pageSize"));

		// System.out.println("currentPage:"+currentPage+"
		// "+"pageSize:"+pageSize);

		// int/int 为int
		request.getSession().setAttribute("totalPage", (int) (Math.ceil((totalMusic + 0.0) / pageSize)));

		// 下一页
		if (a == 1)
			currentPage++;
		// 上一页
		if (a == 0)
			currentPage--;
		//当前页
		if(a==-1)
			;
		

		// 第一页
		if (currentPage <= 0) {
			currentPage = 1;
		}
		// 尾页
		if (currentPage > Math.ceil((totalMusic+0.0) / pageSize)) {
			currentPage = 1;
		}

		System.out.println("currentPage:" + currentPage + "    " + "pageSize:" + pageSize);
		int currentResult = (currentPage - 1) * pageSize;

		int getSize = (totalMusic - currentResult + 1) >= pageSize ? pageSize : totalMusic - currentResult + 1;
		System.out.println("currentResult:" + currentResult + "   " + "     " + (currentPage - 1) * pageSize
				+ "getSize:" + getSize);
		lists = musicService.getAllMusic(currentResult, getSize);
		System.out.println("lists 的大小：" + lists.size());

		request.getSession().setAttribute("page", currentPage);

		return lists;

	}

	// 输出json数据
	private void renderData(HttpServletResponse response, String data) {
		PrintWriter printWriter = null;
		try {
			printWriter = response.getWriter();
			response.setCharacterEncoding("utf-8");
			printWriter.print(data);
		} catch (IOException ex) {
			Logger.getLogger(MusicController.class.getName()).log(Level.ERROR, null, ex);
		} finally {
			if (null != printWriter) {
				printWriter.flush();
				printWriter.close();
			}
		}
	}

}
