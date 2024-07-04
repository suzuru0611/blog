<template>
    <div class="relative">
        <div class="w-full h-screen flex items-center justify-center bg-hero-pattern bg-center bg-cover">
            <Loading :isLoading="loading" />
            <div class="w-full h-screen absolute bg-gray-900 opacity-30 z-0">
            </div>
            <div class="flex w-[90%] h-[90%] rounded-xl overflow-hidden z-30 xl:w-[60%] xl:h-[80%]">
                <div class="w-[50%] bg-gray-100 hidden p-5  md:block">
                    <div class="flex gap-3">
                        <div :class="[
                'border-2 border-blue-500 text-lg font-bold px-3 py-1 rounded-xl transition duration-300',
                status === 0 ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-400 hover:text-white'
            ]" @click="status = 0">
                            我的日記
                        </div>
                        <div :class="[
                'border-2 border-blue-500 text-lg font-bold px-3 py-1 rounded-xl transition duration-300',
                status === 1 ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-400 hover:text-white'
            ]" @click="status = 1">待辦事項</div>
                    </div>

                    <div>
                        <DaysSelect @loaded="onContentLoaded" @openPopup="openPopup" @selectDay="selectDay"
                            :userId="userId" />
                    </div>
                </div>
                <div class="w-full  flex flex-col items-center  bg-white p-5 md:w-[50%]">
                    <NoteContent @loaded="onContentLoaded" :selectDayItem="selectDayItem" :userId="userId" />
                </div>
            </div>

        </div>
        <!-- 待辦事項 -->
        <div v-if="status === 1" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <TodoList v-if="status === 1" :userId="userId" @openPopup="openPopup" class="z-30" />
            <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="closePopup"></div>
        </div>
        <div v-if="popupVisible" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <!-- 背景灰色透明 -->
            <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="closePopup"></div>

            <!-- POPUP内容 -->
            <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center z-50">
                <!-- 標題 -->
                <h2 class="text-lg font-bold mb-4">確認刪除</h2>

                <!-- 文字内容 -->
                <p class="text-sm mb-4">您確定要刪除這天的日記嗎？</p>

                <!-- 按鈕 -->
                <div class="flex justify-center">
                    <button @click="confirmRemove"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
                        確定
                    </button>
                    <button @click="closePopup" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                        取消
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import { storage, db } from "@/services/firebase";

import {
    ref as storageRef,
    deleteObject
} from "firebase/storage";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import NoteContent from "@/components/NoteContent.vue";
import DaysSelect from "@/components/DaysSelect.vue";
import TodoList from "@/components/TodoList.vue";
import Loading from '@/components/Loading.vue';

let currentItemToDelete = null;
const selectDayItem = ref(null)
const popupVisible = ref(false);
const status = ref(0)
const loading = ref(false)
const contentLoaded = ref({
    noteContent: false,
    todoList: false
});

const props = defineProps({
    userId: {
        type: String,
        required: true
    }
})




const selectDay = (item) => {
    selectDayItem.value = item
    console.log(selectDayItem);
}

const openPopup = (fullPath) => {
    currentItemToDelete = fullPath;
    popupVisible.value = true;
    console.log(currentItemToDelete);
}

const closePopup = () => {
    popupVisible.value = false;
    status.value = 0
};

const confirmRemove = () => {
    if (currentItemToDelete) {
        removeImg(currentItemToDelete);
        currentItemToDelete = null;
        closePopup();
    }
};

const removeImg = async (currentItemToDelete) => {
    try {
        const docRef = collection(db, "users", props.userId, "userfile");
        const docSnapshot = await getDocs(docRef);
        docSnapshot.forEach(async (document) => {
            if (document.data().fullPath === currentItemToDelete) {
                await deleteDoc(doc(db, "users", props.userId, "userfile", document.id));
            }
        });
        await deleteObject(storageRef(storage, currentItemToDelete));
    } catch (error) {
        console.error('Error deleting image', error);
    }
};

const onContentLoaded = (component) => {
    contentLoaded.value[component] = true;
    if (contentLoaded.value.noteContent && contentLoaded.value.todoList) {
        loading.value = false;
    }
}

</script>

<style scoped></style>