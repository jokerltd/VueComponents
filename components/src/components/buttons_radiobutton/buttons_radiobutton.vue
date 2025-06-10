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
      this.$emit('update:modelValue', this.buttons[index].value);
    }
  }
};
</script>

<style scoped>

.radio-button-group {
  display: flex;
  gap: 10px;
}

.radio-button {
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 0.7rem;
  height: 2rem;
  margin-right: 0.1rem;
  padding: 2px 3px;
  transition: background-color 0.3s ease;
  width: 3rem;
}

.radio-button.selected {
  outline: 2px solid #000000;
  opacity: 0.9;
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