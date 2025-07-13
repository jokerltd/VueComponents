<!-- dynamic.vue -->
<template src="./dynamic_cell.html">
</template>

<script>
export default {
  name: 'DynamicCell',
  props: {
    value: {
      type: [String, Number],
      required: true,
    }
  },
  emits: [
    ['update:value']
  ],
  computed: {
    displayValue() {
      return this.value || 'Empty'
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log('DynamicCell mounted with value:', this.value)
  }
}
</script>

<style scoped src='./dynamic_cell.css'>
</style>
