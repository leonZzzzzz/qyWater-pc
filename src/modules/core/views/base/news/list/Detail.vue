<template>
  <QcNavigationPage content="编辑图文" style="width:900px;margin:0 auto;">
    <el-form :model="model" ref="model" label-position="left" label-width="110px">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '该字段不能为空' }]">
        <el-input
          v-model.trim="model.title"
          :maxlength="32"
          placeholder="最多可输入32位"
          style="width:400px;"
          clearable
        ></el-input>
      </el-form-item>

      <!-- <el-form-item label="简介" prop="info" :rules="[{ required: true, message: '该字段不能为空' }]">
        <el-input type="textarea" :rows="4" v-model="model.info" style="width:400px;" clearable></el-input>
      </el-form-item>-->

      <!-- <el-form-item label="封面" prop="iconUrl" :rules="[{ required: true, message: '该字段不能为空' }]">
        <QcImageUpload v-model="model.iconUrl" width="100px" height="100px"></QcImageUpload>
      </el-form-item>-->
      <el-form-item label="介绍" prop="content" :rules="[{ required: true, message: '该字段不能为空' }]">
        <Editor v-model="model.content"></Editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
      </el-form-item>
    </el-form>
  </QcNavigationPage>
</template>

<script>
export default {
  data() {
    return {
      model: {
        title: '',
        categoryId: '',
        iconUrl: '',
        info: '',
        readPoint:'',
        isEnableComment: false,
        isEnableCommentAudit: false,
        content: ''
      },
      category: [],
      showPoint:true
    }
  },
  created() {
    this.pageCategory()
    // this.showReadPoint()
    if (this.$route.query.id) {
      this.getNews()
    }
  },
  methods: {
    pageCategory() {
      this.$http.listForTreeCategory(8).then(res => {
        this.category = res
      })
    },
    showReadPoint(){
      console.log(9999999999999)
      this.$http.showReadPoint().then(res=>{
      this.showPoint = res.data.data
      })
    },
    getNews() {
      this.$http.getNews({ id: this.$route.query.id }).then(res => {
        this.model = res.data.data
      })
    },
    // 提交
    onSubmit() {
      this.$refs.model.validate(valid => {
        if (valid) {
          this.saveModel(this.model, this.$route.query.id ? 'updateNews' : 'addNews')
        } else {
          this.$message.error('请将信息填写完整！')
          return false
        }
      })
    },
    saveModel(model, type) {
      this.$http[type](model).then(() => {
        this.$message.success(type === 'updateNews' ? '更新成功' : '添加成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>
