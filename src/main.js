import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from 'components/Header/Header.vue'//注册全局头部组件
import './api'

Vue.config.productionTip = false//禁止在启动vue的时候产生提示
Vue.component('Header',Header)//注册全局头部组件
new Vue({
  //第一种方式：引入一个带编译器的文件在脚手架配置文件里面
  // components: {
  //   App
  // },
  // template: '<App/>',
  //第二种方式//使用一个渲染的函数
  render: h => h(App),
  router
}).$mount('#app')
