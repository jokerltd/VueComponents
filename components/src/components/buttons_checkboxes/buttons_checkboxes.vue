<template src="./buttons_checkboxes.html"></template>

<script>
/* buttons_checkboxes.vue */
export default {
  name: "ButtonsCheckbox",
  props: {
    buttons: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    baseClasses: {
      type: String,
      default: "checkbox-button",
    },
    buttonClasses: {
      type: [String, Array],
      default: () => [],
    },
    mergeClasses: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedIndices: this.modelValue
        .map((value) =>
          this.buttons.findIndex((button) => button.value === value)
        )
        .filter((index) => index !== -1),
    }
  },
  computed: {
    mergedClasses() {
      return this.buttons.map((_, index) => {
        const base = this.mergeClasses ? this.baseClasses.split(" ") : []
        let custom = []

        if (Array.isArray(this.buttonClasses)) {
          custom = this.buttonClasses[index]
            ? Array.isArray(this.buttonClasses[index])
              ? this.buttonClasses[index]
              : this.buttonClasses[index].split(" ")
            : []
        } else if (typeof this.buttonClasses === "string") {
          custom = this.buttonClasses.split(" ")
        }

        const combined = [...new Set([...base, ...custom])]
        return combined.join(" ")
      })
    },
  },
  watch: {
    modelValue(newVal) {
      const indices = newVal
        .map((value) =>
          this.buttons.findIndex((button) => button.value === value)
        )
        .filter((index) => index !== -1)

      if (JSON.stringify(this.selectedIndices) !== JSON.stringify(indices)) {
        this.selectedIndices = indices
      }
    },
    selectedIndices: {
      handler(newVal) {
        const selectedValues = newVal
          .map((i) => this.buttons[i]?.value)
          .filter(Boolean)

        // Avoid emitting same value
        if (
          JSON.stringify(selectedValues) !== JSON.stringify(this.modelValue)
        ) {
          this.$emit("update:modelValue", selectedValues)
        }
      },
      deep: true,
    },
  },
  methods: {
    isSelected(index) {
      return this.selectedIndices.includes(index)
    },
    toggleButton(index) {
      const idx = this.selectedIndices.indexOf(index)
      if (idx === -1) {
        this.selectedIndices.push(index)
      } else {
        this.selectedIndices.splice(idx, 1)
      }
    },
  },
}
</script>

<style scoped src="./button_checkboxes.css">
</style>
