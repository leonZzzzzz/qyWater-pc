import { mapGetters, mapMutations } from 'vuex'
import QcTable from "../../components/common/QcTable";
export const tableMixin = {
  components: { QcTable },
  data() {
    return {
      domHeight: 0,
      wrapHeight: 0,
    }
  },
  computed: {
    ...mapGetters([
      'tableList', 'tableId'
    ]),
  },
  methods: {
    searchKeep(type) {
      this.$refs.table.searchTableListKeep(this.searchData);
    },
    search(type) {
      this.$refs.table.searchTableList(this.searchData);
    },

    // 取消多选
    clearSelection() {
      this.$refs.table.clearSelection()
    }
  }
}
