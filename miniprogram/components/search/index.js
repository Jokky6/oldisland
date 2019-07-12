// components/search/index.js
import {KeywordModel} from '../models/keywords'
import {BookModel} from '../../models/book'
import {paginationBev} from '../behaviors/pagination'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    histroywords:[],
    hotwords:[],
    searching:false,
    word:'',
    //锁
    loadingCenter:false
  },
  attached:function(){
    const histroywords = keywordModel.getHistroy()

    this.setData({
      histroywords
    })

    keywordModel.getHot()
      .then(res => {
        this.setData({
          hotwords: res.hot
        })
      })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore:function(){
      if(!this.data.word){
        return
      }

      if(this.isLocked()){
        return
      }
      // const length = this.data.dataArray.length
      if(this.hasMore()){
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.word)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          },()=>{
            this.unLocked()
            // 避免死锁
          })
      }
    },
    onCancel:function(event){
      this.initialize()
      this.triggerEvent('searching',{},{})
    },
    onDelete:function(event){
      this.initialize()
      this._closeResult()
      this.setData({
        word:''
      })
    },
    onConfirm:function(event){
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      const word = event.detail.value || event.detail.text
      bookModel.search(0,word)
       .then(res=>{
         this.setMoreData(res.books)
         this.setTotal(res.total)
         this.setData({
           word
         })
         keywordModel.addToHistroy(word)
         this._closeLoadingCenter()
       })
    },
    _showResult(){
      this.setData({
        searching:true
      })
    },
    _closeResult(){
      this.setData({
        searching: false
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _closeLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    }
  }
})
