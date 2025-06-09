<template src="./select_options.html"></template>

<script>
/* select_option.vue */
export default {
  name: "SelectOptions",
  props: {
    modelValue: {
      type: [String, Number, Object],
      required: true
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    apiUrl: {
      type: String,
      default: null
    },
    apiParams: {
      type: Object,
      default: () => ({})
    },
    class_select_options: {
      type: [String, Object, Array],
      required: false
    },
    mergeClasses: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Seleziona un’opzione'
    },
    style_textbox: {
      type: [String, Object],
      required: false
    },
    showClearIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: false,
      activeIndex: -1,
      remoteOptions: [],
      loading: false,
    }
  },
  computed: {
    finalClass() {

      const defaultClasses = {
        'border-round': true,
        'default-select': true
      };

      if (!this.mergeClasses && this.class_select_options !== undefined) {
        
        return this.class_select_options
      }

      if (!this.class_select_options) {
       
        return defaultClasses
      }

      if (typeof this.class_select_options === 'string') {
        
        return { ...defaultClasses, [this.class_select_options]: true }
      }

      if(Array.isArray(this.class_select_options)) {
        
        const merged = { ...defaultClasses }

        this.class_select_options.forEach(cls => {
          
          if(typeof cls === 'string') {

            merged[cls] = true
          }
        })

        return merged
      }

      return { ...defaultClasses, ...this.class_select_options }
    },
    isModelValueValid() {
    
      if(!this.modelValue) {

        return false
      }
    
      if(typeof this.modelValue === 'object') {

        return !!(this.modelValue.label || this.modelValue.name || this.modelValue.title || this.modelValue.id)
      }
    
      return true
    },
    optionsArray() {
    
      return this.options.length > 0 ? this.options : this.remoteOptions
    },
    selectedLabel() {

      if(!this.modelValue) {

        return this.placeholder
      }

      if(typeof this.modelValue === 'object') {

        return this.modelValue.label ||
               this.modelValue.name ||
               this.modelValue.title ||
               this.modelValue.id ||
               'Unknown'
      }

      return this.modelValue
    },
  },
  watch: {
    apiUrl(newVal) {   // When apiUrl changes, fetch new data
      
      if(newVal) {

        this.fetchRemoteOptions()
      }
    },
    selectedItem(newVal) {
   
      console.log("selectedItem changed:", newVal)
    }
  },
  mounted() {

    if(this.apiUrl) {

      this.fetchRemoteOptions()
    }
  },
  methods: {
    clearInput(event) {

      event.stopPropagation()
      this.$emit('update:modelValue', null)
    },
    async fetchRemoteOptions() {
    
      this.loading = true
      if(!this.apiUrl) {

        return
      }

      try {
      
        const url = new URL(this.apiUrl, window.location.origin)
        url.search = new URLSearchParams({ ...this.apiParams })
        const response = await fetch(url.toString())
        const data = await response.json()
        console.log("API Response:", data)
        this.remoteOptions = data.results || [] // Adjust based on real data
      } 
      catch (error) {
      
        console.error("Error fetching options:", error)
        this.remoteOptions = []
      } 
      finally {
      
        this.loading = false
      }
    },
    handleKeydown(event) {

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          this.navigateSuggestions(1)
          break
        case 'ArrowUp':
          event.preventDefault()
          this.navigateSuggestions(-1)
          break
        case 'Enter':
          if(this.activeIndex >= 0) {
            
            this.selectOption(this.options[this.activeIndex])
          }
          break
        case 'Escape':

          this.isOpen = false
          break
        case ' ':

          event.preventDefault()
          this.toggleDropdown()
          break
      }
    },
    navigateSuggestions(direction) {
    
      const newIndex = this.activeIndex + direction
    
      if(newIndex >= -1 && newIndex < this.optionsArray.length) {

        this.activeIndex = newIndex
      }
    },
    selectOption(option) {

      const selected = typeof option === 'object' ? { ...option } : option
      this.$emit('update:modelValue', selected)
      this.isOpen = false
    },
    toggleDropdown() {
    
      if(this.loading) {

        return
      }
      
      this.isOpen = !this.isOpen
    },    
  }
}

</script>

<style scoped>
.border-round {
  border-radius: 8px;
}

.clear-icon {
  color: #999;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s;
  user-select: none;
  z-index: 2;
}

.clear-icon:hover {
  color: #333;
}

.default-select {
  background-color: lightyellow;
  border: 1px solid #ccc;
  cursor: pointer;
  padding: 8px;
  position: relative;
  user-select: none;
}

.dropdown {
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  left: 0;
  max-height: 200px;
  min-width: 100%;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  z-index: 1000;
}

.dropdown-item {
  cursor: pointer;
  padding: 8px 12px;
}

.dropdown-item:hover,
.dropdown-item.active {
  background-color: #f0f0f0;
}

.dropdown-arrow {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #666;
  height: 0;
  pointer-events: none;
  position: absolute;
  right: 28px; /* Left of clear icon */
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.2s;
  width: 0;
}

.dropdown.is-open .dropdown-arrow {
  transform: translateY(-50%) rotate(180deg); /* Flip when open */
}

.input-wrapper {
  display: inline-block;
  max-width: 100%;
  position: relative;
  width: fit-content;
}

.select-display {
  box-sizing: border-box;
  cursor: pointer;
  padding-right: 30px;
  position: relative;
  width: 20rem;
}


</style>