<template>
    <div class='flex flex-col justify-center items-center'>
        <div class="flex flex-col justify-center items-center mb-4">
            <label for="username" class="block mb-4">
                請輸入暱稱,開始聊天
            </label>
            <input type="text" id="username" class="border block p-2" v-model.trim="username"
                @keyup.enter="$emit('startChat', username)" />
        </div>
        <button type="button" class="border bg-green-400 p-2" @click="$emit('startChat', username)"
            :disabled="!username">
            開始使用
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";
const username = ref('')
</script>

<style scoped></style>