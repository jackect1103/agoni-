//引入request文件
import { request } from '../../require/index'
//Page Object
Page({
  data: {
    //轮播图数据
    swiperList: [],
    //分类icon图标
    catesList: [],
    //楼层数据
    floorList: []
  },
  //页面初始化
  onLoad: function (options) {
    //1. 发送异步请求数据
    //第一次请求数据时：如果只是测试的联系项目,可以点击项目配置,本地配置里,勾选不校验域名
    this.getSwiperList();
    //获取分类icon图标
    this.getCateList();
    //获取楼层数据
    this.getFloorList()
  },
  // 获取轮播图
  async getSwiperList() {
    /* request({
      url:'https://api.zbztb.cn/api/public/v1/home/swiperdata'
    }).then((result)=>{
      this.setData({
        swiperList:result.data.message
      })
    }) */
    // 使用es7（async）需要打勾增强编译
    let result = await request({ url: '/home/swiperdata' });
    this.setData({
      swiperList: result.data.message
    })
  },
  // 获取分类icon图标
  getCateList() {
    request({
      url: '/home/catitems'
    }).then((result) => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then((result) => {
      this.setData({
        floorList: result.data.message
      })
    })
  }
});