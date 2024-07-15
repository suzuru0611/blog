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
        <nav class="mt-2 text-center">
            <a href="#" @click="sideStatus(0)"
                class="border-b-2 border-dotted block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">我的日記</a>
            <a href="#" @click="sideStatus(1)" class="border-b-2 border-dotted block py-2.5 px-4 rounded transition duration-200
                hover:bg-gray-200">待辦事項</a>
            <a href="#" @click="sideStatus(3)"
                class="border-b-2 border-dotted block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">聊天室</a>
            <a href="#" @click="navigateToPostWall"
                class="border-b-2 border-dotted block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">投稿聊天室</a>
            <a href="#" @click="openPopup"
                class="border-b-2 border-dotted block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">登出</a>
        </nav>
    </aside>

</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { usePopupStore } from '@/store/popup02';
import router from "@/router/rourter";

const popupStore = usePopupStore()
const auth = getAuth();

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


// 跳轉到PostWall
const navigateToPostWall = () => {
    router.push('/PostWall');
};

//觸發登出
const openPopup = () => {
    popupStore.showPopup('登出', `您確定要登出嗎？`, () => {
        signOut(auth)
            .then(() => {
                router.push('/login')
            })
            .catch(error => {
                console.log('登出失敗', error);
            });
    });
};

</script>

<style></style>