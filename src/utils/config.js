const IS_DEV = process.env.NODE_ENV == 'development'

// 项目接口前缀
export const BASEURL = IS_DEV ? 'qingdaofu' : `https://${location.host}/${location.pathname.split('/')[1]}`
console.log(BASEURL)

// 图片前缀
export const IMGURL = 'https://qingyuanshuili-1255600302.cos.ap-guangzhou.myqcloud.com'
