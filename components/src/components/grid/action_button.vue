<!-- action-button.vue -->
<template src='./action_button.html'>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    handleInternalClick() {
      this.$emit('edit-click')
    }
  }
}
</script>

<style scoped src='./action_button.css'>
</style>
