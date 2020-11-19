
let zanoc = {
  title: "正安习课管理平台",
  baseHost: 'http://m.zuozhongtang.cn/',

  projectName: function () {
    let pathname = window.location.pathname.split('/')[1];
    // let name = process.env.NODE_ENV === "production" ? pathname : "zanoc"
    // let name = process.env.NODE_ENV === "production" ? pathname : "test"
    // let name = process.env.NODE_ENV === "production" ? pathname : "ydlxq"
    // let name = process.env.NODE_ENV === "production" ? pathname : "99xly"
    // let name = process.env.NODE_ENV === "production" ? pathname : "college"
    let name = process.env.NODE_ENV === "production" ? pathname : "detection"
    return name
  },

  getTitle() {
    let projectName = this.projectName()
    if (projectName === 'detection')  return '答摩检测管理平台'
    else if (projectName == 'college') return '正安学堂管理平台'
    else if (projectName == 'ydlxq') return '油多拉星球管理平台'
    else if (projectName == '99xly') return '经络健身营管理平台'
    else return '正安习课管理平台'
  },
}

export default zanoc
