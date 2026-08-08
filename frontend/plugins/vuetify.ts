import '@mdi/font/css/materialdesignicons.css'
<<<<<<< HEAD

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
  })
  app.vueApp.use(vuetify)
=======
import 'vuetify/styles'
import {createVuetify} from 'vuetify'

export default defineNuxtPlugin((app)=>{

    const vuetify = createVuetify({

    })

    app.vueApp.use(vuetify)

>>>>>>> origin/main
})