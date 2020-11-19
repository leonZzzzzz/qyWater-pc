import fetch from '@/api/config'

export default {
  // 获取应用版本
  getAppVersion(params) {
    return fetch.get('api/v1/appVersion/page', params)
  },
  // 注册
  register(data) {
    return fetch.post('api/v1/register', data)
  },
  // 登录
  login(params) {
    return fetch.post('login', params)
  },
  // 退出登录
  logout(params) {
    return fetch.post('logout', params)
  },
  // 系统菜单
  getMenuTree(params) {
    return fetch.get('api/admin/v1/permission/menuTree', params)
  },
  // 获取小程序码
  getWxQRCode(params) {
    return fetch.get('api/admin/v1/wxQRCode/get', params)
  },
  // 首页数据汇总
  getJourneyDataByCurrentDate() {
    return fetch.get('api/admin/v1/workbench/getJourneyDataByCurrentDate')
  },
  getMallDataByCurrentDate() {
    return fetch.get('api/admin/v1/workbench/getMallDataByCurrentDate')
  },
  getSignBillByCurrentDate() {
    return fetch.get('api/admin/v1/workbench/getSignBillByCurrentDate')
  },

  // 获取系统配置
  getConfigItem(params) {
    return fetch.get('api/admin/v1/config/listByParentId', params)
  },
  // 更新系统配置
  updateConfigItem(params) {
    return fetch.json('/api/admin/v1/config/update', params)
  },
  //  获取验证码
  getMobileCode(params) {
    return fetch.post('api/v1/register/validateCode', params)
  },
  //  微信支付
  getWeixin(data) {
    return fetch.get(`/member/jsapi_ticket`, data)
  },
  // 图片上传
  upLoadImg(params) {
    return fetch.upload('/pc/attachments/images/tencent_cloud.do', params)
  },
  // 获取域名
  getMobileUrl(params) {
    return fetch.get('api/admin/v1/app/getMobileUrl.do', params)
  },
  getIdByCode(params) {
    return fetch.get('api/admin/v1/category/getIdByCode', params)
  }
}
