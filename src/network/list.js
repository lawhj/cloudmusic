import {request} from './request.js'


export function getList(id=5451679698){


  return request({url: `/playlist/detail?id=${id}`})


}

export function getListComment(id=5451679698,limit=20,offset=0){


  return request({url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset*limit}`})


}


export function getSimilarList(id=5451679698){


  return request({url: `/simi/playlist?id=${id}`})


}
