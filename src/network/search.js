import {request} from './request.js'

export function getSearch(keywords,limit=30,type=1,offset=0)
{

 return request({url:`/cloudsearch?keywords=${keywords}&limit=${limit}&offset=${offset*limit}&type=${type}`})

}
