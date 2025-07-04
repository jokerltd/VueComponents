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
      return this.modelValue.includes(value);
    },

    toggleSelection(value) {
      const currentSelection = [...this.modelValue];
      const index = currentSelection.indexOf(value);

      if (index > -1) {
        currentSelection.splice(index, 1);
      } else {
        currentSelection.push(value);
      }

      this.$emit("update:modelValue", currentSelection);
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

      return classes;
    },

    getIndicatorClasses() {
      let classes = ["custom-checkbox-indicator"]

      if (this.inputClasses) {
        if (Array.isArray(this.inputClasses)) {
          classes = classes.concat(this.inputClasses);
        } else {
          classes.push(this.inputClasses);
        }
      }

      return classes;
    },
  },
};
</script>

<style scoped>
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.checkbox-item {
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-sizing: border-box;
  color: #333;
  cursor: pointer;
  display: inline-flex;
  font-size: 0.85rem;
  gap: 6px;
  padding: 6px 12px;
  transition: background-color 0.2s ease;
}
.checkbox-item:hover {
  background-color: #f0f0f0;
}
.checkbox-item input[type="checkbox"] {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  height: 0;
  margin: 0;
  opacity: 0;
  outline: none;
  padding: 0;
  position: absolute;
  width: 0;
}
.custom-checkbox-indicator {
  background-color: white;
  border-radius: 3px;
  border: 2px solid #ccc;
  box-sizing: border-box;
  display: inline-block;
  flex-shrink: 0;
  height: 1rem;
  position: relative;
  width: 1rem;
}
.checkbox-item input[type="checkbox"]:checked + .custom-checkbox-indicator {
  background-color: #007bff;
  border-color: #007bff;
}
.checkbox-item
  input[type="checkbox"]:checked
  + .custom-checkbox-indicator::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  color: white;
}
</style>
