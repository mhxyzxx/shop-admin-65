/**
 * 封装的 axios 请求模块
 */

import axios from 'axios'

// axios 可以配置基础路径，这样的话就不需要每次请求的时候都写那么长的路径了
// 最简单的方式就像这样，但是不推荐
// 因为当你有多个不同的请求接口路径的时候
// axios.defaults.baseURL = 'https://api.example.com'


// 我建议的方式就是调用 create 方法创建一个 axios 实例
// axios 实例拥有和 axios 一模一样的功能
// 好处就是我们可以针对不同 url 的接口创建多个 axios 实例
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

/**
 * axios 请求拦截器
 * 所有使用 axios 发起的请求都会经过这里
 * 我们可以在这里定制一些业务逻辑，例如统一给需要授权的 API 加 token
 */
// Add a request interceptor
http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  // Do something before request is sent
  return config // 请求通过的规则，如果不 return config，则请求不会发出去
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * axios 响应拦截器
 */
http.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default http

