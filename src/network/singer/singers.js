import {request} from '@/network/request.js'


export function getSingerDetail(id=12138269)
{
  return request({url:`/artist/detail?id=${id}`})
}


export function getSingerHotSong(id=12138269)
{
  return request({url:`/artist/top/song?id=${id}`})
}

export function getSingerAlbum(id=12138269,limit=12,offset=0)
{
  return request({url:`/artist/album?id=${id}&limit=${limit}&offset=${offset*limit}`})
}


export function getSingerMV(id=12138269)
{
  return request({url:`/artist/mv?id=${id}`})
}



export function getSingerDesc(id=12138269){


  return request({url:`/artist/desc?id=${id}` })


}
