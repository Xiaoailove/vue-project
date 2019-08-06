//包含多个发送ajax请求的函数
import ajax from './ajax'
const BASE='/api'
//1、 根据经纬度获取位置详情
export const reqAddress=(latitude,longitude)=>ajax({
    method:'GET',
    url:BASE+`position/${latitude},${longitude}`
})
//2. 获取食品分类列表
export const reqCategorys=()=>ajax.get(BASE+'index_category')
//3. 根据经纬度获取商铺列表
export const reqShops=({latitude,longitude})=>ajax({
    method:'GET',
    url:BASE+'/shops',
    params:{
        latitude,
        longitude
    }
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