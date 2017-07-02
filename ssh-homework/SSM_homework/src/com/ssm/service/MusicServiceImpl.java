package com.ssm.service;

import java.util.List;


import com.ssm.dao.MusicDao;
import com.ssm.entity.Music;

public class MusicServiceImpl implements MusicService{
	private MusicDao musicDao;
	public void setMusicDao(MusicDao musicDao) {
		this.musicDao = musicDao;
	}

	@Override
	public List<Music> getAllMusic(int from,int to) {
		return musicDao.getAllMusic(from, to);
	}

	@Override
	public int getCount() {
		return musicDao.getCount();
	}

	@Override
	public Music getMusicById(int mid) {
		return musicDao.getMusicById(mid);
	}

	

}
