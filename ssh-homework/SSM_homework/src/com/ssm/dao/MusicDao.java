package com.ssm.dao;

import java.util.List;

import com.ssm.entity.Music;

public interface MusicDao {
	public List<Music> getAllMusic(int from,int to);
	public int getCount();
	public Music getMusicById(int mid);
}
