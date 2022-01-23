<template>
  <div>
      <h1>index页面：八宝粥</h1>
      <nuxt-link to="/about">about</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'HomePage',
    // 当你想要动态页面内容有利于 SEO 或者是提升首屏渲染速度的时候，就在 asyncData 中发请求拿数据
    async asyncData(){
        console.log('asyncData')
        let res = await axios({
            method:'GET',
            url:'http://localhost:3000/yc/data.json'
        })
        console.log(res.data)
        return res.data
    },
    data(){
        return {
            // 如果是非异步数据或者普通数据，则正常的初始化到 data 中即可
            foo:'就想约'
        }
    },
    mounted(){
        console.log(this.$data)
    }
}
</script>

<style>

</style>