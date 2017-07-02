package com.ssm.service;

import java.util.List;

import com.ssm.entity.Music;
import com.ssm.entity.Video;

public interface VideoService {
	public List<Video> listVideo(int from,int to);
	public int getCount();
	public Video getVideoById(int id);
}
