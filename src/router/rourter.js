import { createMemoryHistory, createRouter } from "vue-router";

import SignUp from "../components/SignUp.vue";
import Login from "@/views/Login.vue";
import MainPage from "@/views/MainPage.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  {
    path: "/:id?", // 可选的 id 参数
    name: "MainPage",
    components: {
      default: MainPage,
    },
    props: {
      default: true,
    },
  },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
