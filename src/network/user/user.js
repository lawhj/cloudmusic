import {request} from '@/network/request.js'

export function getUserCount()
{

  return request({url:'/user/subcount'})
}


export function getAccountSonglist(uid)
{
  return request({url:`/user/playlist?uid=${uid}`})
}
// &limit=${limit}&offset=${limit*offset}
