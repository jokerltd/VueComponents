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
  emits: ["update:modelValue", "select"],
  data() {
    return {
      filteredSuggestions: [],
      isOpen: false,
      activeSuggestionIndex: -1,
      isLoading: false,
      searchTimeout: null,
      blurTimeout: null,
    }
  },
  computed: {
    finalClass() {
      const defaultClasses = {
        "autocomplete-input": true,
      }

      if (!this.mergeClasses && this.class_textbox !== undefined) {
        return this.class_textbox
      }

      if (!this.class_textbox) {
        return defaultClasses
      }

      if (typeof this.class_textbox === "string") {
        return { ...defaultClasses, [this.class_textbox]: true }
      }

      if (Array.isArray(this.class_textbox)) {
        const merged = { ...defaultClasses }
        this.class_textbox.forEach((cls) => {
          if (typeof cls === "string") merged[cls] = true
        })
        return merged
      }

      return { ...defaultClasses, ...this.class_textbox }
    },
    dropdownWidth() {
      if (!this.$refs.input) {
        return "100%"
      }

      const inputRect = this.$refs.input.getBoundingClientRect()
      let maxLength = inputRect.width
      const tempSpan = document.createElement("span")
      tempSpan.style.position = "absolute"
      tempSpan.style.visibility = "hidden"
      tempSpan.style.whiteSpace = "nowrap"
      document.body.appendChild(tempSpan)

      this.filteredSuggestions.forEach((item) => {
        const text = typeof item === "object" ? item.label || item.id : item
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
    },
  },
  methods: {
    clearInput() {
      this.$emit("update:modelValue", "")
      this.filteredSuggestions = []
      this.isOpen = false
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    handleInput(event) {
      const value = event.target.value
      console.debug("Input event:", value)
      this.onInput(value)

      if (value === "") {
        this.isOpen = false // Chiudi se l'input è vuoto
      } else {
        this.isOpen = this.filteredSuggestions.length > 0
      }
    },
    onInput(value) {
      this.$emit("update:modelValue", value)
      this.activeSuggestionIndex = -1
      this.isOpen = true

      if (!this.suggestions || !Array.isArray(this.suggestions)) {
        if (this.apiUrl) {
          clearTimeout(this.searchTimeout)
          this.searchTimeout = setTimeout(() => {
            if (value.length > 0) {
              this.fetchSuggestions(value)
            } else {
              this.filteredSuggestions = []
              this.isOpen = false
            }
          }, 300)
        }
        return
      }

      this.filteredSuggestions = this.suggestions.filter((s) =>
        (typeof s === "string" ? s : s.label || s.id)
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      this.isOpen = this.filteredSuggestions.length > 0
    },
    async fetchSuggestions(query) {
      this.isLoading = true

      try {
        const url = new URL(this.apiUrl, window.location.origin)
        url.search = new URLSearchParams({
          q: query,
          ...this.apiParams,
        })

        const response = await fetch(url.toString())
        const data = await response.json()
        this.filteredSuggestions = data.results || []
        this.isOpen = true
      } catch (e) {
        console.error("Fetch error:", e)
        this.filteredSuggestions = []
      } finally {
        this.isLoading = false
      }
    },
    showAllSuggestions() {
      this.filteredSuggestions = [...this.suggestions]
      this.isOpen = true
      this.activeSuggestionIndex = -1
    },
    selectSuggestion(item) {
      const value = typeof item === "object" ? item.label || item.id : item
      this.$emit("update:modelValue", value)
      this.$emit("select", item)
      this.isOpen = false
      this.activeSuggestionIndex = -1
    },
    navigateSuggestions(direction) {
      const newIndex = this.activeSuggestionIndex + direction

      if (newIndex >= 0 && newIndex < this.filteredSuggestions.length) {
        this.activeSuggestionIndex = newIndex
      }
    },
    handleKeydown(event) {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          this.activeSuggestionIndex =
            (this.activeSuggestionIndex + 1) % this.filteredSuggestions.length
          break
        case "ArrowUp":
          event.preventDefault()
          this.activeSuggestionIndex =
            (this.activeSuggestionIndex - 1 + this.filteredSuggestions.length) %
            this.filteredSuggestions.length
          break
        case "Enter":
          if (this.activeSuggestionIndex >= 0) {
            this.selectSuggestion(
              this.filteredSuggestions[this.activeSuggestionIndex]
            )
          }
          break
        case "Escape":
          this.isOpen = false // Chiude la tendina
          this.activeSuggestionIndex = -1 // Resetta l'indice attivo
          this.$refs.input.blur() // Rimuovi il focus dall'input per chiudere la tastiera virtuale su mobile
          break
      }
    },
    onFocus() {
      if (
        this.filteredSuggestions.length > 0 ||
        (this.suggestions && this.suggestions.length > 0)
      ) {
        this.isOpen = true

        //if(this.apiUrl && !this.modelValue && this.suggestions.length === 0) {
        //
        //}
        //else
        if (
          !this.apiUrl &&
          this.suggestions &&
          this.suggestions.length > 0 &&
          !this.modelValue
        ) {
          this.showAllSuggestions()
        }
      }

      if (this.blurTimeout) {
        clearTimeout(this.blurTimeout)
        this.blurTimeout = null
      }
    },
    onBlur() {
      this.blurTimeout = setTimeout(() => {
        this.isOpen = false
        this.activeSuggestionIndex = -1
      }, 150)
    },
  },
  beforeUnmount() {
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout)
    }

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  },
}
</script>

<style scoped>
</style>
