import { createMemoryHistory, createRouter } from "vue-router";

import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import TodoList from "../components/TodoList.vue";

const routes = [
  { path: "/signUp", component: SignUp },
  { path: "/signIn", component: SignIn },
  { path: "/todoList", component: TodoList },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
