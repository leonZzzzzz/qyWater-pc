
import fetch from '@/api/config'

import core from '@/modules/core/api'
import sms from '@/modules/sms/api'
import lesson from '@/modules/lesson/api'
import salesman from '@/modules/salesman/api'

export default {
  // 获取列表 QcTable 使用
  get(url, params) {
    return fetch.get(url, params)
  },
  // 获取列表 QcTable 使用
  post(url, params) {
    return fetch.post(url, params)
  },
  json(url, params) {
    return fetch.json(url, params)
  },
  ...core,
  ...sms,
  ...lesson,
  ...salesman,
}
