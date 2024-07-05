<template>
    <div class="flex flex-col justify-center mt-4">
        <div v-for="item in imagesWithText" :key="item.url"
            :class="['flex justify-between cursor-pointer  w-full box-border border relative px-3 py-4 mr-[1%] transition duration-300', selectedItem === item ? 'bg-white' : 'hover:bg-white']"
            @click="selectDay(item)">
            <p>{{ formatDate(item.timestamp, "MM-DD") }}</p>
            <button type="button" class="cursor-pointer" @click.stop="openPopup(item.fullPath)">
                <img src="/src/img/delete.svg" width="32" height="32" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps } from 'vue';
import { db } from "@/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { formatDate } from "@/utils/utils.js";
const emit = defineEmits(['selectDay', 'openPopup', 'loaded']);

const loading = ref(false);
const imagesWithText = ref([]);
const selectedItem = ref(null);
const props = defineProps({
    userId: {
        type: String,
        required: true,
    }
});


//列出所屬用戶資料
const getImgListAll = () => {
    // 監聽資料庫變化
    const unsubscribe = onSnapshot(collection(db, "users", props.userId, "userfile"), (querySnapshot) => {
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
        loading.value = false;
    });

    emit('loaded', 'todoList');
    // 返回取消訂閱函數，以便在組件卸載時調用
    return unsubscribe;
};

//選擇日記哪一天
const selectDay = (item) => {
    selectedItem.value = item;
    emit('selectDay', item);
};

//popup刪除傳遞fullpath
const openPopup = (fullPath) => {
    emit('openPopup', fullPath);
};

onMounted(() => {
    const unsubscribe = getImgListAll();
    onUnmounted(() => {
        unsubscribe();
    });
});
</script>