<template src="./radio_buttons.html">
</template>

<script>
  /** radio_buttons.vue **/

export default {
  name: "RadioButtons",
  components: {},
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    mergeClasses: {
      type: Boolean,
      default: true,
    },    
    baseClasses: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      selectedValue: this.modelValue
    }
  },
  watch: {
    selectedValue(newVal) {
      
      this.$emit('update:modelValue', newVal)
    },
    modelValue(newVal) {
      
      this.selectedValue = newVal
    },
  },
  computed: {
    finalName() {
     
      return this.options.map(o => o.value).join('_') + '_group'
    }
  },
  methods: {
    handleChange(e) {

      this.$emit('selection-changed', this.selectedValue)
    },
    itemClass(index) {
      const defaultClasses = ['radio-button']
      const passedClasses = this.inputClasses[index] || this.inputClasses || []

      if (!this.mergeClasses) {
        return passedClasses
      }

      // Merge classes using spread operator
      return [
        ...defaultClasses,
        ...(Array.isArray(passedClasses) ? passedClasses : [passedClasses])
      ]
    },    
  },
}
</script>

<style scoped>

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.radio-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

</style>
