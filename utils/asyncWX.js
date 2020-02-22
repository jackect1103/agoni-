/* 
    封装wx原生的api
*/
//wx.getSetting() 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res);
            }, fail: (err) => {
                reject(err);
            }
        })
    })
}

//wx.openSetting() 调起客户端小程序'设置界面'，返回用户设置的操作结果。
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (res) => {
                resolve(res);
            }, fail: (err) => {
                reject(err);
            }
        })
    })
}

//wx.chooseAddress() 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (res) => {
                resolve(res);
            }, fail: (err) => {
                reject(err);
            }
        })
    })
}

//wx.login() 调用接口获取登录凭证（code）。
//通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (res) => {
                resolve(res);
            }, fail: (err) => {
                reject(err);
            }
        })
    })
}


//通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
export const showModal = (content) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

//显示消息提示框
export const showToast = (title) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title,
            icon: "none",
            mask: true,
            success: (res) => {
                resolve(res);
            }, fail: (err) => {
                reject(err);
            }
        })
    })
}

