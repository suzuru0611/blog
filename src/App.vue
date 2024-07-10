<template>
  <div>
    <Loading class="z-50" :isLoading="loading" />
    <Transition name="fade">
      <router-view v-if="isLoggedIn" :userId="userId" />
    </Transition>
    <Transition name="fade">
      <Login v-if="!isLoggedIn" />
    </Transition>

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


</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>