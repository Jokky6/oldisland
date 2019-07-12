// miniprogram/pages/book-detail/book-detail.js
import { BookModel } from '../../models/book'
import {LikeModel} from "../../models/like"
const bookModel =new BookModel()
const likeModel =new LikeModel()
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    likeStatus:false,
    book:null,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    const id = options.id
    const comments = bookModel.getComments(id)
    const likeStatus = bookModel.getLikeStatus(id)
    const detail = bookModel.getDetail(id)

    Promise.all([comments,likeStatus,detail])
      .then(res=>{
        this.setData({
          comments:res[0].comments,
          book:res[2],
          likeStatus: res[1].like_status,
          likeCount:res[1].fav_nums
        })
        wx.hideLoading()
      })
    // comments.then(res=>{
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount:res.fav_nums
    //   })
    // })
    // detail.then(res=>{
    //   this.setData({
    //     book: res
    //   })
    // })

  },
  onLike: function(event){
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel,this.data.book.id,400)
  },

  onFakePost: function(event){
    this.setData({
      posting:!this.data.posting
    })
  },

  onPost:function(event){
    const comment = event.detail.text || event.detail.value
    // const commentInput = event.detail.value
    if(!comment){
      wx.showToast({
        title: '输入为空,评论失败',
        icon:'none'
      })
      this.setData({
        posting:false
      })
      return
    }
    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id,comment)
      .then(res=>{
        wx.showToast({
          title: '评论成功 +1',
          icon:'none'
        })

        this.data.comments.unshift({
          content:comment,
          nums:1
        })

        this.setData({
          comments:this.data.comments,
          posting:false
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