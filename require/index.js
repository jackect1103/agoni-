/** 
 * 当一个页面出现要发送多次异步请求的时候
 * 1.wx.showLoading()只会触发一次
 * 2.可以通过设置次数来判断决定是否触发wx.hideLoading()
*/
let ajaxTimes = 0;
const baseUrl = "https://api.zbztb.cn/api/public/v1";
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    // console.log(params);
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success(result) {
                resolve(result);
            },
            fail(error) {
                reject(error);
            },
            complete() {
                ajaxTimes--
                if (ajaxTimes == 0) {
                    wx.hideLoading()
                }
            }
        });
    })
}