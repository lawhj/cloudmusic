import {request} from '@/network/request.js'

export function getFriend(pagesize=20,lasttime=-1)
{
  return request({url:`/event?pagesize=${pagesize}&lasttime=${lasttime}`})
}
