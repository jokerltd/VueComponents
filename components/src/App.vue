<template src="./App.html"></template>

<script>

/** App,vue **/
import AutoCompleteTextBox from '@/components/textbox_autocomplete/textbox_autocomplete.vue'
import TextBox from '@/components/textbox/textbox.vue'

export default {
  name: 'App',
  components: {
    AutoCompleteTextBox,
    TextBox,
  },
  data() {
    return {
      inputValue: '',
      inputAutocomplete: '',
      italianWords: [
        'Accesso',
        'Albero',
        'Amore',
        'Annuncio',
        'Avvenimento',
        'Barca',
        'Bene',
        'Casa',
        'Città',
        'Dolore',
        'Donna',
        'Esempio',
        'Famiglia',
        'Figlio',
        'Gatto',
        'Giorno',
        'Hobby',
        'Hotel',
        'Incontro',
        'Isola',
        'Lavoro',
        'Libro',
        'Mare',
        'Mese',
        'Nome',
        'Notte',
        'Occhio',
        'Oggetto',
        'Pane',
        'Parola'
      ],
    }
  },
  methods: {
    handleTextBoxChange(newValue) {
      console.log('Text box changed to:', newValue)
    },
    onSelect(item) {
     
      console.log('Selected:', item)
    },    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
  padding: 1rem;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.custom-class-textbox {
  background-color: lightyellow;
  border: 1px solid #ccc;
  border-radius: 12px;
  color: red;
}

.custom-autocomplete {
  background-color: lightblue;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: red;
  font-size: 16px;
  padding: 1rem;
  width: 20rem;
}

.form-group {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
}

</style>
