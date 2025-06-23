<template src="./check_boxes.html">
</template>

<script>
  /** check_boxes.vue **/

export default {
  name: "CheckBoxes",
  components: {},
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`
    },
    inputClasses: {
      type: [String, Array],
      default: () => []
    },
    labelClasses: {
      type: [String, Array],
      default: () => []
    },
    mergeClasses: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedValues: this.modelValue || []
    }
  },
  watch: {
    selectedValues(newVal) {

      this.$emit('update:modelValue', newVal)
    },
    modelValue(newVal) {
      
      this.selectedValues = newVal
    }
  },
  methods: {
    handleChange(event, value) {
      
      const isChecked = event.target.checked
      let newValues = [...this.selectedValues]

      if (isChecked) {
        newValues.push(value)
      } else {
        newValues = newValues.filter(val => val !== value)
      }

      this.selectedValues = newValues
    }
  }
}

</script>

<style scoped>

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.checkbox-item {
  align-items: center;
  display: inline-flex;
  gap: 6px;
  font-size: 0.85rem;
}

.form-check-input {
  appearance: none;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
}

.checkbox-select {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.checkbox-option {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.checkbox-option:hover {
  background-color: #f0f0f0;
}

.checkbox-option input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 0;
  background-color: #fff;
  position: relative;
}

.checkbox-option input[type="checkbox"]:checked::after {
  content: "✓";
  position: absolute;
  top: -2px;
  left: 4px;
  font-size: 1rem;
  color: #007bff;
}

</style>
