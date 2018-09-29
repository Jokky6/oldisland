import {HTTP} from "../util/http"

export class LikeModel extends HTTP{
  like(behavior,artID,categroy){
    let url = behavior === 'like'?'like':'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: categroy
      }
    })
  }

  getClassicLikeStatus(artID,categroy,sCallback){
    this.request({
      url: 'classic'+'/' + categroy + '/' + artID + '/favor',
      success: sCallback
    })
  }
}
