import {request} from './request.js'


export function getSongLyric(id=1837528900){


  return request({url: `/lyric?id=${id}`})


}
