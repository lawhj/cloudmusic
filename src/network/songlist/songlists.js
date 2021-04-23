import {request} from '@/network/request.js'


export function getSongPlayList(order='hot',limit=50,offset=0){


  return request({url: `/top/playlist?limit=${limit}&order=${order}&offset=${offset*limit}` })


}

export function getNewAlbum(){


  return request({url:'/album/newest' })


}
