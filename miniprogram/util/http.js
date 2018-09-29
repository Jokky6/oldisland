import {config} from '../config'
const tips = {
  1: '抱歉出现一个错误',
  1005: '您的开发者key不正确，请填写正确都开发者key',
  1007:'未知错误',
  3000: '该内容不存在'
}
class HTTP {
  request(params){
    // url,data,method,
    var url = this.baseRestUrl + params.url;
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type':'application/json',
        'appkey': config.appkey
      },
      success: (res)=>{
        // code不是一个字符串
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          params.success && params.success(res.data)
        }else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err)=>{
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}