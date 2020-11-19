<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" :column="column"></QcTable>
  </div>
</template>

<script>
import mixins from './mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      option: {
        url: '/api/admin/v1/singleContent/page',
        height: '400px'
      },
      searchForm: [
        { label: '图文标题', type: 'input', formName: 'title' }
        // { formName: 'isSell', value: true }
      ],
      column: [
        { type: 'index', label: '序号', align: 'center' },
        // {
        //   label: '封面',
        //   align: 'center',
        //   formatter: row => {
        //     return <el-image src={this.imgHost + row.iconUrl} style="width:50px;height:50px"></el-image>
        //   }
        // },
        { prop: 'title', label: '标题', align: 'center' },
        // { prop: 'info', label: '简介', align: 'center' },
        // {
        //   label: '是否显示',
        //   align: 'center',
        //   formatter: row => {
        //     return row.isDisplay ? '是' : '否'
        //   }
        // },
        { prop: 'createTime', label: '创建时间', align: 'center' },
        {
          label: '操作',
          align: 'center',
          fixed: 'right',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onClick={this.onSelectRow.bind(this, row)}>
                  使用
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    onSelectRow(row) {
      this.$emit('on-select-row', row)
    }
  }
}
</script>

<style lang="scss" scope>
.product-item {
  display: flex;
  align-items: flex-start;
  .cover {
    margin-right: 10px;
  }
  .name {
    height: 32px;
    line-height: 15px;
    margin-bottom: 10px;
  }
  .price {
    font-size: 14px;
    line-height: 1;
  }
}
</style>
