// 获取收货地址
  /* 
    1. 获取收货地址时，需判断权限wx.getSetting() 中的authSetting 
  */
 async handleAddress() {
    /*  //1.获取 权限状态
     wx.getSetting({
       success: (result) => {
         // 2. 获取权限状态 主要发现一些 属性名和怪异的时候 都要使用[]形式来获取属性
         const scopeAddress = result.authSetting["scope.address"]
         if (scopeAddress || scopeAddress == undefined) {
           wx.chooseAddress({
             success: (res) => {
               console.log(res)
             }
           });
         } else {
           // 用户曾经点击取消按钮的时候
           // 1.得从新获取用户权限
           // 2.在授权获取收货地址api
           wx.openSetting({
             success(res) {
               wx.chooseAddress({
                 success: (res1) => {
                   console.log(res1)
                 }
               });
             }
           })
         }
       } 
     })*/
    try {
      const getSettingResult = await getSetting()
      // 2. 获取权限状态 主要发现一些 属性名和怪异的时候 都要使用[]形式来获取属性
      const scopeAddress = getSettingResult.authSetting["scope.address"]
      /*  if (scopeAddress || scopeAddress == undefined) {
         const chooseAddressResult = await chooseAddress()
         console.log(chooseAddressResult);
       } else {
         // 用户曾经点击取消按钮的时候
         // 1.得从新获取用户权限
         // 2.在授权获取收货地址api
         await openSetting()
         const chooseAddressResult = await chooseAddress()
         console.log(chooseAddressResult);
       } */
      // 用户曾经点击取消按钮的时候
      // 1.得从新获取用户权限
      // 2.在授权获取收货地址api
      if (scopeAddress == false) {
        await openSetting()
      }
      const chooseAddressResult = await chooseAddress()
      console.log(chooseAddressResult);
    } catch (error) {
      console.log(error);
    }
  },
  // 获取用户授权
  /* 
   * 1.前端调用wx.login()获取code值
   * 2.前端通过调用wx.getUserInfo获取iv、rawData、signature、encryptedData等加密数据，传递给后端
   * 3.服务器通过code请求api换回session_key和openid
   * 4.服务器通过前端给的rawData 加获取的session_key使用sha1加密，计算出signature1
   * 5.比对前端传的signature和自己算出来的signature1是否一致（防止数据不一致）
   * 6.用AES算法解密encryptedData里的敏感数据
   * 7.拿着敏感数据后做自己的逻辑
   * 8.通知前端登陆成功
  */
  async handleGotUserInfo(e) {
    // 通过wx.getUserInfo()获取{ encryptedData, iv, rawData, signature }
    const { encryptedData, iv, rawData, signature } = e.detail
    // 通过wx.login()获取code
    const { code } = await login();
    const loginParams = { encryptedData, iv, rawData, signature, code }
    // console.log(code);

    const result = await request({ url: 'https://api.zbztb.cn/api/public/v1/users/wxlogin', data: loginParams, methond: 'post' });
    console.log(result);
  }



  
<button type="primary" plain bindtap="handleAddress">收货地址</button>
<!-- 获取授权 -->
<button type="primary" plain open-type="getUserInfo" bindgetuserinfo="handleGotUserInfo">获取授权</button>