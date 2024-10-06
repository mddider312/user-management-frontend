import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './main.css';  // Include Tailwind

createApp(App)
  .use(router)
  .mount('#app');
