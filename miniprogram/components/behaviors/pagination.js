const paginationBev = Behavior({
  data:{
    dataArray:[],
    total:null,
    noneResult:false,
    loading:false
  },
  methods:{
    setMoreData:function(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray:tempArray
      })
    },
    getCurrentStart:function(){
      return this.data.dataArray.length
    },
    setTotal:function(total){
      this.data.total = total
      if(total==0){
        this.setData({
          noneResult:true
        })
      }
    },
    hasMore:function(){
      if(this.data.dataArray.length>=this.data.total){
        return false
      }else{
        return true
      }
    },
    initialize:function(){
      this.setData({
        dataArray:[],
        noneResult:false,
        loading:false
      })
      this.data.total = null
    },
    //判断锁的状态
    isLocked() {
      return this.data.loading ? true : false
    },
    // 加锁
    locked() {
      this.setData({
        loading: true
      })
    },
    // 解锁
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})

export {paginationBev}

