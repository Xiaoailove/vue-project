import {
	reqGoods,
	reqRatings,
	reqInfo
} from '../../api'
import {
	RECEIVE_GOODS,
	RECEIVE_RATINGS,
	RECEIVE_INFO
} from '../mutations-types'
const state={
	goods:[],
  ratings:[],
  info:{}
}
const actions={
	async getGoods({commit}) {
		const result = await reqGoods()
		if (result.code === 0) {
			const goods = result.data
			console.log(result)
			commit(RECEIVE_GOODS,goods)
			// 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
			//typeof cd==='function' && cb()
		}
	},
	async	getRatings ({commit}) {
		const result=await reqRatings()
		if(result.code===0) {
			const ratings=result.data
			commit(RECEIVE_RATINGS,ratings)
			//typeof cd==='function' && cb()
		}
	},
	async getInfo ({commit}) {
		const result=await reqInfo()
		if(result.code===0) {
			const info=result.data
			commit(RECEIVE_INFO,info)
			//typeof cd==='function' && cb()
		}
	}
}
const mutations={
	[RECEIVE_GOODS] (state,goods) {
		state.goods=goods
	},
	[RECEIVE_RATINGS] (state,ratings) {
		state.ratings=ratings
	},
	[RECEIVE_INFO] (state,info) {
		state.info=info
	}
}
const getters={}
export default {
    state,
    mutations,
    actions,
    getters
}