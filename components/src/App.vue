<template src="./App.html"></template>

<script>

/** App,vue **/
import AutoCompleteTextBox from '@/components/textbox_autocomplete/textbox_autocomplete.vue'
import ButtonsRadiobutton from '@/components/buttons_radiobutton/buttons_radiobutton.vue'
import SelectOptions from '@/components/select_options/select_options.vue'
import TextBox from '@/components/textbox/textbox.vue'

export default {
  name: 'App',
  components: {
    AutoCompleteTextBox,
    ButtonsRadiobutton,
    SelectOptions,
    TextBox,
  },
  data() {
    return {
      inputValue: '',
      inputValue2: '',
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
      myOptions: [],
      selectedRadioButton: null,
      buttonCustomClasses: [
        'buttons-radiobutton-base-class',
        'buttons-radiobutton-base-class buttons-radiobutton-base-class2',
        'buttons-radiobutton-base-class'
      ],      
      buttonOptions: [
        { label: 'Yes', color: '#007BFF', value: 'yes' },
        { label: 'No', color: 'darkgreen', value: 'no' },
        { label: 'Maybe', color: 'goldenrod', value: 'maybe' }
      ],
      selectedItem: null,
    }
  },
  mounted() {

    this.myOptions = ["Mele","Banane","Pere","Fragole"]
  },
  methods: {
    handleTextBoxChange(newValue) {
     
      console.log('Text box changed to:', newValue)
    },
    handleSelectedRadioButton(value) {

      console.debug("handleSelectedRadioButton(value)", value) /**/
      this.selectedRadioButton = value
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

.alt {
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.btn-style {
  border-radius: 8px;
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

.buttons-radiobutton-base-class {
  background-color: #333;
  border-radius: 4px;
  border: none;
  color: navy !important;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 20px 30px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  width: 5rem !important;
}

.buttons-radiobutton-base-class2 {
  color: yellow !important;
}

</style>
