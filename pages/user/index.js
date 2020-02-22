// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectGoods:[]
  },
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collectGoods = wx.getStorageSync("collectGoods");
    console.log("user页面:", userInfo);
    this.setData({
      userInfo,
      collectGoods
    })
  },
  handleGetUserInfo(e) {
    const { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    console.log("userInfo", userInfo);
    this.setData({
      userInfo
    })
  }
})