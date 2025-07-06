<template src='./paginator.html'>
</template>

<script>

export default {
  name: "Paginator",
  props: {
    totalRecords: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    perPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100]
    },
    buttonsPerPageGroup: {
      type: Number,
      default: 5
    },
    baseClass: {
      type: String,
      default: "paginator-button"
    },
    classes: {
      type: Array,
      default: () => []
    },
    mergeClasses: {
      type: Boolean,
      default: true
    },
    icons: {
      type: Object,
      default: () => ({
        first: '⏮',
        prev: '◀',
        next: '▶',
        last: '⏭'
      })
    }
  },
  data() {
    return {
      internalPage: 1,
      internalPerPage: this.perPage,
      oldVal: 1,
    }
  },
  watch: {
    currentPage(newVal) {
      this.internalPage = newVal
    },
    internalPerPage(newVal) {
      if (newVal !== this.oldVal) {
        this.internalPerPage = newVal
        this.internalPage = 1
        this.goToPage(this.internalPage)
        this.oldVal = newVal
        //this.$emit('update:current-page', 1)
        this.$emit('range-change', this.range)
      }
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalRecords / this.internalPerPage)
    },
    isFirst() {
      return this.internalPage <= 1
    },
    isLast() {
      return this.internalPage >= this.totalPages
    },
    range() {
      const start = (this.internalPage - 1) * this.internalPerPage + 1
      const end = Math.min(start + this.internalPerPage - 1, this.totalRecords)

      return {
        start_record: start,
        record_per_page: this.internalPerPage,
        end_record: end
      }
    },
    displayedPages() {
      const groupSize = this.buttonsPerPageGroup
      const currentPage = this.internalPage
      const totalPages = this.totalPages

      const pages = []

      let start = Math.max(1, currentPage - Math.floor(groupSize / 2))
      let end = Math.min(totalPages, start + groupSize - 1)

      // Adjust if near end
      if (end - start + 1 < groupSize && end < totalPages) {
        start = Math.max(1, end - groupSize + 1)
        end = Math.min(totalPages, start + groupSize - 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    }
  },
  methods: {
    getIcon(type) {
      return this.icons[type] || ''
    },
    buttonClass(type) {
      const extra = this.classes[type] || ""
      const base = this.baseClass

      if (this.mergeClasses && extra) {
        return `${base} ${extra}`
      } else if (!this.mergeClasses && extra) {
        return extra
      }

      return base
    },
    goToPage(page) {
      console.debug("*** page",page)
      if (page < 1 || page > this.totalPages || page === this.internalPage) {
        return
      }
      this.internalPage = page
      this.$emit('update:current-page', page)
      this.$emit('range-change', this.range)
    },
    prevPage() {
      if (this.isFirst) {
        return
      }
      this.internalPage--
      this.$emit('update:current-page', this.internalPage)
      this.$emit('range-change', this.range)
    },
    nextPage() {
      if (this.isLast) {
        return
      }
      this.internalPage++
      this.$emit('update:current-page', this.internalPage)
      this.$emit('range-change', this.range)
    },
  },
  model: {
    prop: 'currentPage',
    event: 'update:current-page'
  },
  emits: ['update:current-page', 'range-change']
}

</script>

<style scoped src="./paginator.css"></style>
