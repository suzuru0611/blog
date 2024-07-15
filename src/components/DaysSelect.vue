<template>
    <div class="flex flex-col justify-center my-4">
        <div class="text-center border text-blue-500 p-5 cursor-pointer transition duration-300 hover:bg-white"
            @click="newPage">
            新增日記
        </div>
        <div v-for="item in imagesWithText" :key="item.url"
            :class="['flex justify-between cursor-pointer  w-full box-border border relative px-3 py-4 mr-[1%] transition duration-300', selectedItem === item ? 'bg-white' : 'hover:bg-white']"
            @click="selectDay(item)">
            <p class="flex-1">{{ item.title }}</p>
            <button type="button" class="cursor-pointer" @click.stop="openPopup(item)">
                <img src="/src/img/delete.svg" width="32" height="32" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps } from 'vue';
import { db } from "@/services/firebase";
import { collection, onSnapshot, getDocs, deleteDoc, doc } from "firebase/firestore";
import { usePopupStore } from '@/store/popup02';
import {
    ref as storageRef,
    deleteObject
} from "firebase/storage";
const popupStore = usePopupStore();
const openPopup = (item) => {
    popupStore.showPopup('刪除日記', `您確定要刪除嗎？`, async () => {
        try {
            const docRef = collection(db, "users", props.userId, "userfile");
            const querySnapshot = await getDocs(docRef);
            querySnapshot.forEach(async (document) => {
                if (document.data().fullPath === item.fullPath) {
                    await deleteDoc(doc(db, "users", props.userId, "userfile", document.id));
                }
            });
            await deleteObject(storageRef(storage, item.fullPath));
        } catch (error) {
            console.error('Error deleting image', error);
        }
    });
};


const loading = ref(false);
const imagesWithText = ref([]);
const selectedItem = ref(null);
const emit = defineEmits(['selectDay', 'openPopup', 'loaded', 'newPage']);
const props = defineProps({
    userId: {
        type: String,
        required: true,
    }
});


const newPage = () => {
    emit('newPage')
}

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

onMounted(() => {
    const unsubscribe = getImgListAll();
    onUnmounted(() => {
        unsubscribe();
    });
});
</script>
