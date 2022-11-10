import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:windi.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload,faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUpload,faFileSignature);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
