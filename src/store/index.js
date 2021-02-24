import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
    state: {
        // 用户的登录状态信息（读取出来是字符串，直接通过parse进行转换为对象）
        // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
        user: getItem(TOKEN_KEY)
            // user: null
    },
    mutations: {
        setUser(state, data) {
            state.user = data

            // 为了防止刷新丢失  我们需要把数据备份到本地存储
            setItem(TOKEN_KEY, state.user)

            // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
        }
    },
    actions: {},
    modules: {}
})