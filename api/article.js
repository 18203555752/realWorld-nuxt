import { request } from '@/plugins/request'
import axios from 'axios'
// 获取公共文章列表
export const getArticles = (params={}) => {
    console.log(params)
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取feed文章列表
export const getYourFeedArticles = params => {
    return request({
      method: 'GET',
      url: '/api/articles/feed',
      params,
    })
}

// 获取 我的 文章列表
export const getMyArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params,
  })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
      method: 'POST',
      url: `/api/articles/${slug}/favorite`,
    })
}

// 取消点赞
export const removeFavorite = slug => {
    return request({
      method: 'DELETE',
      url: `/api/articles/${slug}/favorite`,
    })
}

export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}


// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}


// 添加文章
export const addArticle = params => {
  console.log(params)
  return request({
    method: 'POST',
    url: '/api/articles',
    data:params
  })
}
