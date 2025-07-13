<!-- grid.vue -->
<template src='./grid.html'>
</template>

<script>

import ActionButton from '@/components/grid/action_button.vue'
import DynamicCell from '@/components/grid/dynamic_cell.vue'

export default {
  name: "Grid",
  components: {
    ActionButton,
    DynamicCell,
  },
  data() {
    return {
      debugMode: false // Turn off debug mode
    }
  },
  props: {
    rows: {
      type: Array,
      required: true
    },
    header: {
      type: Array,
      default: null
    },
    headerClass: {
      type: String,
      default: 'grid-header'
    },
    cellClass: {
      type: String,
      default: 'grid-cell'
    },
    rowClass: {
      type: String,
      default: 'grid-row'
    }
  },
  computed: {
    gridClass() {
      const count = parseInt(this.gridColumnCount, 10)
      return `grid-${count}`
    },
    gridColumnCount() {
      if (this.header?.length) return this.header.length
      if (this.rows?.length && this.rows[0]?.length) return this.rows[0].length
      return 3
    },
    gridHeader() {
      if (!this.header) return []
      return this.header.map(h => {
        if (typeof h === 'object' && h !== null) {
          return h.label || h.key || h.toString()
        }
        return h
      })
    },
    gridContainerStyle() {
      const count = parseInt(this.gridColumnCount, 10)

      if (!count || isNaN(count) || count <= 0) {
        return {}
      }

      return {
        'grid-template-columns': `repeat(${count}, 1fr)`
      }
    },
  },
  emits: ['update:rows', 'component-event'],
  methods: {
    getCellContent(cell) {
      if (cell === null || cell === undefined) return ''
      if (typeof cell === 'object' && 'props' in cell) return cell.props?.value || ''
      return String(cell)
    },
    handleCellUpdate(rowIndex, cellIndex, newValue) {
      const updatedRow = [...this.rows[rowIndex]]
      const updatedCell = {
        ...updatedRow[cellIndex],
        props: {
          ...updatedRow[cellIndex].props,
          value: newValue
        }
      }

      updatedRow[cellIndex] = updatedCell
      const updatedRows = [...this.rows]
      updatedRows[rowIndex] = updatedRow
      this.$emit('update:rows', updatedRows)
    },
    handleComponentEvent(rowIndex, cellIndex, eventName, eventValue) {
      const cell = this.rows[rowIndex][cellIndex]
      this.$emit('component-event', {
        rowIndex,
        cellIndex,
        component: cell.component,
        props: cell.props,
        event: {
          name: eventName,
          value: eventValue
        }
      })
    },
    isComponent(cell) {
      return cell && typeof cell === 'object' && 'component' in cell
    },
  },
  mounted() {
    console.log('Registered components:', this.$options.components)
    console.log('GridColumnCount:', this.gridColumnCount)
  }
}

</script>

<style scoped src='./grid.css'>

</style>
