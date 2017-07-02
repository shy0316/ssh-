package com.ssm.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.alibaba.fastjson.JSON;
import com.ssm.entity.Video;
import com.ssm.service.VideoService;

public class VideoController extends MultiActionController{
	private VideoService videoService;

	public void setVideoService(VideoService videoService) {
		this.videoService = videoService;
	}

	// 请求:http://localhost:8080/SSM_homework/getVideo.action?action=getVideoById&vid=1
	// 根据id获得音频
	public void getVideoById(HttpServletRequest request, HttpServletResponse response) {
		int vid = Integer.parseInt(request.getParameter("vid"));
		Video video = videoService.getVideoById(vid);
		String jsonVideo = JSON.toJSONString(video);
		renderData(response, jsonVideo);
	}

	//http://localhost:8080/SSM_homework/getVideo.action?action=ajaxDatas?pageSize=9
	// 首次加载页面,得到当前页的数据
	public void ajaxDatas(HttpServletRequest request, HttpServletResponse response) {
		request.getSession().setAttribute("page", null);

		List<Video> lists = null;
		lists = getVideo(request, -1);
		for (Video video : lists) {
			System.out.println(video.toString());
		}
		String jsonString = JSON.toJSONString(lists);
		renderData(response, jsonString);
	}

	// 下一页
	public void ajaxDatasNext(HttpServletRequest request, HttpServletResponse response) {
		List<Video> lists = null;
		lists = getVideo(request, 1);
		for (Video video : lists) {
			System.out.println(video.toString());
		}
		String jsonString = JSON.toJSONString(lists);
		renderData(response, jsonString);
	}

	// 上一页
	public void ajaxDatasFront(HttpServletRequest request, HttpServletResponse response) {
		List<Video> lists = null;
		lists = getVideo(request, 0);
		for (Video video : lists) {
			System.out.println(video.toString());
		}
		String jsonString = JSON.toJSONString(lists);
		renderData(response, jsonString);
	}

	// 得到分页需要的音频
	public List<Video> getVideo(HttpServletRequest request, int a) {
		List<Video> lists = new ArrayList<>();
		int totalVideo = videoService.getCount();
		System.out.println("总条数：" + totalVideo);

		int currentPage = (request.getSession().getAttribute("page") == null ? 1
				: (int) request.getSession().getAttribute("page"));

		int pageSize = request.getParameter("pageSize") == null ? 6
				: (int) Integer.parseInt(request.getParameter("pageSize"));

		// System.out.println("currentPage:"+currentPage+"
		// "+"pageSize:"+pageSize);

		// int/int 为int
		request.getSession().setAttribute("totalPage", (int) (Math.ceil((totalVideo + 0.0) / pageSize)));

		// 下一页
		if (a == 1)
			currentPage++;
		// 上一页
		if (a == 0)
			currentPage--;
		// 当前页
		if (a == -1)
			;

		// 第一页
		if (currentPage <= 0) {
			currentPage = 1;
		}
		// 尾页
		if (currentPage > Math.ceil((totalVideo + 0.0) / pageSize)) {
			currentPage = 1;
		}

		System.out.println("currentPage:" + currentPage + "    " + "pageSize:" + pageSize);
		int currentResult = (currentPage - 1) * pageSize;

		int getSize = (totalVideo - currentResult + 1) >= pageSize ? pageSize : totalVideo - currentResult + 1;
		System.out.println("currentResult:" + currentResult + "   " + "     " + (currentPage - 1) * pageSize
				+ "getSize:" + getSize);
		lists = videoService.listVideo(currentResult, getSize);
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
			Logger.getLogger(VideoController.class.getName()).log(Level.ERROR, null, ex);
		} finally {
			if (null != printWriter) {
				printWriter.flush();
				printWriter.close();
			}
		}
	}
}
