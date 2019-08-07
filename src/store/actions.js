//包含n个间接更新状态数据的方法
import {reqAddress,reqCategorys,reqShops} from '../api'
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from './mutations-types'
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
	async getCategorys ({commit}) {
		//调用接口地址发送请求函数
		const result= await reqCategorys()
		//拿到数据之后调用commit通知mutation更新数据
		if(result.code===0){
			const categorys=result.data
			commit(RECEIVE_CATEGORYS,categorys)
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
}