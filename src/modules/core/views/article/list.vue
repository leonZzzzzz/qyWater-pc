<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :search-form="searchForm"
      :menu="menu"
      @get-list="onGetList"
      @get-count="onGetCount"
      style="position: relative"
    >
      <div>
        <div class="boxcontent">
          <el-tabs
            v-model="searchForm[0].value"
            @tab-click="checktabs"
            type="card"
            style="margin: 0 15px"
          >
            <el-tab-pane
              :label="`全部(${totals.total || 0})`"
              name=" "
            ></el-tab-pane>
            <el-tab-pane
              :label="`未审核(${totals.pendingQty || 0})`"
              name="1"
            ></el-tab-pane>
            <el-tab-pane
              :label="`已审核(${totals.passedQty || 0})`"
              name="2"
            ></el-tab-pane>
            <el-tab-pane
              :label="`已驳回(${totals.notPassedQty || 0})`"
              name="-1"
            ></el-tab-pane>
          </el-tabs>
        </div>

        <div style="margin-top: 70px">
          <table cellpadding="0" cellspacing="0" class="theader">
            <tbody>
              <tr>
                <td width="150">头像</td>
                <td style="width: 150px; text-align: center">昵称</td>
                <td width="160">姓名</td>
                <td width="150">手机</td>
                <td width="120">有效报料数</td>
                <td width="150">状态</td>
                <td width="200">申请时间</td>
                <td width="200">审核时间</td>
                <td>操作</td>
              </tr>
            </tbody>
          </table>
          <div v-if="tableData.length > 0">
            <div v-for="(item, orderIndex) in tableData">
              <table cellpadding="0" cellspacing="0" class="table">
                <tbody>
                  <tr>
                    <td width="150">
                      <el-image
                        v-if="item.headImage"
                        :src="item.headImage"
                        style="width: 50px; height: 50px; text-align: center"
                      ></el-image>
                      <div v-else>-</div>
                    </td>
                    <td style="width: 150px; text-align: center">
                      {{ item.appellation ? item.appellation : "-" }}
                    </td>
                    <td style="width: 160px; text-align: center">
                      {{ item.name }}
                    </td>
                    <td width="150">{{ item.mobilePhoneNumber }}</td>
                    <td width="120">{{ item.reportQty }}</td>
                    <td width="150">
                      <span v-if="item.status == 1">待审核</span>
                      <span v-if="item.status == 2">已审核</span>
                      <span v-if="item.status == -1">审核不通过</span>
                    </td>
                    <td width="200">{{ item.applicationTime }}</td>
                    <td width="200">{{ item.auditTime }}</td>
                    <td v-if="item.status == 1">
                      <el-button
                        type="text"
                        @click="GoArticleDetail(item, true)"
                        >同意</el-button
                      >
                      <el-button
                        type="text"
                        @click="GoArticleDetail(item, false)"
                        >驳回</el-button
                      >
                    </td>
                    <!-- <td v-if="item.status == 2">
                      <el-button type="text" @click="cancel(item)"
                        >取消监督员</el-button
                      >
                    </td> -->
                    <td v-if="item.status == 2">
                      <el-button type="text" @click="cancel(item)">-</el-button>
                    </td>
                    <td v-if="item.status == -1">-</td>
                  </tr>
                </tbody>
              </table>
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
    <!-- <Form :visible="visible" :id="updateId" :bloo="bloo" @onClose="onClose"></Form> -->
  </div>
</template>

<script>
// import Form from './form'
export default {
  // components: { Form },
  data() {
    return {
      updateId:'',
      visible:false,
      bloo:false,
      option: {url: '/api/v1/riversMember/pages'},
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.baseUrl+'/api/v1/riversMember/exportSupervisor'
        },
      ],
      searchForm: [
        { formName: 'status', value: ' ',newType:'position' },
        { label: '姓名', formName: 'memberName', type: 'input' },
        { label: '手机', formName: 'mobilePhoneNumber', type: 'input' },
        {
          label: '申请时间',
          status:'no',
          formName: 'effectiveMonth',
          type: 'date-picker',
          el: {
            type: 'datetimerange',
            valueFormat: 'yyyy-MM'
          }
        }
      ],
      tableData: [],
      totals:{}
    }
  },

  created() {
  },

  methods: {
    onGetList(list) {
      this.tableData = list
    },
    onGetCount(list){
      console.log(list)
      this.totals = list
    },
    checktabs(v) {
      this.searchForm[0].value = v.name
      this.$refs.table.transformSearchForm().then(() => {
        this.$refs.table.onSearch()
      })
    },
    // 审核
    GoArticleDetail(row,bloo){
      this.$confirm(bloo?'确定同意该会员的监督员申请?':'确定驳回该会员的监督员申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/riversMember/audit', { memberId:row.id,status:bloo?'2':'-1'}).then((res) => {
          if(res.data.code==20000){
            this.$message.success(bloo?"审核通过":"审核不通过");
            this.$refs.table.onSearch()
          }
        }).catch(err => {
         this.$message.warning(err.data.message)
        });
      }) 
    },
    cancel(row){
      this.$confirm('确定取消该监督员资格?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/riversMember/cancel', { memberId:row.id}).then((res) => {
          if(res.data.code==20000){
            this.$message.success("已取消该监督员资格");
            this.$refs.table.onSearch()
          }else{
            this.$message.warning('!!')
          }
        });
      }) 
    },
    onClose(flag) {
      this.updateId = ''
      this.visible = false
      this.bloo=false
      this.$refs.table.onSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.boxcontent {
  position: absolute;
  width: 100%;
  background: #fff;
  top: 115px;
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
  margin-bottom: 10px;
  display: flex;
  font-size: 14px;
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
