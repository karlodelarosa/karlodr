import { createApp } from 'vue'
import 'animate.css'
import './styles/index.css'

import router from './router'
// import store from './store/index.ts'

import App from './App.vue'

const app = createApp(App)

app.use(router)
// app.use(store)
app.mount('#app')
