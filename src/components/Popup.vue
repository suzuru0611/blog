<template>
    <Transition name="fade">
        <div v-if="visible" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="closePopup"></div>
            <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center z-50">
                <h2 class="text-lg font-bold mb-4">{{ title }}</h2>
                <p class="text-sm mb-4">{{ message }}</p>
                <div class="flex justify-center">
                    <button @click="confirmAction"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
                        確定
                    </button>
                    <button @click="closePopup" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                        取消
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { inject } from 'vue';

const visible = inject('popupVisible');
const title = inject('popupTitle');
const message = inject('popupMessage');
const confirmAction = inject('popupConfirmAction');
const closePopup = inject('closePopup');
</script>