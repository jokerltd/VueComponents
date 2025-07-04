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
    }
  },
  watch: {
    selectedValue(newVal) {
      this.$emit("update:modelValue", newVal)
    },
    modelValue(newVal) {
      this.selectedValue = newVal
    },
  },
  computed: {
    finalName() {
      return this.options.map((o) => o.value).join("_") + "_group"
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
      let classesToApply = []

      // Se mergeClasses è false, restituisci solo le classi passate, sovrascrivendo le statiche
      if (!this.mergeClasses) {
        // Se inputClasses[index] è un array (per classi per singolo item)
        if (Array.isArray(this.inputClasses[index])) {
          return this.inputClasses[index]
        }
        // Se inputClasses è un array singolo o una stringa (per tutte le items)
        return Array.isArray(this.inputClasses)
          ? this.inputClasses
          : this.inputClasses
          ? [this.inputClasses]
          : []
      }

      // Se mergeClasses è true, restituisci le classi da aggiungere alle statiche
      // Vue le unirà automaticamente.
      if (Array.isArray(this.inputClasses)) {
        // Se inputClasses[index] è un array (per classi per singolo item)
        if (Array.isArray(this.inputClasses[index])) {
          classesToApply = this.inputClasses[index]
        } else {
          // Se inputClasses è un array singolo (per tutte le items)
          classesToApply = this.inputClasses
        }
      } else if (typeof this.inputClasses === "string" && this.inputClasses) {
        classesToApply = [this.inputClasses]
      }

      return classesToApply
    },
  },
}
</script>

<style scoped src="./radio_buttons.css">
</style>
