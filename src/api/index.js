//包含多个发送ajax请求的函数
import ajax from './ajax'
const BASE='/api'
//1、 根据经纬度获取位置详情
export const reqAddress=(latitude,longitude)=>ajax({
    method:'GET',
    url:BASE+`position/${latitude},${longitude}`
})
//2. 获取食品分类列表
export const reqCategorys=()=>ajax.get(BASE+'index_category',{
  headers:{
    needToken: true
  }
})
//3. 根据经纬度获取商铺列表
export const reqShops=({latitude,longitude})=>ajax({
    method:'GET',
    url:BASE+'/shops',
    params:{
        latitude,
        longitude
    },
    headers:{
      needToken: true
    }
})
//4. 发送短信验证码
export const reqSendCode=(phone)=>ajax.get(BASE+'/sendcode',{
  params:{
    phone
  }
})
//5.手机号验证码登录
export const reqSmsLogin=(phone,code)=>ajax.post(BASE+'/login_sms',{
  phone,
  code
})
//6. 手机号短信验证码登陆
export const reqPwdLogin=({name,pwd,captcha})=>ajax.post(BASE+'/login_pwd',{
  name,
  pwd,
  captcha
})
//7. 自动登陆
export const reqAutoLogin=()=>ajax({
  url: BASE + '/auto_login',
  headers: {
    needToken: true
  }
})
//8获取某个商家信息
export const reqGoods=()=>ajax('/goods')
//9获取某个商家评价数组
export const reqRatings=()=>ajax('/ratings')
//10获取商家商品数组
export const reqInfo=()=>ajax('/info')

reqInfo().then(result => {
  console.log('result', result)
})
//测试接口
// reqAddress('40.10038','116.36867').then((result) => {
//     console.log('result', result)
//   })
  //测试接口
//   reqCategorys().then((result) => {
//     console.log('result', result)
//   })
  //测试接口
//   reqShops({latitude:'40.10038',longitude:'116.36867'}).then((result) => {
//     console.log('result', result)
//   })