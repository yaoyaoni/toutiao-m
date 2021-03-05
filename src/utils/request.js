// 请求模块

import axios from "axios";
import store from '@/store'
import JSONBig from 'json-bigint'


const request = axios.create({
    // baseURL: "http://ttapi.research.itcast.cn/" // 接口的基本路径
    baseURL: "http://toutiao-app.itheima.net", // 接口的基本路径

    // 自定义后端返回的原始数据
    // data:后端返回的原始数据，说白了就是JSON 格式的字符串
    transformResponse: [function(data) {
        try {
            return JSONBig.parse(data)
        } catch (err) {
            return data
        }
        // axios 默认会在内部这样来处理后端返回的数据
        // return JSON.parse(data)
    }]
});

// 请求拦截器

// Add a request interceptor
request.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        // config ：本次请求的配置对象
        // config 里面有一个属性：headers
        const { user } = store.state;
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        if (config.url.startsWith('/app')) {
            config.url = config.url.slice(4)
        }

        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// 响应拦截器

export default request;