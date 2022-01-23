<template>
    <div class="auth-page">
        <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                <p class="text-xs-center">
                    <!-- <a href="">Have an account?</a> -->
                    <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                    <nuxt-link v-else to="/login">Have an account?</nuxt-link>
                </p>

                <ul class="error-messages">
                    <template v-for="(messages, key) of errors" >
                        <li v-for="(str, index) of messages" :key="index"> 
                            {{key}} : {{str}}
                        </li>
                    </template>
                </ul>

                <form @submit.prevent="onSubmit">
                    <fieldset v-if="!isLogin" class="form-group">
                        <input v-model="userDtat.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
                    </fieldset>
                    <fieldset class="form-group">
                        <input v-model="userDtat.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
                    </fieldset>
                    <fieldset class="form-group">
                        <input v-model="userDtat.password" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="6">
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">
                        {{ isLogin ? 'Sign in' : 'Sign up' }}
                    </button>
                </form>
            </div>

        </div>
        </div>
  </div>
</template>

<script>
import {login , register} from '@/api/user'
import { mapState, mapMutations} from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name:'loginPage',
    middleware:'hasUser',
    data () {
        return {
            userDtat: {
                username: '',
                email: '18203555753@qq.com',
                password: 'wjp665752'
            },
            errors: {} // 错误信息
        }
        
    },
    computed:{
        ...mapState(['user']),
        isLogin(){
            return this.$route.name == 'login'? true : false
        }
    },
    methods:{
        // email: '18211111111@qq.com',
        // password: '12345678'
        ...mapMutations(['setUser']),
        async onSubmit(){
            console.log(this.user)
            try{
                let { data } = this.isLogin ? await login(this.userDtat) : await register(this.userDtat)
                console.log(data.user)
                // debugger
                this.setUser(data.user)
                console.log(Cookie)
                Cookie.set('user' , JSON.stringify(data.user))
                // this.$store.commit('setUser', data.user)
                this.$router.push("/")
                console.log(this.user)
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