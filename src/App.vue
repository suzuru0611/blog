<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from "./router/rourter";
import Login from "@/views/Login.vue";
import MainPage from "@/views/MainPage.vue";
import TodoList from "@/components/TodoList.vue";

const auth = getAuth();

const goToSignUP = () => {  // 跳至註冊頁
  router.push('/signUp');
};
const goToSignIn = () => {  // 跳至登入頁
  router.push('/signIn');
};
const isLoggedIn = ref(false); // 判斷是否登入
const handleSignOut = () => {
  signOut(auth) // 登出方法，須上方引入
    .then(() => {
      // Sign-out successful.
      isLoggedIn.value = false;
      router.push('/'); // 登出成功，跳回首頁
    })
    .catch(error => {
      console.log('登出失敗', error);
    });
};

onMounted(() => {
  onAuthStateChanged(auth, user => {
    user ? (isLoggedIn.value = true) : (isLoggedIn.value = false);
  });
});

</script>

<template>
  <!-- <Login /> -->
  <MainPage />
</template>

<style scoped></style>
