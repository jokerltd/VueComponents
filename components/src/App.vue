<template src="./App.html"></template>

<script>
/** App,vue **/
import AutoCompleteTextBox from "@/components/textbox_autocomplete/textbox_autocomplete.vue"
import ButtonsCheckbox from "@/components/buttons_checkboxes/buttons_checkboxes.vue"
import ButtonsRadiobutton from "@/components/buttons_radiobutton/buttons_radiobutton.vue"
import CheckBoxes from "@/components/check_boxes/check_boxes.vue"
import RadioButtons from "@/components/radio_buttons/radio_buttons.vue"
import SelectOptions from "@/components/select_options/select_options.vue"
import TextBox from "@/components/textbox/textbox.vue"
import StateButton from "@/components/state_button/state_button.vue"
import ThreeStateButton from "@/components/state_button/three_state_button.vue"

export default {
  name: "App",
  components: {
    AutoCompleteTextBox,
    ButtonsCheckbox,
    ButtonsRadiobutton,
    CheckBoxes,
    RadioButtons,
    SelectOptions,
    TextBox,
    StateButton,
    ThreeStateButton,
  },
  data() {
    return {
      buttonCustomClasses: [
        "buttons-radiobutton-base-class",
        "buttons-radiobutton-base-class buttons-radiobutton-base-class2",
        "buttons-radiobutton-base-class",
      ],
      buttonOptions: [
        {
          label: "Yes",
          color: "#007BFF",
          value: "yes",
          icon: "✔️",
          side: "left",
        },
        {
          label: "No",
          color: "darkgreen",
          value: "no",
          icon: "❌",
          side: "right",
        },
        { label: "Maybe", color: "goldenrod", value: "maybe" },
      ],
      checkboxesOptions: [],
      checkboxCustomClasses: ["my-custom-checkbox-size"],
      inputValue: "",
      inputValue2: "",
      inputAutocomplete: "",
      italianWords: [],
      myOptions: [],
      radioRadiobuttons: null,
      selectedButtonsCheckboxes: [],
      selectedButtonRadioButton: null,
      selectedCheckBoxes: [],
      selectedRadio: null,
      selectedRadioButton: null,
      selectedRadioOptions: [],
      selectedItem: null,
      toggleState: true,
      selected3State: "maybe",
    }
  },
  watch: {
    buttonState(newValue, oldValue) {

      console.log('🔄 Parent: buttonState changed from', oldValue, 'to', newValue)
    }
  },
  mounted() {
    
    console.log('🚀 Parent mounted with buttonState:', this.buttonState)

    this.italianWords = [
      "Accesso",
      "Albero",
      "Amore",
      "Annuncio",
      "Avvenimento",
      "Barca",
      "Bene",
      "Casa",
      "Città",
      "Dolore",
      "Donna",
      "Esempio",
      "Famiglia",
      "Figlio",
      "Gatto",
      "Giorno",
      "Hobby",
      "Hotel",
      "Incontro",
      "Isola",
      "Lavoro",
      "Libro",
      "Mare",
      "Mese",
      "Nome",
      "Notte",
      "Occhio",
      "Oggetto",
      "Pane",
      "Parola",
    ];
    this.myOptions = ["Mele", "Banane", "Pere", "Fragole"];
    this.checkboxesOptions = [
      { label: "True", value: "true" },
      { label: "False", value: "false" },
      { label: "Maybe", value: "maybe" },
    ];
    this.radioOptions = ["True", "False", "Maybe"];
    this.selectedRadioOptions = ["True", "False", "Maybe"];
  },
  methods: {
    handleTextBoxChange(newValue) {
      console.log("Text box changed to:", newValue);
    },
    handleSelectedRadio(value) {
      console.debug("handleSelectedRadio(value)", value); /**/
      this.selectedRadio = value;
    },
    handleSelectedButtonCheckBoxes(value) {
      this.selectedButtonsCheckboxes = value;
    },
    handleSelectedButtonRadioButton(value) {
      this.selectedButtonRadioButton = value;
    },
    handleSelectedRadioButton(value) {
      console.debug("handleSelectedRadioButton(value)", value); /**/
      this.selectedRadioButton = value;
    },
    onSelect(item) {
      console.log("Selected:", item);
    },
  },
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

*::before,
*::after {
  box-sizing: border-box;
}

.alt {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-style {
  border-radius: 8px;
}

.button-layout {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  min-width: 4rem;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 0.875rem; /* Base per i button-layout */
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.buttons-radiobutton-base-class {
  background-color: #333;
  color: navy !important;
}

.buttons-radiobutton-base-class2 {
  color: yellow !important;
}

.checkbox-button,
.radio-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  min-width: 4rem;
  padding: 0 12px;
  box-sizing: border-box;

  border-radius: 4px;
  background-color: #f9f9f9;
  /* RIMUOVI DA QUI color, font-size, font-weight, cursor se vuoi che siano nel componente */
  /* color: #333; */
  /* font-size: 0.9rem; */
  /* font-weight: 600; */
  /* cursor: pointer; */
  padding: 0.3rem;
  transition: background-color 0.3s ease;
}

.custom-checkbox-indicator {
  width: 1.8rem;
  height: 1.8rem;
  min-width: 1.8rem;
  min-height: 1.8rem;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 3px;
  display: inline-block;
  flex-shrink: 0;
}

.custom-checkbox-indicator.my-custom-checkbox-size {
  height: 1.8rem !important; /* Forza la dimensione, se necessario */
  width: 1.8rem !important; /* Forza la dimensione, se necessario */
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

.custom-class-textbox {
  background-color: lightyellow;
  border: 1px solid #ccc;
  border-radius: 12px;
  color: red;
}

.custom-container {
  background-color: transparent;
  border: 1px solid red;
  padding: 20px;
}

.form-group {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
}

.radioCustomClasses .custom-radio-indicator {
  width: 1.5rem !important; /* Queste dimensioni sovrascriveranno quelle nel componente */
  height: 1.5rem !important;
  min-width: 1.5rem !important;
  min-height: 1.5rem !important;
}

.custom-thumb {
  font-size: 14px;
}

.thumb-no {
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

.thumb-maybe {
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.thumb-yes {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.manual-controls {
  margin-top: 20px;
}

.manual-controls button {
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.manual-controls button:hover {
  background: #f0f0f0;
}

</style>
