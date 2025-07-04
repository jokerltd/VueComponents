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
    };
  },
  computed: {
    mergedClasses() {
      return this.buttons.map((_, index) => {
        const base = this.mergeClasses ? this.baseClasses.split(" ") : [];
        let custom = [];

        if (Array.isArray(this.buttonClasses)) {
          custom = this.buttonClasses[index]
            ? Array.isArray(this.buttonClasses[index])
              ? this.buttonClasses[index]
              : this.buttonClasses[index].split(" ")
            : [];
        } else if (typeof this.buttonClasses === "string") {
          custom = this.buttonClasses.split(" ");
        }

        const combined = [...new Set([...base, ...custom])];
        return combined.join(" ");
      });
    },
  },
  watch: {
    modelValue(newVal) {
      const indices = newVal
        .map((value) =>
          this.buttons.findIndex((button) => button.value === value)
        )
        .filter((index) => index !== -1);

      if (JSON.stringify(this.selectedIndices) !== JSON.stringify(indices)) {
        this.selectedIndices = indices;
      }
    },
    selectedIndices: {
      handler(newVal) {
        const selectedValues = newVal
          .map((i) => this.buttons[i]?.value)
          .filter(Boolean);

        // Avoid emitting same value
        if (
          JSON.stringify(selectedValues) !== JSON.stringify(this.modelValue)
        ) {
          this.$emit("update:modelValue", selectedValues);
        }
      },
      deep: true,
    },
  },
  methods: {
    isSelected(index) {
      return this.selectedIndices.includes(index);
    },
    toggleButton(index) {
      const idx = this.selectedIndices.indexOf(index);
      if (idx === -1) {
        this.selectedIndices.push(index);
      } else {
        this.selectedIndices.splice(idx, 1);
      }
    },
  },
};
</script>

<style scoped>
.button-height {
  align-items: center;
  display: inline-flex;
  font-size: 0.85rem;
  gap: 4px;
  height: 2rem;
  justify-content: center;
  min-height: 1.5rem;
  padding: 0 12px;
}

.checkbox-button {
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 0.7rem;
  height: 2rem;
  margin-right: 0.1rem;
  padding: 03rem;
  transition: background-color 0.3s ease;
  width: 3rem;
}

.checkbox-button.selected {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  opacity: 0.9;
  outline: 2px solid #000000;
}

.checkbox-button.selected::after {
  content: "✓";
  margin-left: 5px;
}

.shrink-container {
  box-sizing: border-box;
  display: inline-flex;
  grid-template-columns: repeat(auto-fit, minmax(min-content, max-content));
  gap: 10px;
  margin: 0;
  max-width: 100%;
  padding: 5px 5px;
  width: fit-content;
}
</style>
