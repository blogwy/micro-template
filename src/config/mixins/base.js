import XLSX from 'xlsx'

export default {
  data: () => ({
    // 筛选条件 保留字段，请避免冲突
    filter: {},
    // 表格加载状态 保留字段，请避免冲突
    tableLoading: false,
    // 分页条件 保留字段，请避免冲突
    pagination: { current: 1, pageSize: 20, size: 'small', showQuickJumper: true, pageSizeOptions: ['10', '20', '30', '40'], showSizeChanger: true }
  }),
  filters: {
    NO (num, { current, pageSize }) {
      return current === 1 ? num + 1 : num + 1 + ((current - 1) * pageSize)
    }
  },
  computed: {
    userInfo() {
      return this.$root.storeModule.state.userInfo
    }
  },
  methods: {
    downloadJsonToExcel (json, name = 'export-data', header = []) {
      const wb = XLSX.utils.book_new()
      const sheet = XLSX.utils.json_to_sheet(json, { header })
      XLSX.utils.book_append_sheet(wb, sheet)
      XLSX.writeFile(wb, `${name}.xlsx`)
    },
    /**
     * 获取当前页面表格数据
     */
    getCurrentPagingData (customParams = {}, request, cb, paramCallback) {
      // 开始 loading
      this.tableLoading = true

      // 处理过滤条件
      const params = {}
      if (this.filter && typeof this.filter === 'object') {
        for (const key in this.filter) {
          if (this.filter[key]) {
            params[key] = this.filter[key]
          }
        }
      }
      // 合并参数
      const completeParmas = Object.assign(params, customParams)

      // 传递处理后的参数
      if (paramCallback) {
        paramCallback(JSON.parse(JSON.stringify(completeParmas)))
      }
      //  发起请求

      const handler = (res) => {
        cb(res)
        // 停止 loading
        this.tableLoading = false
        // 分页相关
        const { current_page, page_size, count } = res.data.data
        const pagination = { ...this.pagination }
        pagination.current = current_page
        pagination.pageSize = page_size
        pagination.total = count
        this.pagination = pagination
      }

      if (request.length === 1) {
        request(completeParmas).then(handler)
      } else {
        request(completeParmas, handler)
      }
    },
    tableClassName (record, index) {
      let className = 'light-row'
      if (index % 2 === 1) className = 'dark-row'
      return className
    }
  }
}
