<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <articleMeta :article='article'></articleMeta>
      </div>
    </div>
    <div class="container page">
      <!-- 内容 -->
      <div class="row article-content">
        <div v-html="article.body" class="col-md-12"> </div>
      </div>

      <hr />
      <div class="article-actions">
        <articleMeta :article='article'></articleMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <articleComments :article="article"></articleComments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import articleMeta from './components/article-meta'
import articleComments from './components/article-comments'
import MarkdownIt from 'markdown-it'
  export default {
    middleware:'noUser',
    name: 'ArticleIndex',
    components:{
      articleMeta, articleComments
    },
    async asyncData( {params} ){
      // console.log(params)
      let slug = params.slug
      let article = {}
      const { data } = await getArticle(slug)
      if(data && data.article){
        article = data.article
      }

      let md = new MarkdownIt()
      article.body = md.render(article.body)
      console.log(article)
      return {
        article
      }
    },
    head() {
      return {
        title: this.article.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.article.description}`
          }
        ]
      }
    }
  }
</script>

<style>

</style>
