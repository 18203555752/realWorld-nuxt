<template>
    <div>
        <h1>{{article.title}}</h1>
        <div>{{article.body}}</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'article_idPage',
        async asyncData({ params }){
            console.log(params)
            let res = await axios({
                method:'GET',
                url:'http://localhost:3000/yc/data.json'
            })
            console.log(res.data)
            let obj = res.data.posts.find((item,index)=>{
                return item.id == params.id
            })
            return {
                article:obj
            }
        }
    }
</script>

<style>

</style>