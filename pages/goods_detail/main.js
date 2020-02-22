import { request } from "../../require/index"

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 该商品的部分信息
    goodsObj: []
  },
  // 该商品的全部信息
  GoodInfo: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    console.log("onLoad")
    this.getGoodsObj(goods_id);
  },
  // 获取商品数据
  async getGoodsObj(goods_id) {
    let goodsObj = wx.getStorageSync("collectGoods") || [];
    let index = goodsObj.findIndex(v => v.goods_id == goods_id);

    if (goodsObj.length != 0 && index !== -1) {
      // 缓存中存在该商品
      goodsObj = goodsObj[index];
      console.log("缓存中存在该商品:", index);
    } else {
      // 不存在该商品
      console.log("不存在该商品");
      const res = await request({ url: '/goods/detail', data: { goods_id } });
      let goods = res.data.message;
      goods.collect = false;
      goods.goods_introduce.replace(/\.webp/g, '.jpg');
      goodsObj = goods;
    }

    this.GoodInfo = goodsObj;
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce,
        pics: goodsObj.pics,
        collect: goodsObj.collect
      }
    })
  },
  // 点击图片放大
  handlePreviewImg(e) {
    const current = e.currentTarget.dataset.url;
    const urls = this.GoodInfo.pics.map(v => v.pics_mid)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //将商品添加到购物车
  getAddCar() {
    /* 
      0. 创建缓存数组 storageList[]
      1.先判断缓存中是否存在该商品
      2.没有 则将该商品添加进缓存 并且添加一个属性nums
      3. 有 则修改缓存中的该商品的存在数量
    */
    const cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodInfo.goods_id);

    if (index === -1) {
      //当缓存中不存在该商品时，创建该缓存数据
      this.GoodInfo.num = 1;
      cart.push(this.GoodInfo);
    } else {
      //存在
      cart[index].num++;
      // console.log(cart[index].num);
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    });
  },
  // 收藏按钮
  handleCollect() {
    /* 
      0. 获取collect缓存数据
      1. 已收藏 就取消收藏
      2. 为收藏 则收藏
      3. 添加到缓存中
    */
    let collectGoods = wx.getStorageSync("collectGoods") || [];
    let { goodsObj } = this.data;
    const { goods_id, collect } = this.GoodInfo;
    this.GoodInfo.collect = !collect ? true : false;

    const index = collectGoods.findIndex(v => v.goods_id === goods_id);
    if (index !== -1) {
      // 缓存中存在该商品 删除该商品
      collectGoods.splice(index, 1);
    } else {
      //  不存在
      collectGoods.push(this.GoodInfo);
    }
    wx.setStorageSync("collectGoods", collectGoods);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce,
        pics: goodsObj.pics,
        collect: this.GoodInfo.collect
      }
    })
  }

})