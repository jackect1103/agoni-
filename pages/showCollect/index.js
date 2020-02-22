// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cartList = wx.getStorageSync("collectGoods");
    this.setData({
      cartList
    })
  },

})