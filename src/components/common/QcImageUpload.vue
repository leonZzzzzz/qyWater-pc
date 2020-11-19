<template>
  <div style="display:flex">
    <el-image
      v-if="value"
      @click="handlePictureCardPreview"
      :style="style"
      :src="`${isPrefix ? imgHost : ''}${value}`"
      fit="cover"
    ></el-image>
    <el-image
      v-else
      :style="style"
      src="https://athena-1255600302.cosgz.myqcloud.com/attachments/null/1a6db801199f422ba1d6f55c9e3db240.png"
      fit="cover"
    ></el-image>

    <el-upload
      class="qc-image-upload"
      :action="baseUrl + '/pc/attachments/images/tencent_cloud.do'"
      :before-upload="onBeforeUpload"
      :on-success="success"
    >
      <span class="uppic">上传图片</span>
      <!-- <div class="qc-image-upload__icon">
        <i class="icon el-icon-plus"></i>
      </div>-->
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
      <img v-if="dialogVisible" width="100%" :src="`${isPrefix ? imgHost : ''}${value}`" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    isPrefix: {
      type: Boolean,
      default: true
    },
    value: String,
    // 图片上传的路径
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 图片大小
    size: {
      type: Number,
      default: 5
    },
    // 图片宽高
    width: {
      type: String,
      default: '60px'
    },
    // 图片宽高
    height: {
      type: String,
      default: '60px'
    },
    dialogImageUrl:{
      type:String,
      default:''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return { width: this.width, height: this.height }
    }
  },
  methods: {
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onBeforeUpload(file) {
      const isIMG = { 'image/jpeg': true, 'image/png': true }[file.type] || false
      const isSIZE = file.size / 1024 / 1024 < this.size
      !isIMG && this.$message.error('图片只能是 JPG/PNG 格式!')
      !isSIZE && this.$message.error(`图片大小不能超过 ${this.size}M!`)
      return isIMG && isSIZE
    },
    success(res) {
      if (res.errCode === 0) {
        this.$emit('input', res.imageUrl)
        this.$message.success('上传成功')
      } else {
        this.$message.error(res.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.update {
  width: 100px;
  height: 100px;
  border: 1px solid #eee;
  font-size: 60px;
  text-align: center;
  line-height: 100px;
  color: #ddd;
}
.qc-image-upload {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  &:hover {
    border-color: #c0c4cc;
  }
  &__icon {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    text-align: center;
    .icon {
      position: absolute;
      font-size: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #b5b5b5;
    }
  }
}
.v-model {
  position: none;
  width: 0 !important;
  height: 0 !important;
  display: none !important;
}
.qc-image-upload {
  margin-left: 15px;
  line-height: 29px;
  height: 29px !important;
  width: 80px;
  // padding: 0px 15px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
}
</style>
