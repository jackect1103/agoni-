/* 
  微信支付：
  1. 哪些人 那些账号 可以实现支付
     1. 企业账号
     2. 企业账号的小程序后台中必须 给开发者 添加上白名单
        1. 一个appid 可以同时绑定多个开发者
        2. 这些开发者就可以公用这个appid 和他的开发区权限
  支付按钮：
     1. 先判断缓存中有没有token
     2. 没有 跳转到权限页面 进行获取token
          获取token过程
              2.0 获取用户信息
              2.1 获取用户信息 bindgetuserinfo() open-type="getUserInfo"
              2.2 获取小程序登录成功后的code 通过wx.login();
              2.3 发送请求 获取用户token (注意：没有企业id是获取不到用户的token)
     3. 有token。。。
     4.  发送请求创建订单 获取订单编号
        eg:https://www.cnblogs.com/jcscript/p/6126722.html
     5. 准备预支付 发送请求获取支付参数 pay
     6. 发送微信支付wx.requestPayment({...pay})
*/
import { request } from '../../require/index'
Page({

  // 页面的初始数据
  data: {
    // 地址
    userAddress: {},
    // 购物车商品
    cartList: [],
    //购物车中的全部商品总价格
    totalPrice: 0,
    //购物车中的商品总数量
    totalCartNums: 0,
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getCartsGoods();
    console.log("onLoad")
  },

  // 生命周期函数--监听页面显示
  onShow() {
    const userAddress = wx.getStorageSync("userAddress");
    this.setData({ userAddress });
    console.log("onShow")
  },

  // 获取购物车中的所有checked商品
  getCartsGoods() {
    const cart = wx.getStorageSync("cart") || [];
    let totalCartNums = 0;
    let totalPrice = 0;
    let cartList = cart.filter(v => {
      if (v.checked) {
        totalCartNums += v.num;
        totalPrice += v.num * v.goods_price;
        return v;
      }
    })

    this.setData({
      cartList,
      totalPrice,
      totalCartNums
    })
    wx.getStorageSync("cart", cart)
  },
  // 支付
  pay() {
    // 1. 判断缓存中是否存在token
    const token = wx.getStorageSync("token");
    if (!token) {
      // 不存在
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    } else {
      // 存在token 创建订单 发送请求 获取订单编号
      // const {order_id} = await require({});
    }
  },
  onHide() { console.log('onHide()页面隐藏/切入后台时触发。 如 wx.navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。') },
  onUnload() { console.log('onUnload()页面卸载时触发。如wx.redirectTo或wx.navigateBack到其他页面时。') },
})