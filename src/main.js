import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

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
