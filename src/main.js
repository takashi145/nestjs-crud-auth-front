import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const pinia = createPinia();

const app = createApp(App);

app.use(PrimeVue).use(pinia).use(router);
app.component('Button', Button);
app.component('InputText', InputText);
app.mount('#app');
