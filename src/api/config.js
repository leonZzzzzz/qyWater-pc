import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import { BASEURL } from '@/utils/config'

axios.defaults.timeout = 600000 //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //配置请求头
axios.defaults.baseURL = BASEURL

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use((res) => {

  if (/^2[0-9]{2}/g.test(res.status) && (res.data.errCode === 0 || res.data.code == 20000 || res.data.code == 50104)) {
    return Promise.resolve(res);
  } else if (res.data.code == 50103) {
    // 未登录或登录已过期
    store.commit('updateSession', true)
    return Promise.reject(res)
  } else if (/^4[0-9]{2}/g.test(res.status)) {
    Message.error({ message: '请求路径错误' });
  } else if (/^5[0-9]{2}/g.test(res.status)) {
    Message.error({ message: '服务器错误' });
  } else {
    Message.error({ message: res.data.errMsg });
  }
  return Promise.reject(res);
}, error => {
  Message.error('请求错误')
  Promise.reject(error)
})

export default {
  get(url, params) {
    return axios.get(url, { params })
  },
  post(url, params) {
    return axios.post(url, qs.stringify(params))
  },
  json(url, params) {
    return axios.post(url, params)
  },
  upload(url, params) {
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }
}
