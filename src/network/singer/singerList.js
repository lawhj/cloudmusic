import {request} from '@/network/request.js'

export function getArtist(type=1,area=7,initial=-1)
{
  return request({url:`/artist/list?type=${type}&area=${area}&initial=${initial}`})
}
