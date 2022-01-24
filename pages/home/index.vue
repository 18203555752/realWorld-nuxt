<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit(拉钩教育666)</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link 
                  class="nav-link" 
                  :class="{'active':tab=='your_feed'}"
                  exact
                  :to="{
                    name:'home',
                    query:{
                      tab:'your_feed'
                    }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link" 
                  :class="{'active':tab=='global_feed'}"
                  exact
                  :to="{
                    name:'home',
                    query:{
                      tab:'global_feed'
                    }
                  }"
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link 
                  class="nav-link" 
                  exact
                  :class="{'active':tab=='tab_feed'}"
                  :to="{
                    name:'home',
                    query:{
                      tab:'tab_feed'
                    }
                  }"
                ># {{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="item in articles" :key="item.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name:'profile',
                  params:{
                    username: item.author.username
                  }
                }"
                ><img :src="item.author.image" />
              </nuxt-link>
              <div class="info">
                <a href="" class="author">{{item.author.username}}</a>
                <span class="date">{{item.updatedAt | date('MMMM DD, YYYY')}}</span>
              </div>
              <button :disabled="item.favoriteDisabled" @click="setFavorite(item)" :class="item.favorited?'active':''" class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{item.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
                name:'article',
                params:{
                  slug:item.slug
                }
              }" 
              class="preview-link"
            >
              <h1>{{item.title}}</h1>
              <p>{{item.desscription}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item == page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab:tab
                    }
                  }"
                >{{ item }} </nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>

        <!-- 标签列表 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link 
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab:'tab_feed'
                  }
                }"
                class="tag-pill tag-default"
                v-for="(item , index) in tags"
                :key="index"
              >
                {{item}}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticles, getYourFeedArticles, removeFavorite, addFavorite} from '@/api/article'
import {getTags} from '@/api/tags'
import {mapState} from 'vuex'
export default {
  name: "homePage",
  watchQuery:['page', 'tag', 'tab'],
  async asyncData({query, store}){
    // 定义page页数 和limit
    let page = query.page || 1
    let limit = 1
    // 定义当前tab页
    let tab = query.tab || 'global_feed'
    // 定义 获取文章列表是公共的还是 feed的
    let loadArticles = tab == 'your_feed'&&store.state.user ? getYourFeedArticles : getArticles

    let [ articles, tags ] = await Promise.all([
      loadArticles({
        limit,
        offset: (page-1) * limit,
        tag: query.tag
      }),
      getTags()
    ])

    const  data = articles.data
    const  tagDatas = tags.data
    
    data.articles.forEach(article => article.favoriteDisabled = false)
    // console.log(tab)
    return {
      articles:data.articles,
      articlesCount:data.articlesCount,
      tags: tagDatas.tags,
      page,
      limit,
      tag:query.tag,
      tab
    }
  },
  computed:{
    ...mapState(['user']),
    totalPage(){
      return Math.ceil(this.articlesCount/this.limit)
    }
  },
  
  methods:{
    async setFavorite(article){
      article.favoriteDisabled = true
      console.log(article)
      if(article.favorited){
        await removeFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      }else{
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  },
  mounted(){
    
  }
};
</script>

<style>
</style>