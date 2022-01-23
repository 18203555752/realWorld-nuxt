const cookieparser = process.server ? require('cookieparser') : undefined

export const state = function(){
    return {
        user:'222'
    }
}
export const mutations = {
    setUser(state, value){
        state.user = value
    }
}

export const actions = {
    nuxtServerInit( {commit}, {req} ){
        let user = null
        console.log(req.headers)
        if( req.headers.cookie ){
            const parsed = cookieparser.parse(req.headers.cookie)
            try{
                user = JSON.parse(parsed.user)
            }catch(err){
                console.log(err)
            }
        }
        console.log(user)
        commit('setUser', user)
    }
}

// export {
//     state,
//     mutation
// }