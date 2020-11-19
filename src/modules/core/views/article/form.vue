<template>
  <!-- :title="id ? '修改' : '添加'" -->
  <el-dialog
    :title="'添加'"
    :visible.sync="visible"
    width="540px"
    :append-to-body="true"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :model="model"
      ref="model"
      label-width="100px"
      label-position="left"
      hide-required-asterisk
    >
      <el-form-item label="选择栏目" prop="id" :rules="[{ required: true, message: '该字段不能为空'}]">
        <el-select v-model="model.id" placeholder="请选择" @change="getprogam">
          <el-option
            v-for="item in proglist"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章" prop="content" :rules="[{ required: true, message: '该字段不能为空'}]">
        <el-input type="textarea" v-model="model.content" maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="rollingImgUrl">
        <div class="img-box">
          <div class="item" v-for="(item, i) in rollingImgUrl" :key="item">
            <img :src="`${imgHost}${item}`" />
            <i class="el-icon-error" @click="onImgListDelete(i)"></i>
          </div>
          <div>
            <ImageUpload
              v-show="rollingImgUrl.length < 9"
              imageType="product"
              :isCrop="false"
              :cropw="100"
              :croph="100"
              :enlarge="5"
              :on-success="onImgListSuccess"
            ></ImageUpload>
          </div>
        </div>
        <p style="font-size: 12px;color: #888;padding: 10px 0;line-height: 3;">建议尺寸：220*220，最大不超过3M</p>
      </el-form-item>
      <!-- <el-form-item label="图片" prop="attachments" :rules="[{ required: true, message: '该字段不能为空'}]">
        <QcImageUpload
          :body="{imageType:'attachment'}"
          width="100px"
          height="100px"
          v-model="model.attachments"
        ></QcImageUpload>
        <p>建议尺寸220 * 220，大小不超过3M</p>
      </el-form-item>-->
      <!-- <el-form-item
        label="有效期"
        prop="startTimeAndEndTime"
        :rules="[{ required: true, message: '该字段不能为空'}]"
      >
        <el-date-picker
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="model.startTimeAndEndTime"
        ></el-date-picker>
      </el-form-item>-->
      <!-- <el-form-item label="排序" prop="sortNum" :rules="[{ required: true, message: '该字段不能为空'}]">
        <el-input-number v-model="model.sortNum"></el-input-number>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="success()" :loading="loading">确 定</el-button>
    </span>
    <!-- <QcProductPicker
      :visible="productPickerVisible"
      :module="module"
      @close="onQcProductPickerClose"
    />-->
  </el-dialog>
</template>

<script>
// import QcProductPicker from '@/components/common/product-picker/Index'
export default {
  // components: {
  //   QcProductPicker
  // },
  props: {
    visible: Boolean,
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      proglist:[],
      model: {
        type:'platform',
        columnId:'',
        content:'',
        sortNum: '1'
      },
      productPickerVisible: false,
      loading: false,
      rollingImgUrl:[]
    }
  },
  created() {
    this.programa()
  },
  computed: {
    module() {
      return 'Mall'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.id) {
          this.getCarousel()
        }
      }
    }
  },
  methods: {
    onChangeType(e) {
      console.log(e)
      e=='false'?this.model.skip==false:this.model.skip==true
      // this.model.skipLinks = ''
      // this.model.productIcon = ''
      // this.model.productName = ''
    },
    pageAttachmentType() {
      this.$http.pageAttachmentType().then(res => {
        this.types = res.data.data
      })
    },
    // 获取栏目
    programa() {
      this.$http.listAttachment().then(res => {
        this.proglist = res.data.data.list
      })
    },
    // 获取栏目id
    getprogam(e){
      console.log(e)
      this.proglist.forEach(item=>{
        if(item.name==e){
          this.model.columnId=item.id
        }
      })
    },
    getCarousel() {
      this.$http.getCarousel({ id: this.id }).then(res => {
        this.model = res.data.data
        // this.$set(this.model, 'startTimeAndEndTime', [this.model.startTime, this.model.endTime])
      })
    },
    onImgListSuccess(e) {
      console.log(e)
      if (this.rollingImgUrl.length < 9) {
        this.rollingImgUrl.push(e)
      }
    },
    onImgListDelete(index) {
      this.rollingImgUrl.splice(index, 1)
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.attachments=this.rollingImgUrl.toString()
          // model.startTime = model.startTimeAndEndTime[0]
          // model.endTime = model.startTimeAndEndTime[1]
          this.loading = true
          this.saveModel('addarticle', model)
        }
      })
    },
    saveModel(type, model) {
      this.$http[type](model)
        .then(() => {
          this.loading = false
          this.$message({
            message: type === 'updateCarousel' ? '修改成功' : '添加成功',
            type: 'success'
          })
          this.close(true)
        })
        .catch(() => {
          this.loading = false
        })
    },
    close(flag) {
      this.model = this.$options.data().model
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
      this.$emit('onClose', flag)
    },
    onQcProductPickerClose(row) {
      if (row) {
        this.model.skipLinks = row.id
        this.model.productName = row.name || row.title
        this.model.productIcon = row.cover || row.iconUrl
      }
      this.productPickerVisible = false
    }
  }
}
</script>
<style>
.img-box {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}
.img-box .item {
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-image: initial;
  overflow: hidden;
  margin: 0px 6px 6px 0px;
}
.img-box .item img {
  width: 100%;
}
.img-box .item .el-icon-error {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 20px;
  color: rgb(197, 197, 197);
}
</style>