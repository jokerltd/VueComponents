<template src='./table.html'>
</template>

<script>

export default {
  name: "DynamicTable",
  props: {
    baseClass: {
      type: String,
      default: "default-thumb"
    },
    classes: {
      type: Array,
      default: () => []
    },
    columnWidths: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      required: true
    },
    mergeClasses: {
      type: Boolean,
      default: true
    },
    headers_class: {
      type: String,
      default: ""
    },
    sortableColumns: {
      type: Array,
      default: () => []
    },
    sortIcons: {
      type: Object,
      default: () => ({
        asc: '↑',
        desc: '↓',
        none: '⇅'
      })
    },
    tablerows: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      sortState: {
        columnIndex: null,
        direction: null // 'asc' | 'desc'
      }
    }
  },
  mounted() {
    this.sortState = {
      columnIndex: null,
      direction: null
    }
  },
  computed: {
    mappedRows() {
      return this.tablerows.map(row => {
        const { id, ...rest } = row
        return Object.entries(rest).map(([key, value]) => ({
          key,
          value,
          class: `col-${key}`
        }))
      })
    },
    sortedRows() {
      const { columnIndex, direction } = this.sortState
      if (columnIndex === null || direction === null) return this.mappedRows

      return [...this.mappedRows].sort((a, b) => {
        const valA = a[columnIndex]?.value || ''
        const valB = b[columnIndex]?.value || ''
        const numA = parseInt(valA.match(/(\d+)/)?.[1] || 0)
        const numB = parseInt(valB.match(/(\d+)/)?.[1] || 0)

        let comparison = 0

        if (numA && numB) {
          comparison = numA - numB
        }
        else {
          comparison = valA.localeCompare(valB)
        }

        return direction === 'asc' ? comparison : -comparison
      })
    },
  },
  methods: {
    getSortIcon(index) {
      const header = this.headers[index]
      if (!header.sortable) return null

      const isActive = this.sortState.columnIndex === index
      if (!isActive) {
        return this.sortIcons.none
      }

      return this.sortState.direction === 'asc' ? this.sortIcons.asc : this.sortIcons.desc
    },
    isFontAwesomeIcon(icon) {
      return typeof icon === 'string' && icon.includes('fa-')
    },
    isTextIcon(icon) {
      return typeof icon === 'string' && !this.isFontAwesomeIcon(icon)
    },
    rowClass(index) {
      const base = this.baseClass
      const extra = this.classes[index] || ""
      const dynamicClass = `state-${index}`

      if (this.mergeClasses && extra) {
        return `${base} ${extra} ${dynamicClass}`
      } else if (!this.mergeClasses && extra) {
        return `${extra} ${dynamicClass}`
      }
      return `${base} ${dynamicClass}`
    },
    toggleSort(index) {
      const header = this.headers[index]
      if (!header.sortable) {
        return
      }

      let newDirection = 'asc'
      if (this.sortState.columnIndex === index) {
        if (this.sortState.direction === 'asc') {
          newDirection = 'desc'
        } else {
          newDirection = 'asc'
        }
      }

      this.sortState = {
        columnIndex: index,
        direction: newDirection
      }
    },
  },
}
</script>

<style scoped src='./table.css'>
</style>
