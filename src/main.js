import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/rourter";
import { setupFirebase } from "./services/firebase";
setupFirebase;
createApp(App).use(router).mount("#app");
