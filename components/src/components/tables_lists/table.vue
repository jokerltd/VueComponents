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
        // remove 'id' field
        const { id, ...rest } = row
           return Object.entries(rest).map(([key, value]) => ({
          value,
          class: `col-${key}`
        }))
      })
    },
    sortedRows() {
      const { column, direction } = this.sortState

      if (!column) return this.mappedRows

      return [...this.mappedRows].sort((a, b) => {
        const valA = a.find(cell => cell.class === `col-${column}`)?.value || ''
        const valB = b.find(cell => cell.class === `col-${column}`)?.value || ''

        if(direction === 'asc') {
          return valA < valB ? -1 : valA > valB ? 1 : 0
        }
        else {
          return valB < valA ? -1 : valB > valA ? 1 : 0
        }
      })
    },
  },
  methods: {
    getSortIcon(index) {
      const header = this.headers[index];
      if (!header.sortable) return null;

      const isActive = this.sortState.column === header.label;

      if (!isActive) {
        return this.sortIcons.none; // e.g. ['fas', 'arrows-alt-v']
      }

      return this.sortState.direction === 'asc' ? this.sortIcons.asc : this.sortIcons.desc;
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
      const header = this.headers[index];
      if (!header.sortable) return;

      let newDirection = 'asc';
      if (this.sortState.column === header.label) {
        if (this.sortState.direction === 'asc') newDirection = 'desc';
        else newDirection = null;
      }

      this.sortState = {
        column: header.label,
        direction: newDirection
      };
    },
  },
}
</script>

<style scoped src='./table.css'>
</style>
