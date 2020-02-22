import { getSetting, openSetting, chooseAddress, showModal, showToast } from '../../utils/asyncWX'
// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 地址
    userAddress: {},
    // 购物车商品
    cartList: [],
    //购物车中的全部商品总价格
    totalPrice: 0,
    //购物车中的商品总数量
    totalCartNums: 0,
    // 全选
    allChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartsGoods();
  },
  onShow(){
    const userAddress = wx.getStorageSync("userAddress");
    this.setData({userAddress});
  },
  // 获取收货地址
  async addAddress() {
    try {
      // 0. 先获取授权信息
      const settingRes = await getSetting();
      const scopeAddress = settingRes.authSetting['scope.address'];

      let addressRes = {}
      //1. 需要先判断是否授权
      if (scopeAddress || scopeAddress == undefined) {
        // 2.已授权 获取用户地址信息
        addressRes = await chooseAddress();
      } else {
        // 3. 未授权 
        // 4. 跳转到授权页面
        await openSetting();
        // 5. 在获取用户地址信息
        addressRes = await chooseAddress();
      }
      addressRes.all = addressRes.provinceName + addressRes.cityName + addressRes.countyName + addressRes.detailInfo
      this.setData({
        userAddress: addressRes
      })
      wx.setStorageSync('userAddress', addressRes)
    } catch (e) {
      console.log(e);
    }
  },
  // 获取购物车中的所有商品
  getCartsGoods() {
    const cart = wx.getStorageSync("cart") || [];
    let allchecked = true;
    let totalCartNums = 0;
    let totalPrice = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalCartNums += v.num;
        totalPrice += v.num * v.goods_price;
      } else {
        allchecked = false
      }
    })
    allchecked = cart.length != 0 ? allchecked : false
    this.setData({
      cartList: cart,
      totalPrice,
      totalCartNums,
      allChecked: allchecked
    })
    // console.log(this.data.cartList);
    wx.getStorageSync("cart", cart)
  },
  // 点击增删按钮事件
  async addGoods(e) {
    /* 
      1. 判断点击哪个按钮
      2. 判断当前哪个商品
    */
    const { nums, goods_id } = e.currentTarget.dataset;
    const cart = wx.getStorageSync("cart") || [];
    const index = cart.findIndex(v => v.goods_id === goods_id);
    if (index !== -1 && cart[index].num <= 1 && nums == "-1") {
      // 剩一个
      const { confirm } = await showModal("确定删除该商品？");
      if (confirm) {
        // 删除该商品
        cart.splice(index, 1);
      }
    } else {
      //存在该商品 并且不止剩一个
      cart[index].num += parseInt(nums);
    }
    wx.setStorageSync("cart", cart);
    this.getCartsGoods();
  },
  // 单个check点击事件
  handleChange(e) {
    /* 
      0. 给当前数据添加checked属性
      1. 修改cartList中的当前数据的checked
      2. 修改缓存中的数据
    */
    const { id } = e.currentTarget.dataset;
    const { cartList } = this.data

    const index = cartList.findIndex(v => v.goods_id === id);
    cartList[index].checked = !cartList[index].checked;

    this.setData({
      cartList
    })
    wx.setStorageSync("cart", cartList);
    this.getCartsGoods();
  },
  // 全选按钮
  allCkeckedBtn() {
    const { cartList, allChecked } = this.data;

    cartList.map(v => { v.checked = allChecked ? false : true })

    this.setData({
      cartList,
      allChecked: !allChecked
    })
    wx.setStorageSync("cart", cartList);
    this.getCartsGoods();
  },
  // 结算按钮
  async Settlement() {
    /* 
      1. 判断是否有商品
      2. 判断是否填写地址
      3. 跳转到结算界面
    */
    const { userAddress, totalPrice } = this.data;
    if (!userAddress.userName) {
      wx.showToast({
        title: '暂未添加地址'
      })
      return;
    }
    if (totalPrice == 0) {
      wx.showToast({
        title: '暂未选择商品'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})