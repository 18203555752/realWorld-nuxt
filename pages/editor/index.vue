<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form >
            <fieldset>
              <fieldset class="form-group">
                  <input v-model="article_content.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article_content.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article_content.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article_content.tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button @click="addArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware:'noUser',
  name: 'EditorIndex',
  data(){
    return {
      article_content:{
        title:'',
        description:'',
        body:'',
        tagList:'',
      }
    }
  },
  methods:{
    async addArticle(){
      console.log(this.article_content)
      let res = addArticle({
        title: this.article_content.title,
        description: this.article_content.description,
        body: this.article_content.body,
        tagList: [ ]
      })

      console.log(res)
      if(res.data){
        this.$router.push({
          name:'article',
          params:{
            slug:res.data.article.slug
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
