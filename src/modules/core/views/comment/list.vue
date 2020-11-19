<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :column="column"
      :menu="menu"
      :search-form="searchForm"
    ></QcTable>
  </div>
</template>

<script>
import Utils from '@/utils/utils';
export default {
  data() {
    return {
      visible: false,
      updateId: '',
      option: {
        url: '/api/v1/riversMember/volunteerPage'
      },
      proglist:[],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.baseUrl+'/api/v1/riversMember/exportVolunteer?'
        },
      ],
      searchForm: [
        { formName: 'status', value: ' ',newType:'position' },
        { label: '姓名', formName: 'memberName', type: 'input' },
        { label: '手机', formName: 'mobilePhoneNumber', type: 'input' },
        {
          label: '生效时间',
          status:'yes',
          formName: 'startDate_endDate',
          type: 'date-picker',
          el: {
            type: 'datetimerange',
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          }
        }
      ],
      column: [
        { type: "index", label: "序号", align: "center" },
        { label: '头像', prop: 'name', width: '160px',align: "center",
          formatter: row => {
            return (
              row.headImage?
              <el-image src={row.headImage} style="width:50px;height:50px"></el-image>:
              <div style="height:50px;line-height:50px">-</div>
            )
          } },
        { label: '昵称', prop: 'appellation',align: "center",
          formatter: row => {
            return (
              row.appellation?
              <div>{row.appellation}</div>:
              <div>-</div>
            )
          } },
        { label: '姓名', prop: 'name', width: '160px',align: "center" },
        { label: '手机', prop: 'mobilePhoneNumber',align: "center"},
        { label: '有效报料数', prop: 'reportQty',align: "center"},
        { label: '生效时间', prop: 'createTime',align: "center"},
        // { label: '操作',
        //   align: 'center',
        //   formatter: row => {
        //     return (
        //       <div>
        //         <el-button type="text" onClick={this.GoArticleDetail.bind(this, row.id)}>
        //           同意
        //         </el-button>
        //         <el-button type="text" onClick={this.GoArticleDetail.bind(this, row.id)}>
        //           驳回
        //         </el-button>
        //       </div>
        //     )
        //   }
        // }
      ]
    }
  },
  created() {
  },
  methods: {
    GoArticleDetail(id){
      this.$router.push({ path:'/main/punch/detail',query:{id:id}})
    },
  }
}
</script>
<style>
.el-table .cell {
  /* width:200px; */
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

