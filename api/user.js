import { request } from '@/plugins/request'

// 登录
export function login(user){
    return request({
        url:'/api/users/login',
        method:'POST',
        data:{
            user
        }
    })
} 
// 注册
export function register(user){
    return request({
        url:'/api/users',
        method:'POST',
        data:{
            user
        }
    })
} 
// 更新个人信息
export function updateUser(user){
    return request({
        url:'/api/user',
        method:'PUT',
        data:{
            user
        }
    })
} 