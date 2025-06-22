<template src="./textbox_autocomplete.html"></template>

<script>
export default {
  name: "AutoCompleteTextBox",
  props: {
    // Remote data source
    apiUrl: {
      type: String,
      default: null,
    },
    apiParams: {
      type: Object,
      default: () => ({}),
    },
    class_textbox: {
      type: [String, Object, Array],
      default: null,
    },
    modelValue: {
      type: [String, Object],
      required: true,
    },
    // Styling props
    mergeClasses: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    showClearIcon: {
      type: Boolean,
      default: true,
    },
    // Local data source (array of strings or { id, label })
    suggestions: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'select'],
  data() {
    return {
      filteredSuggestions: [],
      isOpen: false,
      activeSuggestionIndex: -1,
      isLoading: false,
      searchTimeout: null
    }
  },
  computed: {
    finalClass() {
    
      const defaultClasses = {
        'autocomplete-input': true
      }

      if (!this.mergeClasses && this.class_textbox !== undefined) {
        return this.class_textbox
      }

      if (!this.class_textbox) {
        return defaultClasses
      }

      if (typeof this.class_textbox === 'string') {
        return { ...defaultClasses, [this.class_textbox]: true }
      }

      if (Array.isArray(this.class_textbox)) {
        const merged = { ...defaultClasses }
        this.class_textbox.forEach(cls => {
          if (typeof cls === 'string') merged[cls] = true
        })
        return merged
      }

      return { ...defaultClasses, ...this.class_textbox }
    },
    dropdownWidth() {

      if(!this.$refs.input) {

        return '100%'
      }
      
      const inputRect = this.$refs.input.getBoundingClientRect()
      let maxLength = inputRect.width
      const tempSpan = document.createElement('span')
      tempSpan.style.position = 'absolute'
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.whiteSpace = 'nowrap'
      document.body.appendChild(tempSpan)
  
      this.filteredSuggestions.forEach(item => {

        const text = typeof item === 'object' ? item.label || item.id : item
        tempSpan.textContent = text
        maxLength = Math.max(maxLength, tempSpan.offsetWidth)
      })
  
      document.body.removeChild(tempSpan)
      return `${maxLength + 20}px`
    },
  },
  watch: {
    modelValue() {
      // Keep input in sync
    },
    suggestions(newVal) {

      this.filteredSuggestions = newVal
    }
  },
  methods: {
    clearInput() {

      this.$emit('update:modelValue', '')
      this.filteredSuggestions = []
      this.isOpen = false

      // Optional: Focus input after clearing
      this.$nextTick(() => {
        
        this.$refs.input.focus()
      })
    },
    handleInput(event) {

      const value = event.target.value
      console.debug("Input event:", value) /**/
      this.onInput(value)
    },
    onInput(value) {

      console.debug("Processing input:", value) /**/
      this.$emit('update:modelValue', value)
      this.isOpen = true

      if(!this.suggestions || !Array.isArray(this.suggestions)) {

        return
      }

      this.filteredSuggestions = this.suggestions.filter(s =>
    
        s.toLowerCase().includes(value.toLowerCase())
      )    
      console.debug("Filtering for:", value) /**/ 
      console.debug("Raw suggestions:", this.suggestions) /**/ 
    },
    async fetchSuggestions(query) {
      
      console.debug("Fetching suggestions for:", query) /**/

      this.isLoading = true
      
      try {
      
        const url = new URL(this.apiUrl, window.location.origin)
        url.search = new URLSearchParams({
          q: query,
          ...this.apiParams
        })

        console.log("API Request URL:", url.toString()) /**/

        const response = await fetch(url.toString())
        console.log("API Response:", response) /**/
        const data = await response.json()
        console.log("Parsed Data:", data) /**/        
        this.filteredSuggestions = data.results || []
        this.isOpen = true
      } 
      catch (e) {
      
        console.error("Fetch error:", e)
        this.filteredSuggestions = []
      } 
      finally {
      
        this.isLoading = false
      }
    },
    showAllSuggestions() {
      
      this.filteredSuggestions = [...this.suggestions]
      this.isOpen = true
      this.activeSuggestionIndex = -1
    },
    selectSuggestion(item) {
      
      const value = typeof item === 'object' ? item.label || item.id : item
      this.$emit('update:modelValue', value)
      this.$emit('select', item)
      this.isOpen = false
      this.activeSuggestionIndex = -1
    },
    navigateSuggestions(direction) {

      const newIndex = this.activeSuggestionIndex + direction
      
      if(newIndex >= 0 && newIndex < this.filteredSuggestions.length) {
        
        this.activeSuggestionIndex = newIndex
      }
    },
    handleKeydown(event) {
      
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          this.activeSuggestionIndex = (this.activeSuggestionIndex + 1) % this.filteredSuggestions.length
          break
        case 'ArrowUp':
          event.preventDefault()
          this.activeSuggestionIndex = (this.activeSuggestionIndex - 1 + this.filteredSuggestions.length) % this.filteredSuggestions.length
          break
        case 'Enter':
          if(this.activeSuggestionIndex >= 0) { 

            this.selectSuggestion(this.filteredSuggestions[this.activeSuggestionIndex])
          }
          break
        case 'Escape':
          this.isOpen = false
          break
      }
    }
  }
}
</script>

<style scoped>

.autocomplete-input {
  box-sizing: border-box;
  font-size: 16px;
  padding: 8px;
  width: 20rem;
}

.autocomplete-wrapper {
  display: inline-block;
  position: relative;
  width: fit-content;
}

.clear-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 18px;
  line-height: 1;
  user-select: none;
  transition: opacity 0.2s;
  z-index: 2;
}

.clear-icon:hover {
  color: #333;
}

.input-wrapper {
  border: 1px solid red;
  display: inline-block;
  max-width: 100%;  
  padding: 0.3rem;
  position: relative;
  width: fit-content;
}

.suggestions {
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  left: 0;
  margin-top: 4px;
  max-height: 200px;
  min-width: 100%;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  white-space: nowrap;
  z-index: 1000;
}

.suggestion-item {
  cursor: pointer;
  padding: 8px 12px;
}

.suggestion-item:hover,
.suggestion-item.active {
  background-color: #f0f0f0;
}
</style>      