import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTrash, faEdit, faCheck, faPhone, faBan } from '@fortawesome/free-solid-svg-icons'
import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faEdit, faCheck, faPhone, faTelegram, faWhatsapp, faBan)
library.add(fas, fab)

export default {
  components: {
    FontAwesomeIcon,
  }
}

const app = createApp(App)
app.use(BootstrapVue3)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount("#app")
