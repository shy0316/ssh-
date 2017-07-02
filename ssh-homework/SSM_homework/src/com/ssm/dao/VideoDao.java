package com.ssm.dao;

import java.util.List;

import com.ssm.entity.Video;

public interface VideoDao {
	public List<Video> listVideo(int from,int to);
	public int getCount();
	public Video getVideoById(int id);
	
}
