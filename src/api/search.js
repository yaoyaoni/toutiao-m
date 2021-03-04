// 用户请求相关模块
import request from '@/utils/request'

// 获取所有频道列表
export const getSearchSuggestion = q => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}

// 获取所有频道列表
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
}