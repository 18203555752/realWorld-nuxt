<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form  @submit.prevent="updateUser">
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="message.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="message.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="message.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="message.email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="message.password" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>

          <button class="btn btn-outline-danger" @click="logout">
            退出登陆
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

import {updateUser} from '@/api/user'
export default {
  middleware:'noUser',
  name: 'SettingsIndex',
  data(){
    return {
      message:{
        email:'18203555753@qq.com',
        username:'王晋鹏1',
        bio:'',
        image:'https://www.baidu.com/img/flexible/logo/pc/result.png',
        password:'wjp665752',
      }
    }
  },
  methods:{
    ...mapMutations(['setUser']),
    // 退出登录
    logout(){
      Cookie.remove('user')
      this.setUser(null)

      this.$router.push("/")
    },
    // 个人信息更新
    async updateUser(){
      try{
          let { data } = await updateUser(this.message)
          console.log(data.user)
          this.setUser(data.user)
          Cookie.set('user' , JSON.stringify(data.user))
          // this.$store.commit('setUser', data.user)
          this.$router.push('profile/wjp123')
      }catch(err){
          console.dir(err)
          this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>
