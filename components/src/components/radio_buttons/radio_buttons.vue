<template src="./radio_buttons.html"></template>

<script>
/** radio_buttons.vue **/
export default {
  name: "RadioButtons",
  components: {},
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    mergeClasses: {
      type: Boolean,
      default: true,
    },
    baseClasses: {
      type: String,
      default: "",
    },
    inputClasses: {
      type: [String, Array],
      default: () => [],
    },
  },
  data() {
    return {
      selectedValue: this.modelValue,
      groupName: `radio-group-${Math.random().toString(36).substr(2, 9)}`,
    };
  },
  watch: {
    selectedValue(newVal) {
      this.$emit("update:modelValue", newVal);
    },
    modelValue(newVal) {
      this.selectedValue = newVal;
    },
  },
  computed: {
    finalName() {
      return this.options.map((o) => o.value).join("_") + "_group";
    },
  },
  methods: {
    // Il metodo handleChange non è chiamato da nessuna parte nel tuo template attuale,
    // e la sincronizzazione del v-model è già gestita dai watch.
    // Puoi rimuoverlo se non hai intenzione di usarlo.
    // handleChange(e) {
    //   this.$emit('selection-changed', this.selectedValue)
    // },
    itemClass(index) {
      let classesToApply = [];

      // Se mergeClasses è false, restituisci solo le classi passate, sovrascrivendo le statiche
      if (!this.mergeClasses) {
        // Se inputClasses[index] è un array (per classi per singolo item)
        if (Array.isArray(this.inputClasses[index])) {
          return this.inputClasses[index];
        }
        // Se inputClasses è un array singolo o una stringa (per tutte le items)
        return Array.isArray(this.inputClasses)
          ? this.inputClasses
          : this.inputClasses
          ? [this.inputClasses]
          : [];
      }

      // Se mergeClasses è true, restituisci le classi da aggiungere alle statiche
      // Vue le unirà automaticamente.
      if (Array.isArray(this.inputClasses)) {
        // Se inputClasses[index] è un array (per classi per singolo item)
        if (Array.isArray(this.inputClasses[index])) {
          classesToApply = this.inputClasses[index];
        } else {
          // Se inputClasses è un array singolo (per tutte le items)
          classesToApply = this.inputClasses;
        }
      } else if (typeof this.inputClasses === "string" && this.inputClasses) {
        classesToApply = [this.inputClasses];
      }

      return classesToApply;
    },
  },
};
</script>

<style scoped>
.custom-radio-indicator {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #ccc;
  border-radius: 50%;
  background-color: white;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;
  position: relative;
}

.radio-button {
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #333;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.3rem;
  transition: background-color 0.3s ease;
  min-width: 4rem;
  box-sizing: border-box;
}

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
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;
}

.radio-item input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

.radio-item input[type="radio"]:checked + .custom-radio-indicator {
  border-color: #007bff;
  background-color: #007bff;
}

.radio-item input[type="radio"]:checked + .custom-radio-indicator::after {
  content: "";
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  background-color: lime !important;
  border-radius: 50% !important;
  width: 0.6rem !important;
  height: 0.6rem !important;
  opacity: 1 !important;
  z-index: 10 !important;
}

.tab-content {
  background-color: transparent;
  border: 1px solid red;
  padding: 20px;
  min-height: 400px;
}
</style>
