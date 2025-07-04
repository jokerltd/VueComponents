<template src="./3state_button.html">

</template>

<script>
export default {
  name: "ThreeStateButton",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true,
    },
    options: {
      type: Array,
      default: () => ["no", "maybe", "yes"],
    },
    labels: {
      type: Array,
      default: () => ["No", "Maybe", "Yes"],
    },
    baseClass: {
      type: String,
      default: "default-thumb",
    },
    classes: {
      type: Array,
      default: () => [],
    },
    mergeClasses: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    currentIndex() {
      const index = this.options.indexOf(this.modelValue)
      console.log('Computing currentIndex:', {
        modelValue: this.modelValue,
        options: this.options,
        index: index
      })
      return index >= 0 ? index : 0
    },
    thumbTransform() {

      if(this.currentIndex === 0) {

        return "translateX(0px)"
      }
      if(this.currentIndex === 1) {

        return "translateX(95%)"
      }
      if(this.currentIndex === 2) {

        return "translateX(195%)"
      }
      return "translateX(0px)"
   },
    currentClassObject() {
      const base = this.baseClass
      const extra = this.classes[this.currentIndex]
      const dynamicClass = `state-${this.currentIndex}`

      if(this.mergeClasses && extra) {

        return `${base} ${extra} ${dynamicClass}`
      }
      else if(!this.mergeClasses && extra) {

        return `${extra} ${dynamicClass}`
      }

      return `${base} ${dynamicClass}`
    },
  },
  methods: {
    nextState() {

      console.log('=== nextState called ===')
      console.log('Current modelValue:', this.modelValue)
      console.log('Current index:', this.currentIndex)

      const newIndex = (this.currentIndex + 1) % this.options.length
      const newValue = this.options[newIndex]

      console.log('New index:', newIndex)
      console.log('New value:', newValue)
      console.log('About to emit update:modelValue with:', newValue)

      this.$emit("update:modelValue", newValue)
      //this.$emit("update:selected3State", newValue)
    },
    setState(index) {

      const newValue = this.options[index]
      console.log('setState called with index:', index, 'value:', newValue)
      this.$emit("update:modelValue", newValue)
    }
  },
  mounted() {

    console.log('Component mounted with modelValue:', this.modelValue)
    console.log('Options:', this.options)
  }
}
</script>

<style scoped>
.debug-info {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  font-family: monospace;
}

.debug-info p {
  margin: 5px 0;
  font-size: 12px;
}

.tri-state-button {
  width: 180px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 20px;
}

.toggle-track {
  position: relative;
  height: 40px;
  background-color: #ddd;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
}

.label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

.label.left {
  left: 10px;
  color: red;
}

.label.center {
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: goldenrod;
}

.label.right {
  right: 15px;
  color: green;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 60px;
  height: 36px;
  background-color: white;
  border: 2px solid #aaa;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.default-thumb {
  background-color: white;
  border-color: #aaa;
}

.toggle-thumb.state-0 ~ .label.left {
  color: #007bff;
  width: 4.0rem;
}

.toggle-thumb.state-1 ~ .label.center {
  color: #ffc107;
}

.toggle-thumb.state-2 ~ .label.right {
  color: #dc3545;
}

.test-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.test-buttons button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.test-buttons button:hover {
  background: #f0f0f0;
}
</style>
