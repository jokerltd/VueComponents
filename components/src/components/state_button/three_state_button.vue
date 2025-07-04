<template src="./three_state_button.html">
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

<style scoped src='./three_state_button.css'>
</style>
