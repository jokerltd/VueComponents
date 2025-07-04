<template src='./textbox.html'></template>

<script>
export default {
  name: "TextBox",
  props: {
    class_textbox: {
      type: [String, Object, Array],
      required: false,
    },
    mergeClasses: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    style_textbox: {
      type: [String, Object],
      required: false,
    },
    showClearIcon: {
      type: Boolean,
      default: true,
    },    
  },
  computed: {
    finalClass() {
      
      const defaultClasses = {
        'border-round': true,
        'default-textbox': true
      }

      if (!this.mergeClasses && this.class_textbox !== undefined) {
        
        return this.class_textbox
      }

      if (!this.class_textbox) {

        return defaultClasses
      }

      if(typeof this.class_textbox === 'string') {
        
        return { ...defaultClasses, [this.class_textbox]: true }
      }

      if(Array.isArray(this.class_textbox)) {
        
        const merged = { ...defaultClasses }
        this.class_textbox.forEach(cls => {

          if(typeof cls === 'string') merged[cls] = true
        })
        return merged
      }

      return { ...defaultClasses, ...this.class_textbox }
    }
  },
  methods: {
    clearInput(event) {
    
      event.stopPropagation()
      this.$emit('update:modelValue', '')
      // Optional: focus input after clearing
      this.$nextTick(() => {

        event.target.focus()
      })
    }
  },  
}
</script>

<style scoped src="./textbox.css">
</style>