import { createApp } from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';

import './styles/vendor/tailwind.css';
import './styles/main.scss';

const app = createApp(App);

app
	.use(i18n)
	.use(store)
	.use(router)
	.mount('#root');
