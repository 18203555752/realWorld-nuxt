<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img src="https://img0.baidu.com/it/u=3115054185,3581048773&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img src="https://img1.baidu.com/it/u=962431082,3525923718&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=797" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from '@/api/article'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [], // 文章列表
      img:'https://img0.baidu.com/it/u=140205748,1361433759&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750'
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  }
}
</script>

<style>

</style>
