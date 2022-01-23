<template>
    <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{user.username}}</h4>            
            <nuxt-link class="nav-link" to="/settings">
                <button class="btn btn-sm btn-outline-secondary action-btn">
                  <i class="ion-gear-a"></i>
                  &nbsp;
                  Edit Profile Settings  
                </button>
            </nuxt-link>
            
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link" 
                  :class="{'active':tab=='my'}"
                  exact
                  :to="{
                    name:'profile',
                    query:{
                      tab:'my'
                    }
                  }"
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link" 
                  :class="{'active':tab=='Favorited'}"
                  exact
                  :to="{
                    name:'profile',
                    query:{
                      tab:'Favorited'
                    }
                  }"
                >Favorited Articles</nuxt-link>
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


        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import { getMyArticles } from '@/api/article'
export default {
  middleware:'noUser',
  name:'profilePage',
  computed:{
      ...mapState(['user']),
  },
  watchQuery:['tab'],
  async asyncData({store, query}){
    let tab_my = {
      author:store.state.user.username,
      limit:5,
      offset:0
    }
    let tab_favorite = {
      favorited:store.state.user.username,
      limit:5,
      offset:0
    }

    let tab = query.tab || 'my'
    let parmas = tab == 'my' ? tab_my : tab_favorite
    let { data } =  await getMyArticles(parmas) 
    console.log(data)
    let articles = data.articles
    return {
      tab,
      articles
    }
  },
  methods:{
    getMyArticles(){

    }
  },
  mounted(){
    
  }
}
</script>

<style>

</style>