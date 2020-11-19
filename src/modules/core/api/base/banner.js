import fetch from '@/api/config'

export default {
  //添加轮播图
  addCarousel(params) {
    return fetch.post('/pc/carousel/insert.do', params)
  },
  //更新图片
  updateCarousel(params) {
    return fetch.post('/pc/carousel/update.do', params)
  },
  //查询图片
  getCarousel(params) {
    return fetch.get('/pc/carousel/get.do', params)
  },
  // 图片列表
  listCarousel(params) {
    return fetch.get('api/admin/v1/carousel/page', params)
  },
  //删除图片
  deleteCarousel(params) {
    return fetch.post('/pc/carousel/delete.do', params)
  },



  //新增栏目
  addAttachment(params) {
    return fetch.post('/pc/column/insert.do', params)
  },
  //修改栏目
  updateAttachment(params) {
    return fetch.post('/pc/column/update.do', params)
  },
  //删除栏目
  deleteAttachment(params) {
    return fetch.post('/pc/column/delete.do', params)
  },
  //栏目详情
  getAttachment(params) {
    return fetch.get('/pc/column/get.do', params)
  },


  // 文章列表
  listarticle(params) {
    return fetch.get('/pc/article/page.do', params)
  },
  //新增文章
  addarticle(params) {
    return fetch.post('/pc/article/insert.do', params)
  },
  //文章详情
  getarticle(params) {
    return fetch.get('/pc/article/getDetail.do', params)
  },
  //点赞人员
  giveZan(params) {
    return fetch.get('/api/admin/v1/praise/page', params)
  },
  // 文章审核
  checkArtice(params) {
    return fetch.json('/pc/article/audit.do', params)
  },
  // 删除文章
  deleteartice(params) {
    return fetch.post('/pc/article/delete.do', params)
  },
  // 文章评论/回复列表
  commonArticle(params) {
    return fetch.get('/api/admin/v1/comment/page', params)
  },
  // 评论审核通过
  commonpass(params) {
    return fetch.post('/api/admin/v1/comment/audit', params)
  },
  // 评论审核不通过
  discommonpass(params) {
    return fetch.post('/api/admin/v1/comment/refuse', params)
  },
  // 删除评论
  deleteCommon(params) {
    return fetch.post('/api/admin/v1/comment/delete', params)
  },
  // 纯评论
  againSource(params) {
    return fetch.get('/api/admin/v1/comment/pageBySourceId', params)
  },
  // 管理员点评
  managerSource(params) {
    return fetch.post('/api/admin/v1/comment/insert', params)
  },
  // 文章置顶
  articleIsTop(params) {
    return fetch.post('/pc/article/isTop.do', params)
  },


  // 训练营
  // 打卡建议
  getSettingSuggest() {
    return fetch.get('/pc/ksConfig/getSettingSuggest.do')
  },
  // 修改打卡建议
  updataSettingSuggest(params) {
    return fetch.post('/pc/ksConfig/updateClockSuggest.do', params)
  },
  // 新增
  insertsSuggest(params) {
    return fetch.json('/pc/camp/inserts.do', params)
  },
  // 获取问卷详情
  detailSuggest(params) {
    return fetch.get('/pc/camp/getDetail.do', params)
  },
  // 修改
  updateSuggest(params) {
    return fetch.json('/pc/camp/updates.do', params)
  },
  // 删除训练营
  deleteSuggest(params) {
    return fetch.post('/pc/camp/deleteCamp.do', params)
  },
  // 问卷列表
  getSurvey() {
    return fetch.get('/api/admin/v1/survey/page')
  },
  // 添加训练营成员
  addCamp(params) {
    return fetch.post('/pc/camp/setCampUser.do', params)
  },
  // 删除训练营成员
  deleteCamp(params) {
    return fetch.post('/pc/camp/deleteCampUser.do', params)
  },
  // 查看成员问卷结果
  questResult(params) {
    return fetch.get('/api/admin/v1/ksSurvey/getMemberResult', params)
  },



  // 打卡详情
  punchDetail(params) {
    return fetch.get('/pc/clock/getDetail.do', params)
  },
  // 打卡点评
  punchComment(params) {
    return fetch.post('/pc/clock/reviews.do', params)
  },
  // 修改打卡点评
  updateComment(params) {
    return fetch.post('/pc/clock/updateReviews.do', params)
  },
  // 删除打卡点评
  deleteComment(params) {
    return fetch.post('/pc/clock/deleteReviews.do', params)
  },



  //图片链接分类
  pageAttachmentType() {
    return fetch.get('api/admin/v1/carousel/setting')
  },




  // 问卷列表
  listSurvey(params) {
    return fetch.get('api/admin/v1/survey/page', params)
  },

  // 添加问卷
  addSurvey(params) {
    return fetch.json('api/admin/v1/survey/insert', params)
  },

  //更新问卷
  updateSurvey(params) {
    return fetch.json('api/admin/v1/survey/update', params)
  },

  // 查询问卷
  Surveydetail(params) {
    return fetch.get('api/admin/v1/survey/get', params)
  },

  //删除问卷
  deleteSurvey(params) {
    return fetch.post('api/admin/v1/survey/delete', params)
  },

  // 问卷问题列表
  getSurveyQuestion(params) {
    return fetch.get('api/admin/v1/question/getList', params)
  },

  // 问卷问题列表
  updateSurveyQuestion(params) {
    return fetch.json('api/admin/v1/question/update', params)
  },

  // 问卷结果
  surveyResult(params) {
    return fetch.get('api/admin/v1/survey/getResult', params)
  },

  // 问卷结果
  surveyExport(params) {
    return fetch.get('api/admin/v1/survey/export', params)
  },
  // 报名
  surveySign(params) {
    return fetch.get('api/admin/v1/surveyMember/page', params)
  },



  // 检测的分类列表
  deteClassify(params) {
    return fetch.get('api/admin/v1/category/page', params)
  },
  // 新增检测分类
  examClass(params) {
    return fetch.json('api/admin/v1/category/insert', params)
  },
  // 检测详情
  examDetail(params) {
    return fetch.get('api/admin/v1/category/get', params)
  },
  // 修改检测
  updateExam(params) {
    return fetch.json('api/admin/v1/category/update', params)
  },
  // 删除检测
  deleteExam(params) {
    return fetch.post('api/admin/v1/category/delete', params)
  },




  // 发布问卷
  paperPublish(params) {
    return fetch.post('api/admin/v1/test-paper/publish', params)
  },
  // 新增自我检测基础设置
  insertDetection(params) {
    return fetch.post('api/admin/v1/test-paper/insert', params)
  },
  // 修改自我检测基础设置
  updateDetection(params) {
    return fetch.post('api/admin/v1/test-paper/update', params)
  },
  // 获取基础设置详情
  detectionDetail(params) {
    return fetch.get('api/admin/v1/test-paper/get', params)
  },

  // 新建题目
  subjectInsert(params) {
    return fetch.json('api/admin/v1/subject/insert', params)
  },
  // 修改题目
  subjectUpdate(params) {
    return fetch.json('api/admin/v1/subject/update', params)
  },
  // 获取题目列表
  subjectList(params) {
    return fetch.get('api/admin/v1/subject/list', params)
  },
  // 删除自我检测列表
  DeleteSubjectList(params) {
    return fetch.post('api/admin/v1/test-paper/delete', params)
  },
  // 取消发布
  cancelPublish(params) {
    return fetch.post('api/admin/v1/test-paper/cancel-publish', params)
  },

  // 获取问卷最近更新时间
  getUpdateTime(params) {
    return fetch.get('api/admin/v1/test-paper/get-update-time', params)
  },


  // 主结果设置
  result1Page(params) {
    return fetch.get('api/admin/v1/test-paper-result-1/page', params)
  },
  // 副结果列表
  result2Page(params) {
    return fetch.get('api/admin/v1/test-paper-result-2/page', params)
  },
  // 创建结果设置
  createSubject(params) {
    return fetch.json('api/admin/v1/test-paper-result-1/score/insert', params)
  },
  // 删除所有副结果
  deleteAllVice(params) {
    return fetch.post('api/admin/v1/test-paper-result/delete-all-vice', params)
  },
  // 删除结果
  deleteResult(params) {
    return fetch.post('api/admin/v1/test-paper-result/delete', params)
  },

  // 结果详情
  updateSubject(params) {
    return fetch.post('api/admin/v1/test-paper-result-1/score/update', params)
  },
  // 分值项列表
  factorList(params) {
    return fetch.get('api/admin/v1/result-factor/list', params)
  },
  // 分值型结果详情
  resultScoreGet(params) {
    return fetch.get('api/admin/v1/test-paper-result/score/get', params)
  },
  // 新增分值项
  factorInsert(params) {
    return fetch.post('api/admin/v1/result-factor/insert', params)
  },
  // 修改分值项
  factorUpdate(params) {
    return fetch.post('api/admin/v1/result-factor/update', params)
  },
  // 删除分值项
  factorDelete(params) {
    return fetch.post('api/admin/v1/result-factor/delete', params)
  },
  // 新建分值型主结果
  result1ScoreInsert(params) {
    return fetch.json('api/admin/v1/test-paper-result-1/score/insert', params)
  },
  // 修改分值型主结果
  result1ScoreUpdate(params) {
    return fetch.json('api/admin/v1/test-paper-result-1/score/update', params)
  },
  // 新建组合型主结果
  result1ComboInsert(params) {
    return fetch.json('api/admin/v1/test-paper-result-1/combo/insert', params)
  },
  // 修改组合型主结果
  result1ComboUpdate(params) {
    return fetch.json('api/admin/v1/test-paper-result-1/combo/update', params)
  },

  // 新建分值型副结果
  result2ScoreInsert(params) {
    return fetch.json('api/admin/v1/test-paper-result-2/score/insert', params)
  },
  // 修改分值型副结果
  result2ScoreUpdate(params) {
    return fetch.json('api/admin/v1/test-paper-result-2/score/update', params)
  },
  // 新建组合型副结果
  result2ComboInsert(params) {
    return fetch.json('api/admin/v1/test-paper-result-2/combo/insert', params)
  },
  // 修改组合型副结果
  result2ComboUpdate(params) {
    return fetch.json('api/admin/v1/test-paper-result-2/combo/update', params)
  },
  // 组合型结果详情
  resultComboGet(params) {
    return fetch.get('api/admin/v1/test-paper-result/combo/get', params)
  },



  // 点评问卷结果
  addCommont(params) {
    return fetch.post('api/admin/v1/ksSurvey/addReviews', params)
  },
  // 修改点评问卷结果
  upDateCommont(params) {
    return fetch.post('api/admin/v1/ksSurvey/updateReviews', params)
  },
  // 获取点评问卷结果
  getCommont(params) {
    return fetch.get('api/admin/v1/ksSurvey/getReviews', params)
  },
  // 删除点评问卷结果
  deleteCommont(params) {
    return fetch.post('api/admin/v1/ksSurvey/deleteReviews', params)
  },



  // 答卷列表
  answePage(params) {
    return fetch.get('api/admin/v1.1/test-paper-answer/page', params)
  },
  // 答卷详情
  answeGet(params) {
    return fetch.get('api/admin/v1/test-paper-answer/get', params)
  },
  // 测评结果
  getTestAnswer(params) {
    return fetch.get('/api/v1/ks-test-paper-analysis/get', params)
  },



  // 小程序列表
  MiniProgramList() {
    return fetch.get('/pc/skipProgram/page.do')
  },
  // 新增跳转小程序
  addMiniProgram(params) {
    return fetch.post('/pc/skipProgram/insert.do', params)
  },
  // 修改跳转小程序
  updateMiniProgram(params) {
    return fetch.post('/pc/skipProgram/update.do', params)
  },
  // 删除跳转小程序
  deleteMiniProgram(params) {
    return fetch.post('/pc/skipProgram/delete.do', params)
  },
  // 删除跳转小程序
  deleteMiniProgram(params) {
    return fetch.post('/pc/skipProgram/delete.do', params)
  },


  // 获取统计数据
  getStatistics(params) {
    return fetch.get('/pc/reportDayNewNum/getByDate.do', params)
  },




}
