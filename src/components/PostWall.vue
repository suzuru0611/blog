<template>
    <div class="h-screen w-screen bg-postwall-pattern bg-center bg-cover  flex flex-col items-center ">
        <div class="p-2 flex gap-4 rounded-br-xl bg-slate-50/10 absolute top-0 left-0 z-30">
            <div @click.stop="navigateToMainPage" class="cursor-pointer">
                <svg fill="#ffff" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512 512"
                    xml:space="preserve">
                    <g>
                        <g>
                            <path d="M317.959,115.859H210.158V58.365h-44.864L0,223.66l165.294,165.294h44.864V331.46h136.548
                                c67.367,0,122.174,54.807,122.174,122.174H512V309.9C512,202.905,424.953,115.859,317.959,115.859z M468.88,342.412
                                c-30.253-33.206-73.82-54.071-122.174-54.071H167.038v41.378L60.981,223.661l106.057-106.057v41.375h150.921
                                c83.219,0,150.921,67.703,150.921,150.921V342.412z" />
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <div class="w-screen h-screen overflow-y-auto p-4">
            <div class="flex-col flex w-full items-center">
                <div :class="['w-[80%] max-w-[800px] h-[300px] mb-4 bg-white rounded-xl py-10 px-6 flex flex-col transition duration-300 shadow-[0_0_20px_5px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_10px_rgba(0,0,0,0.3)]', { 'transformed-item': currentItem }]"
                    v-for="item in imagesWithText" :key="item.fullPath" @click="setCurrentItem(item)">
                    <div class="text-3xl font-bold">
                        {{ item.title }}
                    </div>
                    <div class="flex-1 my-4 overflow-y-hidden relative">
                        {{ item.text }}
                        <div class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent">
                        </div>

                    </div>
                    <div class="flex items-center justify-end gap-2">
                        <div class="bg-blue-500 rounded-2xl w-7 h-7 flex justify-center items-center text-white">
                            {{ item.userId.slice(0, 1) }}
                        </div>
                        <span>{{ formatDate(item.timestamp, 'MM-DD') }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="currentItem">
        </div>
        <Transition name="fade">
            <div v-if="currentItem" ref="contentRef"
                class="w-[80%] h-auto max-w-[800px] absolute  bg-white rounded-xl py-10 px-6 flex flex-col transition duration-300 shadow-[0_0_20px_5px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_10px_rgba(0,0,0,0.3)]"
                style="left: 50%; top: 50%; transform: translate(-50%, -50%) ;" @click.stop>
                <div class="text-3xl font-bold">
                    {{ currentItem.title }}
                </div>
                <div class="flex-1 py-4 overflow-y-auto xl:max-h-[800px] md:max-h-[500px] sm:max-h-[300px]">
                    {{ currentItem.text }}
                </div>
                <div class="flex items-center justify-end gap-2">
                    <div class="bg-blue-500 rounded-2xl w-7 h-7 flex justify-center items-center text-white">
                        {{ currentItem.userId.slice(0, 1) }}
                    </div>
                    <span>{{ formatDate(currentItem.timestamp, 'MM-DD') }}</span>
                </div>
            </div>
        </Transition>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { db } from "@/services/firebase"; // 引入Firebase配置
import { collection, onSnapshot } from "firebase/firestore"; // 引入Firestore函數
import { getAuth } from 'firebase/auth';
import router from "@/router/rourter";
import { formatDate } from "@/utils/utils.js";
const auth = getAuth();
const imagesWithText = ref([]);
const currentItem = ref(null);
const contentRef = ref(null);

// 列出所屬用戶資料
const getImgListAll = () => {
    // 監聽資料庫變化
    const unsubscribe = onSnapshot(collection(db, "PostWall"), (querySnapshot) => {
        const tempArray = [];
        querySnapshot.forEach((doc) => {
            tempArray.push({
                id: doc.id,
                ...doc.data()
            });
        });
        // 根據需要排序
        tempArray.sort((a, b) => b.timestamp - a.timestamp);
        imagesWithText.value = tempArray;
    });

    // 返回取消訂閱函數，以便在組件卸載時調用
    return unsubscribe;
};

const setCurrentItem = (item) => {
    currentItem.value = item;
};

const handleClickOutside = (event) => {
    if (currentItem.value && contentRef.value && !contentRef.value.contains(event.target)) {
        currentItem.value = null;
    }
};

// 跳轉到PostWall
const navigateToMainPage = () => {
    const currentUser = auth.currentUser;
    router.push({ name: 'MainPage', params: { id: currentUser.uid } });
};

onMounted(() => {
    const unsubscribe = getImgListAll();
    document.addEventListener('click', handleClickOutside, true);
    onUnmounted(() => {
        unsubscribe();
        document.removeEventListener('click', handleClickOutside, true);
    });
});
</script>

<style scoped>
.mask {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.1);
}


.transformed-item {
    transform: translateX(-150%);
}

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