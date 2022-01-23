<template>
   <div>
       <h1>_id组件：动态路由</h1>
       <h2>{{$route.params.id}}</h2>
       
       <h2>{{id}}</h2><!-- 无效 -->
   </div>
</template>

<script>
export default {
    props:['id']
}
</script>

<style>

</style>