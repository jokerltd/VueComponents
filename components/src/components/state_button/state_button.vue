<template src="./state_button.html"></template>



<script>
/* state_button.vue */

export default {
  name: "StateButton",
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    labels: {
      type: Array,
      default: () => ["On", "Off"],
    },
  },
  computed: {
    isActive() {
 
      return this.modelValue === this.trueValue
    },
  },
  methods: {
    toggle() {

      const newValue = this.isActive ? this.falseValue : this.trueValue
      this.$emit("update:modelValue", newValue)
    },
  },
}


</script>

<style scoped src="./state_button.css">

</style>