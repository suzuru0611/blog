<template>
    <div class="relative">
        <div class="w-full h-screen flex items-center justify-center bg-hero-pattern bg-center bg-cover">
            <SidePanel :isSidebarOpen="isSidebarOpen" @closeSidebar="closeSidebar" @sideStatus="sideStatus" />
            <SideDayList :isSideDayListOpen="isSideDayListOpen" :userId="userId" @selectDay="selectDay"
                @closeSidebar="closeSidebar" />

            <div class="p-2 flex gap-4 rounded-br-xl bg-slate-50/10 absolute top-0 left-0 z-30">
                <div class="cursor-pointer">
                    <svg @click="isSidebarOpen = true" fill="#ffffff" height="30px" width="30px"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M3 6h18c.552 0 1-.448 1-1s-.448-1-1-1H3C2.448 4 2 4.448 2 5s.448 1 1 1zm18 5H3c-.552 0-1 .448-1 1s.448 1 1 1h18c.552 0 1-.448 1-1s-.448-1-1-1zm0 6H3c-.552 0-1 .448-1 1s.448 1 1 1h18c.552 0 1-.448 1-1s-.448-1-1-1z" />
                    </svg>
                </div>
                <div class="cursor-pointer block md:hidden">
                    <svg @click="isSideDayListOpen = true" viewBox="0 0 24 24" fill="white" width="30" height="30"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H9V4h10v16z" />
                        <path
                            d="M7 4v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2zm-2 0H5v16h1V4z" />
                        <path d="M11 8h6v1h-6zM11 11h6v1h-6zM11 14h6v1h-6zM11 17h6v1h-6z" />
                    </svg>
                </div>
            </div>
            <Loading :isLoading="loading" />
            <div class="w-full h-screen absolute bg-gray-900 opacity-30 z-0">
            </div>
            <div class="flex w-[90%] h-[80%] rounded-xl overflow-hidden z-30 xl:w-[60%] xl:h-[80%]">
                <div class="w-[50%] bg-gray-100 hidden p-5  md:block">
                    <div class="flex gap-3 items-center">
                        <div :class="[
                'cursor-pointer border-2 border-blue-500 text-lg font-bold px-3 py-1 rounded-xl transition duration-300',
                status === 0 ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-400 hover:text-white'
            ]" @click="status = 0">
                            我的日記
                        </div>
                        <div :class="[
                'cursor-pointer border-2 border-blue-500 text-lg font-bold px-3 py-1 rounded-xl transition duration-300',
                status === 1 ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-400 hover:text-white'
            ]" @click="status = 1">待辦事項</div>
                        <div title='公共聊天室🔍💬'>
                            <svg class="cursor-pointer hover:fill-blue-300		duration-300" @click="status = 3"
                                fill="#3B82F6" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 502.664 502.664">
                                <path
                                    d="M139.498,336.181H43.4c-17.084,0-31.148,15.725-31.148,35.052v96.378c0,19.306,14.064,35.053,31.148,35.053h96.098c17.084,0,31.083-15.747,31.083-35.053v-96.378C170.603,351.906,156.582,336.181,139.498,336.181z" />
                                <path
                                    d="M91.395,326.409c33.154,0,59.924-26.769,59.924-59.837S124.55,206.67,91.395,206.67c-33.068,0-59.794,26.791-59.794,59.837C31.58,299.64,58.327,326.409,91.395,326.409z" />
                                <path
                                    d="M459.264,336.181h-96.055c-17.062,0-31.083,15.725-31.083,35.052v96.378c0,19.306,14.021,35.053,31.083,35.053h96.055c17.149,0,31.148-15.747,31.148-35.053v-96.378C490.412,351.906,476.391,336.181,459.264,336.181z" />
                                <path
                                    d="M351.366,266.55c0,33.068,26.769,59.837,59.794,59.837c33.133,0,59.924-26.769,59.924-59.837s-26.791-59.859-59.924-59.859C378.136,206.67,351.366,233.461,351.366,266.55z" />
                                <path
                                    d="M262.84,186.523c74.764-3.775,133.631-43.961,133.631-93.056C396.471,41.847,331.478,0,251.321,0s-145.15,41.847-145.15,93.445c0,42.818,44.781,78.82,105.783,89.885l-28.517,52.482L262.84,186.523z" />
                            </svg>
                        </div>
                    </div>

                    <div class="h-full overflow-auto">
                        <DaysSelect @newPage="newPage" @loaded="onContentLoaded" @openPopup="openPopup"
                            @selectDay="selectDay" :userId="userId" />
                    </div>
                </div>
                <div class="w-full  flex flex-col items-center  bg-white p-5 md:w-[50%]">
                    <NoteContent ref="noteContentRef" @resetContent="selectDayItem = $event" @loaded="onContentLoaded"
                        :selectDayItem="selectDayItem" :userId="userId" />
                </div>
            </div>

        </div>
        <!-- 待辦事項 -->
        <Transition name="fade">
            <div v-if="status === 1" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <TodoList v-if="status === 1" :userId="userId" @openPopup="openPopup" class="z-30" />
                <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="closePopup"></div>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="status === 3" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <Chat :userId="userId" v-if="status === 3" class="z-30" />
                <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="closePopup"></div>
            </div>
        </Transition>

        <Popup />
        <!-- 日記刪除popup -->
        <Transition name="fade">
            <div v-if="popupVisible" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
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
                        <button @click="closePopup"
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                            取消
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";

import NoteContent from "@/components/NoteContent.vue";
import DaysSelect from "@/components/DaysSelect.vue";
import TodoList from "@/components/TodoList.vue";
import Loading from '@/components/Loading.vue';
import Chat from "@/components/ChatComponents/Chat.vue";
import SidePanel from "@/components/SidePanel.vue";
import SideDayList from "@/components/SideDayList.vue";
import Popup from "@/components/Popup.vue";

let currentItemToDelete = null;
const isSidebarOpen = ref(false)
const isSideDayListOpen = ref(false)
const selectDayItem = ref(null)
const popupVisible = ref(false);
const status = ref(0)
const noteContentRef = ref(null)
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

const newPage = () => {
    if (noteContentRef.value) {
        noteContentRef.value.newPage()
    }
}

const sideStatus = (value) => {
    status.value = value
    isSidebarOpen.value = false

}

const closeSidebar = () => {
    isSidebarOpen.value = false
    isSideDayListOpen.value = false
}

const selectDay = (item) => {
    selectDayItem.value = item
    console.log(selectDayItem);
    isSideDayListOpen.value = false

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




const onContentLoaded = (component) => {
    contentLoaded.value[component] = true;
    if (contentLoaded.value.noteContent && contentLoaded.value.todoList) {
        loading.value = false;
    }
}

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