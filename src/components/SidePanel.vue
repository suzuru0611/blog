<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-40" v-if="isSidebarOpen"
        @click="closeSidebar"></div>
    <aside
        :class="['transform z-50 top-0 left-0 w-[80%] sm:w-[400px] bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 ', isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">
        <div class="flex items-center justify-between p-4">
            <div class="text-xl font-semibold">
                <img src="@/img/LogoFull.png" alt="">
            </div>

        </div>
        <nav class="mt-2">
            <a href="#" @click="sideStatus(0)"
                class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">我的日記</a>
            <a href="#" @click="sideStatus(1)" class=" block py-2.5 px-4 rounded transition duration-200
                hover:bg-gray-200">待辦事項</a>
            <a href="#" @click="sideStatus(3)"
                class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">聊天室</a>
        </nav>
    </aside>

</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closeSidebar', 'sideStatus']);

const sideStatus = (value) => {
    emit('sideStatus', value)

}

const closeSidebar = () => {
    emit('closeSidebar', false);
};

const props = defineProps({
    isSidebarOpen: {
        Type: Boolean,
        required: true,
    }
})

</script>

<style>
/* Add your custom styles here */
</style>