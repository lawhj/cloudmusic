import {request} from './request.js'

export function checkStatus(key){

  return request({url:`/login/qr/check?key=${key}&timerstamp=${Date.now()}`})

    // return request({url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`})
}

export function getStatus(){


  return request({url: `/login/status?timerstamp=${Date.now()}` })

  // return request({url: `/login/status?timerstamp=${Date.now()}`})
}

export function getKey()
{

  return request({url: `/login/qr/key?timerstamp=${Date.now()}`})

  // return request({url: `/login/qr/key?timerstamp=${Date.now()}`})
}

export function getImg(key)
{
  return request({url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`})


  // return request({url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`})
}

export function logout()
{
  return request({url: '/logout'})


  // return request({url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`})
}
