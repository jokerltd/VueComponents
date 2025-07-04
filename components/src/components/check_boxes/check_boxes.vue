<template src="./check_boxes.html"></template>

<script>
/** check_boxes.vue **/
export default {
  name: "CheckBoxes",
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`,
    },
    inputClasses: {
      type: [String, Array],
      default: () => [],
    },
    labelClasses: {
      type: [String, Array],
      default: () => [],
    },
    baseClass: {
      type: [String, Array],
      default: "",
    },
    mergeClasses: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    isChecked(value) {
      return this.modelValue.includes(value)
    },

    toggleSelection(value) {
      const currentSelection = [...this.modelValue]
      const index = currentSelection.indexOf(value)

      if (index > -1) {
        currentSelection.splice(index, 1)
      } else {
        currentSelection.push(value)
      }

      this.$emit("update:modelValue", currentSelection)
    },

    itemClass(index) {
      let classes = []

      if (this.baseClass) {
        if (Array.isArray(this.baseClass)) {
          classes = classes.concat(this.baseClass)
        } else {
          classes.push(this.baseClass)
        }
      }

      if(this.mergeClasses) {

        if(Array.isArray(this.labelClasses)) {

          if(this.labelClasses[index]) {

            if(Array.isArray(this.labelClasses[index])) {

              classes = classes.concat(this.labelClasses[index])
            }
            else {

              classes.push(this.labelClasses[index])
            }
          }
        }
        else if (this.labelClasses) {

          classes.push(this.labelClasses)
        }
      }

      return classes
    },

    getIndicatorClasses() {
      let classes = ["custom-checkbox-indicator"]

      if (this.inputClasses) {
        if (Array.isArray(this.inputClasses)) {
          classes = classes.concat(this.inputClasses)
        } else {
          classes.push(this.inputClasses)
        }
      }

      return classes
    },
  },
}
</script>

<style scoped src="./check_boxes.css">
</style>
