// miniprogram/pages/index/index.js
import {ClassicModel} from '../../models/classic'
import {LikeModel} from '../../models/like'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:null,
    latest:true,
    first:false,
    likeStatus:0,
    likeCount:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      // this._getLikeStatus(res.id, res.type)
      // 数据更新
      this.setData({
        classicData:res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },
  onLike:function (event) {
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id ,              this.data.classicData.type)
  },
  onNext:function (event) {
    this._updateClassic('next')
  },

  onPrevious:function (event) {
   this._updateClassic('previous')
  },
  _updateClassic:function(nextorPrevious){
    let index = this.data.classicData.index
    // console.log(index)
    classicModel.getClassic(index,nextorPrevious, (res) => {
      // console.log(res)
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  _getLikeStatus:function(artID,categroy){
    likeModel.getClassicLikeStatus(artID,categroy,(res)=>{
      this.setData({
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})