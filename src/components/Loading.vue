<template>
    <div class="loading-container" v-if="isLoading">
        <div class="spinner"></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 接收一個 isLoading 的 prop 用來控制顯示
const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
});
</script>

<style scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
}

.loading-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>