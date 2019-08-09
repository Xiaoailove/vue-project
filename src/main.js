import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import Header from 'components/Header/Header.vue'//注册全局头部组件
import Star from 'components/Star/Star.vue'//注册全局星星组件因为星星组件在很多第三会用到，因此需要注册全局组件
//import './api'
import store from './store'
import './validate'  //全局引入之后也就是说我全局多了一个validate的指令供我使用但是我没有向外面暴露什么所以不用上面的写法

Vue.config.productionTip = false//禁止在启动vue的时候产生提示，去掉打印提示
Vue.component('Header',Header)//注册全局头部组件
Vue.component('Star',Star)
Vue.component(Button.name, Button)//注册mintui全局使用的标签组件对象
new Vue({
  //第一种方式：引入一个带编译器的文件在脚手架配置文件里面
  // components: {
  //   App
  // },
  // template: '<App/>',
  //第二种方式//使用一个渲染的函数
  render: h => h(App),
  router,
  store
}).$mount('#app')
