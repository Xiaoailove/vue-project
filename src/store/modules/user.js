import {
	reqAutoLogin,
} from '../../api'
import {
	RECEIVE_USER,
	RESET_USER,
	RECEIVE_TOKEN,
	RESET_TOKEN,
} from '../mutations-types'
const state={
	shops: [], //商家数组
  user:{},//保存当前登录对象
  token:localStorage.getItem('token'),
}
const actions={
	saveUser({commit}, user) {
		//拿到user之后将token保存到本地
		const token = user.token
		localStorage.setItem('token', token)
		//将token保存到state中
		commit(RECEIVE_TOKEN, {
			token
		})
		delete user.token
		commit(RECEIVE_USER, user)
	},
	logout({commit}) {
		commit(RESET_USER)
		commit(RESET_TOKEN)
		localStorage.removeItem('token')
	},
	async autoLogin({commit,state}) {
		if (state.token) {
			const result = await reqAutoLogin()
			if (result.code === 0) {
				const user = result.data
				commit(RECEIVE_USER, user)
			}
		}
	},
}
const mutations={
	[RECEIVE_USER] (state,user) {
		state.user=user
	},
	[RECEIVE_TOKEN] (state,{token}) {
		state.token=token
	},
	[RESET_USER] (state) {
		state.user={}
	},
	[RESET_TOKEN] (state) {
		state.token=''
	},
}
const getters={}
export default {
    state,
    mutations,
    actions,
    getters
}