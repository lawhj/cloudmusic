import {request} from '@/network/request.js'


export function getSongPlayList(order='hot',limit=50,offset=0,cat='全部'){


  return request({url: `/top/playlist?limit=${limit}&order=${order}&offset=${offset*limit}&cat=${cat}` })


}

export function getNewAlbum(){


  return request({url:'/album/newest' })


}
