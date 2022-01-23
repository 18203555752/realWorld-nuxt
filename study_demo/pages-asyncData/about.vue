<template>
  <div>
      <h1>aboutPage页面</h1>      
      <router-link to="/">首页</router-link>
  </div>
</template>

<script>
export default {
    name:'aboutPage',
    layout:'foo',
    methods:{
        onClick(){
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>