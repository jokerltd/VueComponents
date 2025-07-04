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

<style scoped>
.toggle-switch {
  position: relative;
  width: 80px;
  height: 32px;
  background-color: #ccc;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-switch.active {
  background-color: #007bff;
}

.switch-handle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.toggle-switch.active .switch-handle {
  transform: translateX(48px);
}

.labels {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: white;
  padding: 0 10px;
  pointer-events: none;
}
</style>