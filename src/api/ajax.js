//能发送ajax的函数axios，函数的返回值是promise，该函数主要有以下几个功能
//post请求：将携带的json字符串参数转化为符合后台请求的URLEncoding参数形式：请求拦截器
//将返回的成功的结果数据是response.data而不是response：响应拦截器
//统一处理请求错误：响应拦截器失败的回调
import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout=20000
//添加请求拦截器
axios.interceptors.request.use(config=>{
    //首先从我们发送post请求的时候传入的配置对象中拿到method和data携带的参数数据
    const {method,data}=config
    //然后进行判断当发送方式为post且data是一个参数对象的时候
    if(method.toUpperCase()==='POST' && data instanceof Object){
        //调用qs这个库中相应的方法将json字符串转化为URLEncoding
        config.data=qs.stringify(data)
    }
    return config
})
axios.interceptors.response.use((response)=>{
    return response.data
},error=>{
    alert('请求异步:'+error.message)
    //统一进行错误的处理中断promise
    return new Promise(()=>{})
})
export default axios