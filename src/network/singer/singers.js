import {request} from '@/network/request.js'


export function getSingerDesc(id){


  return request({url: `/artist/desc?id=${id}` })


}
