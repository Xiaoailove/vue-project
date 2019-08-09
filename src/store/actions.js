//包含n个间接更新状态数据的方法
import {reqAddress,reqCategorys,reqShops,reqAutoLogin} from '../api'
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,RECEIVE_USER,RESET_USER,RECEIVE_TOKEN,RESET_TOKEN} from './mutations-types'
export default {
	async getAddress ({commit,state}) {
		const {latitude,longitude} =state
		//调用接口地址发送请求函数
		const result= await reqAddress(latitude,longitude)
		//拿到数据之后调用commit通知mutation更新数据
		if(result.code===0){
			const address=result.data
			commit(RECEIVE_ADDRESS,address)
		}
	},
	async getCategorys ({commit},callback) {
		//调用接口地址发送请求函数
		const result= await reqCategorys()
		//拿到数据之后调用commit通知mutation更新数据
		if(result.code===0){
			const categorys=result.data
			commit(RECEIVE_CATEGORYS,categorys)
			//在commit之后执行回调函数此时数据已经回来了
			typeof callback==='function' && callback()
		}
	},
	async getShops ({commit,state}) {
		const {latitude,longitude} =state
		//调用接口地址发送请求函数
		const result= await reqShops({latitude,longitude})
		//拿到数据之后调用commit通知mutation更新数据
		if(result.code===0){
			const shops=result.data
			commit(RECEIVE_SHOPS,shops)
		}
	},
	saveUser ({commit},user) {
		//拿到user之后将token保存到本地
		const token=user.token
		localStorage.setItem('token',token)
		//将token保存到state中
		commit(RECEIVE_TOKEN,{token})
		delete user.token
		commit(RECEIVE_USER,user)
	},
	logout ({commit}) {
		commit(RESET_USER)
		commit(RESET_TOKEN)
		localStorage.removeItem('token')
	},
	async autoLogin ({commit,state}) {
		if(state.token){
			const result=await reqAutoLogin()
			if(result.code===0){
				const user=result.data
				commit(RECEIVE_USER,user)
			}
		}
	}
}