import { createApp } from 'vue';
import { setupFirebase } from './services/firebase'; // 引入

import App from './App.vue';
setupFirebase; // 執行
console.log('setupFirebase',setupFirebase) //可以初始化有沒有成功
const app = createApp(App);

app.mount('#app');