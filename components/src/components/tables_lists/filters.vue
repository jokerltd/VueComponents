<template src='./filters.html'>
</template>

<script>
export default {
  name: "DataFilter",
  props: {
    fields: {
      type: Array,
      required: true
    },
    baseClass: {
      type: String,
      default: "filter-control"
    },
    classes: {
      type: Object,
      default: () => ({})
    },
    mergeClasses: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filters: {}
    };
  },filters: {
    handler(newFilters) {
      this.$emit('filter-change', newFilters)
    },
    deep: true
  },
  methods: {
    getFieldClass(field) {
      const extra = this.classes[field.key] || ""
      const base = this.baseClass

      if (this.mergeClasses && extra) {
        return `${base} ${extra}`;
      } else if (!this.mergeClasses && extra) {
        return extra;
      }

      return base;
    },
    updateText(event, key) {
      this.filters = {
        ...this.filters,
        [key]: event.target.value
      };

      this.$emit('filter-change', this.filters);
    },
    updateSelect(event, field) {
      this.filters = {
        ...this.filters,
        [field.key]: event.target.value
      };

      this.$emit('filter-change', this.filters);
    },
    updateCheckbox(event, key) {
      this.filters = {
        ...this.filters,
        [key]: event.target.checked
      };

      this.$emit('filter-change', this.filters);
    },
  }
};
</script>

<style scoped src='./filters.css'>
</style>
