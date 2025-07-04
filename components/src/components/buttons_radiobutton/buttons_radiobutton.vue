<template src="./buttons_radiobutton.html">
</template>

<script>
  /** buttons_radiobutton.vue **/

export default {
  name: "ButtonsRadiobutton",
  props: {
    baseClass: {
      type: String,
      default: ''
    },
    buttonClasses: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Array,
      required: true,
      default: () => []
    },
    mergeClasses: {
      type: Boolean,
      default: true,
    },    
  },
  data() {
    return {
      selectedIndex: null
    }
  },
  computed: {
    mergedClasses() {

      return this.buttons.map((_, index) => {

        const base = this.mergeClasses && this.baseClass ? [this.baseClass] : []
        const custom = this.buttonClasses[index] || []
  
        return [...base, ...(Array.isArray(custom) ? custom : [custom])]
      })
    }
  },
  methods: {
    selectButton(index) {

      this.selectedIndex = index
      this.$emit('update:modelValue', this.buttons[index].value)
    }
  }
}
</script>

<style scoped src="./buttons_radiobuttons.css">
</style>