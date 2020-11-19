import fetch from './config';
import activity from './activity'
import product from './product'
import power from './power'
import level from './level'
import lesson from './lesson'
import coupon from './coupon'
import channel from './channel'
import app from './app'
import category from './category'
import attachment from './attachment'
import classes from './classes'
import chosen from './chosen'
import assistant from './assistant'
import finance from './finance'
import homework from './homework'
import survey from './survey'
import notice from './notice'
import vipBuy from './vipBuy'
import bigCourse from './bigCourse'
import shortVideo from './shortVideo'
import pandaClass from './pandaClass'
import paper from './paper'

export default {
  // 加速  accelerator
  //用户登录
  login(data) {
    return fetch.post('ajaxLogin', data);
  },
  //用户登录
  login2(data) {
    return fetch.post('login', data);
  },
  // 用户退出
  logout() {
    return fetch.post('ajaxLogout')
  },
  // 修改密码
  password(model) {
    return fetch.postJson(`/api/admin/v1/adminAccount/updatePwd`, model);
  },
  // 所有表格数据 通过此接口 统一发放
  table(url, data) {
    return fetch.get(url, data);
  },

  // 会员转助教
  transferAssistant(params) {
    return fetch.post('api/admin/v1/distributer/transfer_member', params)
  },

  getMember(params) {
    return fetch.get('api/admin/v1/member/info', params)
  },

  // 获取腾讯云配置
  getCosSetting(params) {
    return fetch.get('findCosSetting', params)
  },
  // 切换模式（普通或者CDN）
  updateCosSetting(params) {
    return fetch.post('api/admin/v1/configTemp/updateCosSetting', params)
  },
  // 获取配置
  getConfigList(params) {
    return fetch.get('api/admin/v1/configTemp/listByType', params)
  },
  // 更新配置
  updateConfig(params) {
    return fetch.post('api/admin/v1/configTemp/update', params)
  },

  // 用户行为数据收集
  matomo(params) {
    return fetch.get('matomo', params)
  },

  // // 会员转分销者
  // transferMember(params) {
  //   return fetch.post('api/admin/v1/distributer/transfer_member', params)
  // },
  // 业务员审核
  distributerAudit(params) {
    return fetch.post('api/admin/v1/distributer/audit', params)
  },
  // 获取关注设置
  getFollow(params) {
    return fetch.get('/api/admin/v1/app_wechat_config/get', params)
  },
  // 是否开启关注
  follow(params) {
    return fetch.post('api/admin/v1/app_wechat_config/update', params)
  },

  // 获取会员标签
  getTagMember(params) {
    return fetch.get('api/admin/v1/memberTag/listByMemberId', params)
  },
  // 会员添加标签
  addTagMember(params) {
    return fetch.post('api/admin/v1/memberTag/insert', params)
  },
  // 删会员标签
  deleteTagMember(params) {
    return fetch.post('api/admin/v1/memberTag/delete', params)
  },

  // 班级作业数据
  classesHomework(params) {
    return fetch.get('api/admin/v1/statistics/classesHomework', params)
  },
  // 学习时长排行
  orderByStudyTime(params) {
    return fetch.get('api/admin/v1/member/orderByStudyTime', params)
  },
  // 积分排行
  orderByTotalScore(params) {
    return fetch.get('api/admin/v1/member/orderByTotalScore', params)
  },

  // 仪表盘统计
  getDashboard(params) {
    return fetch.get('api/admin/v1/statistics/getAll', params)
  },

  weChatConfigInsert(params) {
    return fetch.postJson('api/admin/v1/category/insert', params)
  },
  weChatConfigUpdate(params) {
    return fetch.postJson('api/admin/v1/category/update', params)
  },
  indexShareSetting(params) {
    return fetch.get('api/admin/v1/categoryTemp/indexShareSetting', params)
  },

  getAllUrlTitleMapping(params) {
    return fetch.post('api/admin/v1/statistics/getAllUrlTitleMapping', params)
  },

  // 应用
  ...app,

  // 权限
  ...power,

  // 分类
  ...category,

  // 商城
  ...product,

  // 财务
  ...finance,

  // 活动
  ...activity,

  // 课程
  ...lesson,
  
  // 大课
  ...bigCourse,

  // 短视频
  ...shortVideo,

  // 熊猫课堂
  ...pandaClass,

  // 班级
  ...classes,

  // 助教
  ...assistant,

  // 作业
  ...homework,

  // 精选
  ...chosen,

  // 等级
  ...level,

  // 问卷
  ...survey,

  // 公告
  ...notice,

  // vip购买
  ...vipBuy,

  // 优惠券
  ...coupon,

  // 渠道
  ...channel,

  // 图片
  ...attachment,

  // 检测
  ...paper,
}
