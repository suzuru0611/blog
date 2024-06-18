!<template>
    <div class=' my-3'>
        <h1 class="text-2xl text-center ">
            線上即時聊天室
        </h1>
        <p class="text-red-400 text-center">
            測試用
        </p>
        <Login @startChat="startChat" v-if="step === 1" />
        <Chat :username="username" v-else />
    </div>

</template>

<script setup>
import Chat from "./ChatComponents/Chat.vue";
import Login from "./ChatComponents/Login.vue";
import { ref } from "vue";
const step = ref(1);
const username = ref('');
const startChat = (name) => {
    step.value = 2;
    username.value = name
}
</script>

<style scoped></style>