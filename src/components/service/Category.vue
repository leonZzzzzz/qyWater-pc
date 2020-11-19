<template>
  <div>
    <QcTable
      v-if="isReady"
      ref="table"
      :option="option"
      :search-form="searchForm"
      :menu="menu"
      :column="column"
    ></QcTable>
    <CategoryFormDialog
      :id="id"
      :visible="visible"
      :type="type"
      :parent-id="parentId"
      @close="onClose"
    ></CategoryFormDialog>
  </div>
</template>

<script>
export default {
  props: {
    type: [String, Number],
    url: {
      type: String,
      default: 'api/admin/v1/category/page'
    }
  },
  data() {
    return {
      isReady: false,
      option: {
        url: this.url
      },
      searchForm: [
        { label: '名称', type: 'input', formName: 'name' },
        { formName: 'type', value: this.type }
      ],
      menu: [{ type: 'primary', label: '新建', on: () => (this.visible = true) }],
      column: [
        { label: '序号', type: 'index', align: 'center' },
        {
          label: '图标',
          prop: 'iconUrl',
          align: 'center',
          formatter: row => {
            return <el-image src={this.imgHost + row.iconUrl} fit="cover" style="width:60px;height:60px;"></el-image>
          }
        },
        { label: '名称', prop: 'name', align: 'center' },
        { label: '描述', prop: 'info', align: 'center' },
        { label: '排序号', prop: 'seqNum', align: 'center' },
        { label: '创建时间', prop: 'createTime', align: 'center' },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.visible = true
                    this.id = row.id
                  }}
                >
                  修改
                </el-button>
                <el-button type="text" onClick={this.deleteCategory.bind(this, row.id)}>
                  删除
                </el-button>
              </div>
            )
          }
        }
      ],
      visible: false,
      id: '',
      parentId: ''
    }
  },
  created() {
    if (this.type === 1) {
      this.isReady = true
      this.parentId = 0
    } else {
      this.treeCategory()
    }
  },
  methods: {
    treeCategory() {
      this.$http.treeCategory({ type: this.type }).then(res => {
        this.parentId = res.data.data[0].id
        this.searchForm.push({ formName: 'parentId', value: this.parentId })
        this.isReady = true
      })
    },
    deleteCategory(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteCategory({ id }).then(() => {
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {})
    },
    onClose(isRefresh) {
      if (isRefresh) {
        this.$refs.table.onSearch()
      }
      this.visible = false
      this.id = ''
    }
  }
}
</script>
