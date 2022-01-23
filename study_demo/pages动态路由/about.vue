<template>
  <div>
      <h1>aboutPage页面</h1>
      <!-- a链接 ， 刷新页面，走服务端渲染 -->
      <h2>a链接</h2>
      <a href="/">首页</a>
      
      <!-- router-link导航链接组件 -->
      <h2>router-link</h2>
      <router-link to="/">首页</router-link>

      <!-- 编程式导航 -->
      <h2>编程式导航</h2>
      <button @click="onClick">首页</button>
  </div>
</template>

<script>
export default {
    name:'aboutPage',
    methods:{
        onClick(){
            console.log(9090)
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>