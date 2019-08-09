<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" 
              v-model="phone" name="phone" v-validate="'required|mobile'">
              <button :disabled="!isRightPhone || computeTime>0" class="get_verification" 
              :class={right_phone_number:isRightPhone} 
              @click.prevent="sendCode">{{computeTime>0? `短信已发送(${computeTime}s)` :'获取验证码'}}</button>
              <span style="color:red" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" name="code" 
              v-validate="{required: true, regex: /^\d{6}$/}" v-model="code">
              <span style="color:red">{{errors.first('code')}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="用户名" name="用户名" 
                v-validate="'required'" v-model="name">
                <span style="color:red">{{errors.first('用户名')}}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd?'text':'password'" maxlength="8" placeholder="密码" 
                name="密码" v-validate="'required'" v-model="pwd">
                <div class="switch_button" @click="isShowPwd=!isShowPwd" :class="isShowPwd?'on' : 'off'">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                </div>
                <span style="color:red">{{errors.first('密码')}}</span>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" name="验证码" 
                v-validate="{required: true, regex: /^.{4}$/}" v-model="captcha">
                <span style="color:red">{{errors.first('验证码')}}</span>
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" 
                @click="updateCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2" @click="goBack('/profile')"></i>
      </a>
  </div>
  </section>
</template>
<script type="text/ecmascript-6">
import {Toast,MessageBox} from 'mint-ui'
import { reqSendCode,reqSmsLogin,reqPwdLogin } from '../../api'
  export default {
    data () {
      return {
          loginWay:true,
          phone:'',
          code:'',
          name:'',
          pwd:'',
          captcha:'',
          computeTime:0,
          isShowPwd:false
      }
    },
    computed:{
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)
      },
    },
    methods:{
     async sendCode () {
       const {phone} =this
        this.computeTime=10
       const timerId=setInterval(()=>{
         //clearInterval(timerId)
          //当时间倒计时为0的时候自动停止定时器
          if(this.computeTime===0){
            clearInterval(timerId)
          }
          this.computeTime--
        },1000)
        const result= await reqSendCode(phone)
        if (result.code===0) {
          //alert('短信已成功发送')
          Toast('短信已发送')
        }else{
          this.computeTime=0
          //alert(result.msg)
          MessageBox(result.msg)
        }
      },
      goBack (path) {
        this.$router.push(path)
      },
     async login () {
        const {loginWay,phone,code,name,pwd,captcha}=this
        let names
        let result
        if (loginWay) {//短信登录
          names=['phone','code']
          result=await reqSmsLogin(phone,code)
          if(!phone||!code){
            this.$validator.validateAll(names)
          }else{
             MessageBox.alert(result.code===1 ? result.msg :'登录成功' )
          }
        }else{
          names=['用户名','密码','验证码']
          result=await reqPwdLogin({name,pwd,captcha})
          if (result.code===1) {
            this.updateCaptcha()
          }
          if (!name||!pwd||!captcha) {
            this.$validator.validateAll(names)
          }else{
             MessageBox.alert(result.code===1 ? result.msg :'登录成功' )
          }
        }
        if(result.code===0){
          //将user保存到state中去
          const user=result.data
          this.$store.dispatch('saveUser',user)
          //跳转到个人中心
          this.$router.replace('/profile')
        }
      },
      updateCaptcha () {
        this.$refs.captcha.src="http://localhost:4000/captcha?time="+Date.now()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
                    transition transform .3s
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>