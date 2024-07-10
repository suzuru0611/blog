<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-40" v-if="isSideDayListOpen"
        @click="closeSidebar"></div>
    <aside
        :class="['transform z-50 top-0 left-0 w-[80%] sm:w-[400px] bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 ', isSideDayListOpen ? 'translate-x-0' : '-translate-x-full']">
        <div v-for="item in imagesWithText" :key="item.url"
            :class="['flex justify-between cursor-pointer  w-full box-border border relative px-3 py-4 mr-[1%] transition duration-300', selectedItem === item ? 'bg-white' : 'hover:bg-white']"
            @click="selectDay(item)">
            <p class="flex-1">{{ item.title }}</p>
            <button type="button" class="cursor-pointer" @click.stop="openPopup(item.fullPath)">
                <img src="/src/img/delete.svg" width="32" height="32" />
            </button>
        </div>
    </aside>

</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps } from 'vue';
import { db } from "@/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
const emit = defineEmits(['selectDay', 'openPopup', 'loaded', 'closeSidebar']);
const imagesWithText = ref([]);
const selectedItem = ref(null);


const closeSidebar = () => {
    emit('closeSidebar', false);
};

const props = defineProps({
    isSideDayListOpen: {
        Type: Boolean,
        required: true,
    },
    userId: {
        Type: String,
        required: true,
    },

})

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
    });

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

<style>
/* Add your custom styles here */
</style>