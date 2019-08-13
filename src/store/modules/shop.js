import Vue from 'vue'
import {
	reqGoods,
	reqRatings,
	reqInfo
} from '../../api'
import {
	RECEIVE_GOODS,
	RECEIVE_RATINGS,
	RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from '../mutations-types'
const state={
	goods:[],
  ratings:[],
  info:{},
  cartFoods:[]
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
  },
  updateFoodCount ({commit},{isAdd,food}) {
    if(isAdd) {
      commit(ADD_FOOD_COUNT,food)
    }else{
      commit(REDUCE_FOOD_COUNT,food)
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
  },
  [ADD_FOOD_COUNT] (state,food) {
    if(food.count) {
      food.count++
    }else{
      Vue.set(food,'count',1)
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT] (state,food) {
    if(food.count>0){
      food.count--
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART] (state) {
    state.cartFoods.forEach(food => {
      food.count=0
    })
    //清空购物车数组
    state.cartFoods=[]
  }
}
const getters={
  //总的食物数量
  totalCount (state) {
    return state.cartFoods.reduce((pre,food)=>pre+food.count,0)
  },
  //总的食物价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre,food)=>pre+food.count*food.price,0)
  }
}
export default {
    state,
    mutations,
    actions,
    getters
}