<template>
  <div>
    <Loading class="z-50" :isLoading="loading" />
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

//監測登入狀態
onMounted(() => {
  onAuthStateChanged(auth, user => {
    if (user) {
      isLoggedIn.value = true;
      userId.value = user.uid
      router.push({ name: 'MainPage', params: { id: user.uid } }).then(() => {
        loading.value = false;
      });
    } else {
      isLoggedIn.value = false;
      router.push('/login').then(() => {
        loading.value = false;
      });
    }
  });
});

//觸發登出
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