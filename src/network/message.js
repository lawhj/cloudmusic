import {request} from './request.js'

export function getComment(uid,limit=30,before){

  return request({url:`/msg/comments?uid=${uid}&limit=${limit}`})
}

export function getAt(limit=30){
return request({url:`/msg/forwards?limit=${limit}`})
}

export function getNotify(limit=30){
  return request({url:`/msg/notices?limit=${limit}`})
}
