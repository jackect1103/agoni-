// pages/goods_list/index.js
import { request } from '../../require/index'
Page({

  /**
   * 页面的初始数据
   * data中的变量声明与页面的周期是跟页面同步的
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      }, {
        id: 1,
        value: '销量',
        isActive: false
      }, {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    currentIndex: 0,
    goods_list: []
  },
  // 全局变量不会随着页面销毁而销毁
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10 
  },
  //总页数
  totalPages: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过options获取当前路径参数
    const { cid,query } = options;
    this.queryParams.cid = cid||"";
    this.queryParams.query = query||"";
    console.log(this.queryParams);
    this.getGoodLists();
  },
  //获取数据
  async getGoodLists() {
    const res = await request({ url: '/goods/search', data: this.queryParams });
    console.log(res);
    const total = res.data.message.total;
    this.totalPages = Math.ceil(total / this.queryParams.pagesize);
    const goods_list = res.data.message.goods;
    this.setData({
      //将当前获取到的数据拼接到原有的数据上
      goods_list: [...this.data.goods_list, ...goods_list]
    })
    // 停止当前页面的下拉刷新
    wx.stopPullDownRefresh();
  },
  // 父组件的tabs事件
  setParent(data) {
    const index = data.detail;
    const { tabs } = this.data;
    tabs.forEach((v, i) => {
      i == index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs,
      currentIndex: index
    })

  },
  //监听用户上拉触底事件。
  async onReachBottom() {
    console.log(this.queryParams.pagenum + ",," + this.totalPages)
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据'
      })
    } else {
      this.queryParams.pagenum++
      this.getGoodLists();
    }
  },
  // 下拉刷新页面
  onPullDownRefresh() {
    this.setData({
      goods_list: [],
    })
    this.queryParams.pagenum = 1;
    this.totalPages = 0;
    this.getGoodLists();
  }


})

