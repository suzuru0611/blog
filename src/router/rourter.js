import { createMemoryHistory, createRouter } from "vue-router";

import PostWall from "@/views/PostWall.vue";
import Login from "@/views/Login.vue";
import MainPage from "@/views/MainPage.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/PostWall", name: "PostWall", component: PostWall },
  {
    path: "/:id?",
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
