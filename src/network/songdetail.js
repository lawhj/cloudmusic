import {request} from './request.js'


export function getSongURl(id=1828574198){


  return request({url: `/song/url?id=${id}`})


}

export function getSongdetail(id=1838485946){


  return request({url: `/song/detail?ids=${id}`})


}

export function getSongComment(id=1837817804,limit=20,offset=0,before){


  return request({url: `/comment/music?id=${id}&limit=${limit}&offset=${offset*limit}`})


}

export function getSimilarSong(id=1837817804){


  return request({url: `/simi/song?id=${id}`})


}
