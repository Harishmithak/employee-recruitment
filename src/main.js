import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";




createApp(App).use(store).use(router).mount('#app')



