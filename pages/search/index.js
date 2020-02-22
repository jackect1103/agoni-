// pages/search/index.js
import { request } from '../../require/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    isFocus: false,
    inpValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  timer: -1,
  //搜索
  bindKeyInput(e) {
    const { value } = e.detail
    // 检测合法性
    if (!value.trim()) {
      this.setData({
        searchList:[],
        isFocus: false
      })
      return;
    };
    this.setData({
      isFocus: true
    })
    clearInterval(this.timer);
    this.timer = setTimeout(() => {
      this.qsearch(value);
    }, 1000)


  },
  async qsearch(query) {
    let res = await request({ url: "/goods/qsearch", data: { query } });
    const { message } = res.data
    this.setData({
      searchList: message
    })
  },
  //取消按钮
  handleCancle() {
    this.setData({
      searchList: [],
      isFocus: false,
      inpValue:""
    });

  }
})