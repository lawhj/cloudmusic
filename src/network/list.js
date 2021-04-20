import {request} from './request.js'


export function getList(id){


  return request({url: `/playlist/detail?id=${id}`})


}
