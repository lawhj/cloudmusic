import {request} from './request.js'


export function getSongDetail(id=1828574198){


  return request({url: `/song/url?id=${id}`})


}
