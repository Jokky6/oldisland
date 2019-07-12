// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:"../image/like.png",
    noSrc:"../image/like@2.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      if(this.properties.readOnly){
        return
      }
      const like = this.properties.like
      let count = this.properties.count
      count = like?count-1:count+1
      this.setData({
        count:count,
        like:!like
      })
      // 自定义事件以及自定义事件的激活
      const behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})
