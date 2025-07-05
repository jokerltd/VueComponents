<template src='./list.html'>
</template>

<script>
export default {
  name: "DynamicList",
  props: {
    baseClass: {
      type: String,
      default: "default-thumb"
    },
    classes: {
      type: Array,
      default: () => []
    },
    listClass: {// single class for all items
      type: String,
      default: ''
    },
    mergeClasses: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String,
      default: '--'
    },
    sortable: {
      type: Boolean,
      default: false
    },
    sortDirection: {
      type: String,
      default: 'asc', // 'asc' or 'desc'
      validator: value => ['asc', 'desc'].includes(value)
    },
    sortIcons: {
      type: Object,
      default: () => ({
        asc: '↑',
        desc: '↓',
        none: '⇅'
      })
    },
    sortKey: {
      type: String,
      default: null
    },
    tablerows: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      internalSortDirection: this.sortDirection
    }
  },
  computed: {
    mappedRows() {
      if (!Array.isArray(this.tablerows)) return []

      return this.tablerows.map(row => {
        const { id, ...rest } = row

        return {
          data: row,
          displayFields: Object.entries(rest).map(([key, value]) => ({
            key,
            value,
            class: `col-${key}`
          }))
        }
      })
    },
    sortedRows() {
      const key = this.sortKey
      if (!this.sortable || !key) return this.tablerows

      return [...this.tablerows].sort((a, b) => {
        const valA = a[key]
        const valB = b[key]

        let comparison = 0

        // Try numeric compare
        const numA = parseFloat(valA)
        const numB = parseFloat(valB)

        if (!isNaN(numA) && !isNaN(numB)) {
          comparison = numA - numB
        } else {
          comparison = String(valA).localeCompare(String(valB), undefined, { numeric: true })
        }

        return this.internalSortDirection === 'asc' ? comparison : -comparison
      })
    }
  },
  methods: {
    formatRow(row) {
        const values = Object.values(row).filter(v => typeof v !== 'number')
        return values.join(` ${this.separator} `)
      },
    getSortIcon() {
      const dir = this.internalSortDirection
      if (dir === 'asc') return this.sortIcons.asc
      if (dir === 'desc') return this.sortIcons.desc
      return this.sortIcons.none
    },
    rowClass(index) {
      const base = this.baseClass
        const listClass = this.listClass
        const extra = this.classes[index] || ""
        const dynamicClass = `state-${index}`

        if (this.mergeClasses && extra) {
          return `${base} ${listClass} ${extra} ${dynamicClass}`
        } else if (!this.mergeClasses && extra) {
          return `${extra} ${dynamicClass}`
        }

        return `${base} ${listClass} ${dynamicClass}`
    },
    toggleSort() {
      if (!this.sortKey) return

       const directions = ['asc', 'desc', null]
       const currentIndex = directions.indexOf(this.internalSortDirection)
       const nextIndex = (currentIndex + 1) % directions.length

       this.internalSortDirection = directions[nextIndex]
    },
  }
}
</script>

<style scoped src='./list.css'>
</style>
