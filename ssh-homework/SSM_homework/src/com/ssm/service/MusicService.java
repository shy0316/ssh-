package com.ssm.service;

import java.util.List;

import com.ssm.entity.Music;

public interface MusicService {
	public List<Music> getAllMusic(int from,int to);
	public int getCount();
	public Music getMusicById(int mid);
}
