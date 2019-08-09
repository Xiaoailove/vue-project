<template>
  <section class="msite">
    <Header :title="address.name || '正在定位中'">
      <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
			</span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category) in categorys" :key="category.id">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else><img src="./images/msite_back.svg" alt=""></div>
    </nav>
    <Shops/>
  </section>
</template>
<script type="text/ecmascript-6">
  import Swiper from 'swiper'//使用swiper首先要引入这个库让动态效果能生效
  import 'swiper/dist/css/swiper.css'//其次要引入css样式库让css样式能生效
  import Shops from 'components/Shops/Shops.vue'
  import {mapState} from 'vuex'
  //import chunck from 'lodash/chunk'//注意lodash引入的时候应该使用哪个工具函数引入哪个文件这样才能实现按需打包
  export default {
   async mounted () {
      this.$store.dispatch('getShops')
      //第二种方法利用dispatch通知action的方法注意由于需要判断数据回来了，
      //因此需要将回调函数放在commit之后，而且这是一个特殊的回调函数
      //自己定义自己执行的回调函数（自定义回调函数）
      // this.$store.dispatch('getCategorys',()=>{
      //   this.$nextTick(()=>{
      //     new Swiper('.swiper-container',{
      //       loop: true, // 循环模式选项
      //       // 如果需要分页器
      //       pagination: {
      //         el: '.swiper-pagination',
      //       },
      //     })
      //   })
      // })
      //第三种方法利用dispatch的返回值是一个promise函数，而且其是在状态更新完成之后
      //且界面完成之后才会返回一个成功的promise
     await this.$store.dispatch('getCategorys')
     new Swiper('.swiper-container',{
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
      // setTimeout(()=>{
      //   //创建swiper对象的时机必须是在列表页面显示之后
      //   new Swiper('.swiper-container',{
      //     loop: true, // 循环模式选项
      //     // 如果需要分页器
      //     pagination: {
      //       el: '.swiper-pagination',
      //     },
      //   })
      // },1000)
    },
    computed:{
      //...mapState(['address','categorys']),
      ...mapState({
        address:state=>state.msite.address,
        categorys:state=>state.msite.categorys
      }),
      categorysArr () {
        //第一种方法切割数组利用lodash库
        //return chunck(this.categorys,8)
        //第二种方法
        const bigCategorys=[]
        let smallCategorys=[]
        const {categorys} =this
        categorys.forEach(c => {
          if(smallCategorys.length===0){//将小数组添加到大数组中去而且同一个小数组只能添加一次
            bigCategorys.push(smallCategorys)
          }
          smallCategorys.push(c)
          if(smallCategorys.length===8){
            smallCategorys=[]
          }
        })
        return bigCategorys
       }
    },
    //解决swiper列表显示第一种方法
    // watch:{
    //   categorys () { //categorys发生变化也就是说明状态数据已经回来了watch属性是监视属性是有缓存的
    //     this.$nextTick(()=>{//this.$nextTick()是在数据回来之后立即调用，但是其传入的参数（回调函数）
    //                         //是在页面列表正常更新显示之后调用
    //       new Swiper('.swiper-container',{
    //         loop: true, // 循环模式选项
    //         // 如果需要分页器
    //         pagination: {
    //           el: '.swiper-pagination',
    //         },
    //       })
    //     })
    //   }
    // },
    components: {
      Shops
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    </style>
