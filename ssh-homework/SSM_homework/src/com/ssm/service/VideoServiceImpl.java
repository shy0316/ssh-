package com.ssm.service;

import java.util.List;

import com.ssm.dao.VideoDao;
import com.ssm.entity.Music;
import com.ssm.entity.Video;

public class VideoServiceImpl implements VideoService{
	private VideoDao videoDao;
	public VideoDao getVideoDao() {
		return videoDao;
	}

	public void setVideoDao(VideoDao videoDao) {
		this.videoDao = videoDao;
	}

	@Override
	public List<Video> listVideo(int from, int to) {
		return videoDao.listVideo(from, to);
		
	}

	@Override
	public int getCount() {
		return videoDao.getCount();
	}

	@Override
	public Video getVideoById(int id) {
		return videoDao.getVideoById(id);
	}


}
