package com.ssm.entity;

public class Music {
	private int id;
	private String mName;
	private String mPath;
	private String mPic;
	private String mSinger;
	public int getId() {
		return id;
	}
	public String getmName() {
		return mName;
	}
	public String getmPath() {
		return mPath;
	}
	public String getmPic() {
		return mPic;
	}
	public String getmSinger() {
		return mSinger;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setmName(String mName) {
		this.mName = mName;
	}
	public void setmPath(String mPath) {
		this.mPath = mPath;
	}
	public void setmPic(String mPic) {
		this.mPic = mPic;
	}
	public void setmSinger(String mSinger) {
		this.mSinger = mSinger;
	}
	@Override
	public String toString() {
		return "Music [id=" + id + ", mName=" + mName + ", mPath=" + mPath + ", mPic=" + mPic + ", mSinger=" + mSinger
				+ "]";
	}
	
}
