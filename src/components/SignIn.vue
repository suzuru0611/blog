!<template>
    <div class=''>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // 登入成功 跳轉至其他頁面
    })
    .catch((error) => {
        // 錯誤訊息
    });
</script>

<style scoped></style>