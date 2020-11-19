<template>
  <el-dialog
    :visible.sync="visible"
    width="540px"
    :append-to-body="true"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div style="text-align: center; margin: 0 0 20px 0">
      {{ this.bloo ? "确认受理该报料内容" : "拒绝受理该报料内容" }}
    </div>
    <div style="display: flex">
      <div style="width: 60px; margin-top: 10px">提示</div>
      <el-input v-model="remark"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="success()" :loading="loading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    bloo: Boolean,
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      remark:'',
      loading: false
    }
  },

  watch: {
    visible(val) {
      if (val) {
          console.log(this.id)
          this.remark=this.bloo?'报料已被受理，感谢您的报料！':'您的报料未受理成功，感谢您的支持'
      }
    }
  },
  methods: {
    success(){
      if(!this.remark){
        this.$message.warning('请输入审核提示内容')
        return
      }
       this.$http.post('/api/v1/admin/information/audit', { id:this.id,status:this.bloo?'passed':'notPassed',remark:this.remark})
        .then((res) => {
          if(res.data.code==20000){
            this.$message.success(this.bloo?"审核通过":"审核不通过");
            this.close(true)
          }else{
             this.$message.warning('!!')
          }
        });
    },
    close(flag) {
      this.model = this.$options.data().model
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
      this.$emit('onClose', flag)
    }
  }
}
</script>
