// pages/auth/index.js
import { login } from '../../utils/asyncWX'
import { request } from '../../require/index'
Page({

  /**
   * 获取token过程
   *    1. 获取用户信息 bindgetuserinfo() open-type="getUserInfo"
   *    2. 获取小程序登录成功后的code
   *    3. 发送请求 获取用户token (注意：没有企业id是获取不到用户的token)
   */
  data: {

  },
  async handleGetuserinfo(e) {
    //1.获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    //2. 获取小程序登录成功后的code
    const { code } = await login();
    const loginParams = { encryptedData, rawData, iv, signature, code }
    //3.发送请求 获取用户token
    const {token} = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    wx.setStorageSync('token',token)
    wx.navigateBack({
      delta:1
    })
  }
})