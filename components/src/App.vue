<template src="./App.html"></template>

<script>
/** App,vue **/
import AutoCompleteTextBox from "@/components/textbox_autocomplete/textbox_autocomplete.vue"
import ButtonsCheckbox from "@/components/buttons_checkboxes/buttons_checkboxes.vue"
import ButtonsRadiobutton from "@/components/buttons_radiobutton/buttons_radiobutton.vue"
import CheckBoxes from "@/components/check_boxes/check_boxes.vue"
import DynamicTable from "@/components/tables_lists/table.vue"
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
    DynamicTable,
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
      headers: [
        { label: 'Column 1', sortable: true },
        { label: 'Column 2', sortable: false },
        { label: 'Column 3', sortable: true }
      ],
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
      selected3State: "maybe",
      sortState: {
        column: null,
        direction: null
      },
      tablerows: [
        { id: 1, col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
        { id: 2, col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
      ],
      toggleState: true,
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

<style scoped src="./App.css">
</style>
