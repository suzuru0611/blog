<template>
  <div>
    <Loading :isLoading="loading" />
    <router-view v-if="isLoggedIn" :userId="userId" /> <!-- 根據 isLoggedIn 和 loading 的狀態顯示對應頁面 -->
    <Login v-if="!isLoggedIn" />
    <button @click="handleSignOut()" v-if="isLoggedIn">登出</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from "@/router/rourter";
import Login from "@/views/Login.vue";
import Loading from '@/components/Loading.vue';

const loading = ref(true);
const auth = getAuth();
const isLoggedIn = ref(false);
const userId = ref('')

onMounted(() => {
  onAuthStateChanged(auth, user => {
    if (user) {
      isLoggedIn.value = true;
      console.log('用戶已登錄');

      console.log(user.uid);
      userId.value = user.uid
      router.push({ name: 'MainPage', params: { id: user.uid } }).then(() => {
        loading.value = false;
      });
    } else {
      isLoggedIn.value = false;
      console.log('用戶未登錄');
      router.push('/login').then(() => {
        loading.value = false;
      });
    }
  });
});

const handleSignOut = () => {
  loading.value = true;
  signOut(auth)
    .then(() => {
      isLoggedIn.value = false;
      router.push('/login').then(() => {
        loading.value = false;
      });
    })
    .catch(error => {
      console.log('登出失敗', error);
      loading.value = false;
    });
};
</script>

<style scoped></style>