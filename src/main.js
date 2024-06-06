import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ShowMenu from './components/ShowMenu.vue';

const app = createApp(App);
app.use(router);
app.component('show-menu', ShowMenu);
app.mount('#app');

