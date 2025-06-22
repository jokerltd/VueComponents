<template src="./buttons_checkboxes.html">
</template>

<script>
export default {
  name: "ButtonsCheckbox",
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
      required: true
    },
    mergeClasses: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedIndices: [] // multiple selection support
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

      const selectedValues = this.selectedIndices.map(i => this.buttons[i].value)
      this.$emit('update:modelValue', selectedValues)
    }
  }
}

</script>

<style scoped>

.button-height {
  align-items: center;
  display: inline-flex;
  font-size: 0.85rem;
  gap: 4px;
  height: 1.5rem;
  justify-content: center;
  min-height: 1.5rem;
  padding: 0 12px;
}


.button-icon,
.button-label {
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.checkbox-button,
.button-height {
  align-items: center;
  all: unset;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  display: inline-flex;
  font-size: 0.85rem;
  height: 1.5rem;
  justify-content: center;
  min-height: 1.5rem;
  padding: 0 12px;
  transition: all 0.2s ease;
}

.checkbox-button.selected {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4); /* more noticeable */
  opacity: 0.9;
  outline: 2px solid #000000;
}

/* Optional: Add a checkmark or other indicator */
.checkbox-button.selected::after {
  content: "✓";
  margin-left: 5px;
}

.shrink-container {
  height: 2rem;
}

.tab-button {
  align-items: center;
  all: unset; /* 👈 Removes all browser default styles */
  display: inline-flex;
  justify-content: center;

  /* Size control */
  background-color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  height: 1.8rem;
  min-height: 2rem;
  padding: 0 12px;
  transition: all 0.3s ease;
}

.tab-navigation {
  border: 1px solid red;
  display: inline-flex;
  flex-wrap: wrap;
  font-size: 0.85rem;
  gap: 8px;
  padding: 0.3rem;
}

</style>