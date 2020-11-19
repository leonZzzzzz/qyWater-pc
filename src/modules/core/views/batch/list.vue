<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :menu="menu"
      :search-form="searchForm"
      @get-list="onGetList"
      @get-count="onGetCount"
      style="position: relative"
    >
      <div>
        <div v-if="boxwidth <= 1510" class="boxcontent">
          <el-tabs
            v-model="searchForm[0].value"
            @tab-click="checktabs"
            type="card"
            style="margin: 0 15px"
          >
            <el-tab-pane
              :label="`全部(${totals.total || 0})`"
              :name="' '"
            ></el-tab-pane>
            <el-tab-pane
              :label="`已上报(${totals.pendingQty || 0})`"
              name="pending"
            ></el-tab-pane>
            <el-tab-pane
              :label="`已受理(${totals.passedQty || 0})`"
              name="passed"
            ></el-tab-pane>
            <el-tab-pane
              :label="`未受理(${totals.notPassedQty || 0})`"
              name="notPassed"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div v-else class="boxcontent1">
          <el-tabs
            v-model="searchForm[0].value"
            @tab-click="checktabs"
            type="card"
            style="margin: 0 15px"
          >
            <el-tab-pane
              :label="`全部(${totals.total || 0})`"
              :name="' '"
            ></el-tab-pane>
            <el-tab-pane
              :label="`已上报(${totals.pendingQty || 0})`"
              name="pending"
            ></el-tab-pane>
            <el-tab-pane
              :label="`已受理(${totals.passedQty || 0})`"
              name="passed"
            ></el-tab-pane>
            <el-tab-pane
              :label="`未受理(${totals.notPassedQty || 0})`"
              name="notPassed"
            ></el-tab-pane>
          </el-tabs>
        </div>

        <div style="margin-top: 10px">
          <div v-if="tableData.length > 0">
            <div v-for="(item, orderIndex) in tableData">
              <div>
                <div class="uptime">
                  <div>上报时间 {{ item.createTime }}</div>
                  <div>
                    {{ item.memberName }}（{{ item.mobilePhoneNumber }}）
                  </div>
                </div>
                <div class="contentbox">
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <div class="juticontent">
                        <div class="revier" style="font-weight: bold">
                          所属河流
                        </div>
                        <span>{{ item.riverName }}</span>
                      </div>
                      <div class="juticontent">
                        <div class="revier" style="font-weight: bold">
                          详细地址
                        </div>
                        <span
                          >{{ item.address }}
                          <i
                            style="
                              font-size: 20px;
                              color: green;
                              margin-left: 10px;
                            "
                            class="el-icon-map-location"
                            @click="getlocation(item)"
                          ></i>
                        </span>
                      </div>
                      <div class="juticontent">
                        <div class="revier" style="font-weight: bold">
                          水体环境描述
                        </div>
                        <span style="line-height: 20px">{{
                          item.keyword
                        }}</span>
                      </div>
                      <div class="juticontent">
                        <div class="revier" style="font-weight: bold">
                          水体详细情况
                        </div>
                        <span style="line-height: 20px">{{ item.info }}</span>
                      </div>
                    </div>
                    <div style="margin-left: 20px">
                      <div v-if="item.imgs">
                        <el-image
                          v-for="img in item.pics"
                          style="width: 70px; height: 70px; margin-left: 10px"
                          :src="img"
                          :preview-src-list="item.pics"
                        ></el-image>
                      </div>
                    </div>
                  </div>
                  <div class="justcontent">
                    <div style="color: red; font-size: 14px; margin-top: 10px">
                      {{ item.remark }}
                    </div>
                    <div>
                      <el-button
                        :disabled="item.status == 'passed' ? true : false"
                        type="primary"
                        size="small"
                        @click="passaudit(item, true)"
                      >
                        <i
                          style="font-size: 20px; color: #fff"
                          class="el-icon-s-check"
                        ></i>
                        审核通过</el-button
                      >
                      <el-button
                        :disabled="item.status == 'notPassed' ? true : false"
                        type="danger"
                        size="small"
                        @click="passaudit(item, false)"
                      >
                        <i
                          style="font-size: 20px; color: #fff"
                          class="el-icon-s-check"
                        ></i
                        >审核不通过</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            style="
              padding: 60px;
              text-align: center;
              color: #717171;
              font-size: 14px;
            "
          >
            暂无数据
          </div>
        </div>
      </div>
    </QcTable>
    <Form
      :visible="visible"
      :id="updateId"
      :bloo="bloo"
      @onClose="onClose"
    ></Form>
    <Map :showmap="showmap" :lat="lat" :lng="lng" @closeMap="closeMap"></Map>
  </div>
</template>

<script>
import Form from './form'
import Map from './map'
export default {
  components: { Form,Map },
  name: 'TestBaiDu',
  data() {
    return {
      imageurl:'https://qingyuanshuili-1255600302.cos.ap-guangzhou.myqcloud.com',
      updateId:'',
      visible:false,
      bloo:false,
      option: {url: '/api/v1/admin/information/pages'},
      searchForm: [
        { formName: 'status', value: ' ',newType:'position' },
        { label: '姓名', formName: 'memberName', type: 'input' },
        { label: '手机', formName: 'mobilePhoneNumber', type: 'input' },
        {
          type: 'select',
          formName: 'riverId',
          label: '所属河流',
          option: [
            { value: '', label: '请选择' },
            { value: '41307cafe8284891af12c8c1fa7b32ba', label: '龙沥大排坑' },
            { value: '4bc4f2e2398f444a8d3b25ec8f9bf9e5', label: '澜水河' },
            { value: '4caf964ba6fa445cab58c132e63e48b0', label: '黄坑河' },
            { value: 'b79a123bf9f5496db2970f8c68595cd0', label: '海仔大排坑' }
          ],
          value: ''
        },
        {
          label: '上报时间',
          status:'yes',
          formName: 'startDate_endDate',
          type: 'date-picker',
          el: {
            type: 'datetimerange',
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          }
        }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.baseUrl+'/api/v1/admin/information/export?'
        },
      ],
      tableData: [],
      showmap:false,
      lat:'',
      lng:'',
      totals:{},
      params:{
        startDate:'',
        endDate:'',
        memberName:'',
        mobilePhoneNumber:'',
        riverId:'',
        status:''
      },
      boxwidth:''
    }
  },
  mounted(){
    let me = this;
    this.$nextTick(function () {
      me.width = me.$refs.table.$el.clientWidth;
      console.log(me.width)
      this.boxwidth=me.width
    
    })
  },
  created() {
    
  },
  methods: {
    passaudit(row,bloo){
      this.updateId=row.id
      this.visible=true
      this.bloo=bloo
    },
    getlocation(item){
      this.lat=item.latitude
      this.lng=item.longitude
      this.showmap = true
    },
    onGetList(list) {
      list.forEach(item=>{
        var images = item.imgs.split("_")
        item.pics=[]
        images.forEach(val=>{
          var img=this.imageurl+val
           item.pics.push(img)
        })
      })
      this.tableData = list
    },
    onGetCount(list){
      this.totals=list
    },
    checktabs(v) {
      this.searchForm[0].value = v.name
      this.$refs.table.transformSearchForm().then(() => {
        this.$refs.table.onSearch()
      })
    },
    onClose(flag) {
      this.updateId = ''
      this.visible = false
      this.bloo=false
      this.$refs.table.onSearch()
    },
    closeMap(flag) {
      this.lat=''
      this.lng=''
      this.showmap = false
    }
  }
}
</script>

<style lang="scss" scoped>
.is-active {
  background: #294a7b;
}
.boxcontent {
  position: absolute;
  width: 100%;
  background: #fff;
  top: 150px;
  z-index: 8;
}
.boxcontent1 {
  position: absolute;
  width: 100%;
  background: #fff;
  top: 110px;
  z-index: 8;
}

.remarkImg {
  display: inline-block;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  cursor: pointer;
}
.contentbox {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 5px 5px 15px 3px #eee;
  padding: 20px;
  margin: 0 20px 20px 20px;
}
.revier {
  width: 120px;
  margin-right: 20px;
}
.uptime {
  background: #ddd;
  margin: 0 20px;
  font-size: 14px;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: space-between;
}
.juticontent {
  margin-bottom: 20px;
  display: flex;
  font-size: 14px;
}
.juticontent > span {
  width: 500px;
}
.justcontent {
  padding-top: 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
// 打标签
.pro-box {
  max-height: 120px;
  overflow: auto;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background: #f2f2f2;
  .row {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-left: 10px;
    font-size: 14px;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -5px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #1bbc3d;
      transform: translate(0, -50%);
    }
    &:last-child {
      margin-bottom: 0;
    }
    .unit {
      color: #999;
      font-size: 13px;
    }
  }
}

.table {
  width: 100%;
  border: 1px solid #ebeef5;
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
  td {
    padding: 10px;
    text-align: center;
  }
  .br1 {
    border-right: 1px solid #ebeef5;
  }
  .bb1 {
    border-bottom: 1px solid #ebeef5;
  }
}
.theader {
  width: 100%;
  font-size: 14px;
  background: #ebeef5;
  color: #909399;
  td {
    padding: 15px 10px;
    text-align: center;
  }
}
.caozuo-p {
  margin-top: 5px;
  margin-bottom: 10px;
  margin-right: 20px;
}
.ch-or-div {
  margin: 20px 0px 20px 0px;
}
.ch-or-span {
  margin-right: 10px;
}
</style>
