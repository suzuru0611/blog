<template>
    <div class="flex flex-col justify-center mt-4">
        <div v-for="item in imagesWithText" :key="item.url"
            :class="['flex justify-between w-full box-border border relative px-3 py-4 mr-[1%] transition duration-300', selectedItem === item ? 'bg-white' : 'hover:bg-white']"
            @click="selectDay(item)">
            <p>{{ formatDate(item.timestamp) }}</p>
            <button type="button" class="cursor-pointer" @click.stop="openPopup(item.fullPath)">
                <img src="/src/img/delete.svg" width="32" height="32" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { db } from "@/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const emit = defineEmits(['selectDay', 'openPopup']);

const loading = ref(false);
const imagesWithText = ref([]);
const selectedItem = ref(null);

const getImgListAll = () => {
    loading.value = true;

    // 監聽資料庫變化
    const unsubscribe = onSnapshot(collection(db, "images"), (querySnapshot) => {
        const tempArray = [];
        querySnapshot.forEach((doc) => {
            // 將文檔 ID 加入到資料中
            tempArray.push({
                id: doc.id,
                ...doc.data()
            });
        });
        // 根據需要排序
        tempArray.sort((a, b) => b.timestamp - a.timestamp);
        imagesWithText.value = tempArray;
        console.log('Images with IDs:', imagesWithText.value); // 確認是否包含 ID
        loading.value = false;
    });

    // 返回取消訂閱函數，以便在組件卸載時調用
    return unsubscribe;
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const selectDay = (item) => {
    selectedItem.value = item;
    emit('selectDay', item);
};

const openPopup = (fullPath) => {
    emit('openPopup', fullPath);
};

onMounted(() => {
    const unsubscribe = getImgListAll();

    // 组件卸载时取消订阅
    onUnmounted(() => {
        unsubscribe();
    });
});
</script>