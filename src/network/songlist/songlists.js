import {request} from '@/network/request.js'


export function getSongPlayList(order='hot',limit=50,offset){


  return request({url: `/top/playlist?limit=${limit}&order=${order}` })


}

export function getNewAlbum(){


  return request({url:'/album/newest' })


}
