<template>
    <div class="mask" v-if="isLoading">
        <div class="loading-container">
            <div class="spinner"></div>
        </div>
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

.mask {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.1);
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
    z-index: 999;
}

.loading-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>