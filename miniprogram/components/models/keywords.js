import {HTTP} from '../../util/http-p.js'
export class KeywordModel extends HTTP{
  key = 'q'
  maxLength=10
  getHistroy(){
    let words = wx.getStorageSync(this.key)
    if(!words){
      return[]
    }
    return words
  }

  getHot(){
    return this.request({
      url:'book/hot_keyword'
    })
  }

  addToHistroy(keyword){
    let words = this.getHistroy()
    const has = words.includes(keyword)
    if(!has){
      //数组末尾先删除，然后再添加到keyword第一位
      const length = words.length
      if(length>=this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}