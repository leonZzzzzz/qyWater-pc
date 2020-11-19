import fetch from '@/api/config'

export default {
  // 获取微信信息设置
  getAppWechatConfig(params) {
    return fetch.get('api/admin/v1/app_wechat_config/get', params)
  },
  // 更新微信信息设置
  updateAppWechatConfig(params) {
    return fetch.post('api/admin/v1/app_wechat_config/update', params)
  },

  // pageWxApp() {
  //   return fetch.get('api/admin/v1/wxApp/page')
  // },
  // 获取日程提醒设置
  getCalendarConfig() {
    return fetch.get('api/admin/v1/config/calendar_config')
  },
  // 更新日程提醒设置
  updateCalendarConfig(params) {
    return fetch.json('api/admin/v1/config/update', params)
  },
  // 获取转发列表
  pageShare() {
    return fetch.get('api/admin/v1/wechat_share_config/page')
  },
  // 转发配置详情
  getShare(params) {
    return fetch.get('api/admin/v1/wechat_share_config/get', params)
  },
  // 修改转发配置
  updateShare(params) {
    return fetch.post('api/admin/v1/wechat_share_config/update', params)
  }
}
