import { request } from '../../require/index'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左边数据
    leftMenuList: [],
    //右边数据
    rightConetnt: [],
    //左侧当前index
    currentIndex: 0,
    //scroll-top顶部距离
    topNumber: 0
  },
  //接口返回的数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
      本地缓存：
        1.
          web中的本地缓存：localStorage.setItem("key","value"),localStorage.setItem('key');
          小程序中的本地缓存:wx.setStorageSync("key","value"),wx.getStorageSync('key');
        2. 
          web：回想将数据进行数据类型转换toString
          小程序：不会进行数据类型转换
    */
    const cats = wx.getStorageSync('cats');
    if (!cats) {
      console.log("1");
      this.getCates();
    } else {
      if (Date.now() - cats.data > 1000 * 60 * 60 * 24) {
        console.log("2");
        this.getCates();
      } else {
        console.log("3");
        this.Cates = cats.data;
        //获取左边商品分类名称
        const leftMenuList = this.Cates.map(v => v.cat_name);
        //获取右边商品具体数据
        const rightConetnt = this.Cates[0].children
        this.setData({
          leftMenuList, rightConetnt
        })
      }
    }

  },
  //获取getCates分类数据
  getCates() {
    request({
      url: '/categories'
    })
      .then(result => {
        //将数据存储到缓存中
        wx.setStorageSync('cats', {
          time: Date.now(),
          data: result.data.message
        })
        this.Cates = result.data.message;
        //获取左边商品分类名称
        const leftMenuList = this.Cates.map(v => v.cat_name);
        //获取右边商品具体数据
        const rightConetnt = this.Cates[0].children
        this.setData({
          leftMenuList, rightConetnt
        })
      })

  },
  // 该变左侧index
  handleIndex(e) {
    const { index } = e.currentTarget.dataset;
    const rightConetnt = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightConetnt,
      // 设置每次点击菜单后，右边顶部距离 
      topNumber: 0
    })
  }

})