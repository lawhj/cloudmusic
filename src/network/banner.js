import {request} from './request.js'


export function getBannerList(){


  return request({url: '/banner'})


}
