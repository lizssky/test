import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:windi.css'
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload,faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

library.add(faUpload,faFileSignature);
const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.mount('#app')

