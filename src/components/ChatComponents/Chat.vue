!<template>
    <div class='flex flex-col w-[80%] p-6 relative bg-white sm:w-[40%]' ref="messageCotent">
        <!-- 輸入框 -->
        <div class="flex flex-wrap items-center p-2 sticky-top-0 bg-gray-200">
            <label for="fileInput">
                <img src="/src/img/file.png" alt="file">
            </label>
            <input type="file" ref="fileInput" id="fileInput" accept="image/*" @change="handleFileSelect"
                class="hidden" />
            <input type="text" class="border p-1 flex-1 min-w-[75px] mx-1" v-model.trim="message"
                @keyup.enter="addMessage" placeholder="輸入訊息" />
            <button class="border p-2 bg-green-400 text-white" type="button" @click="addMessage">
                送出
            </button>
            <div v-if="uploadProgress !== null" class="w-full">
                <progress :value="uploadProgress" max="100" class="w-[90%]">
                </progress>
                {{ uploadProgress }}%
            </div>
        </div>
        <!-- 留言內容 -->
        <div class="mt-6 mx-2 h-[300px] overflow-y-auto sm:h-[500px]">
            <div class="flex mb-3 gap-2" v-for="(item, key) in chatroom" :key="key"
                :class="{ 'flex-row-reverse': item.username === userId }">
                <div class="bg-blue-500 rounded-2xl w-8 h-8 mt-1 flex justify-center items-center text-white"
                    v-if="item.username !== userId">
                    <span>{{ item.username.slice(0, 1) }}</span>
                </div>
                <div class="max-w-[66.6%]">
                    <div :class="{ 'text-right': item.username === userId, 'text-left': item.username === userId }">
                        <small class="text-grat-500 ml-2">
                            {{ formatDate(item.time, 'YYYY-MM-DD') }}
                            {{ new Date(item.time).toLocaleTimeString() }}
                        </small>
                    </div>
                    <div class="p-2 mt-2 rounded-lg w-auto" :class="{
                'bg-blue-500 text-white': item.username === userId,
                'bg-gray-100': item.username !== userId
            }">
                        <p class="break-all" v-if="item.type === 'text'">{{ item.message }}</p>
                        <img v-else-if="item.type === 'image'" :src="item.message" alt="image" class="max-w-[150px]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { db } from '@/services/firebase.js';
import { storage } from '@/services/firebase.js';
import { formatDate } from "@/utils/utils.js";
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import { onMounted, onUnmounted, ref, inject, nextTick } from 'vue';
const props = defineProps({
    userId: String,
});

const isLoading = ref(true);
const fileInput = ref(null);
const message = ref('');
const chatroom = ref([]);
const uploadProgress = ref(null);
let unsubscribe;

const addMessage = async () => {
    if (!message.value.trim()) { // 確保至少一個字
        return;
    }
    try {
        console.log(message.value);
        console.log(props.userId);
        const docRef = await addDoc(collection(db, 'messages'), {
            message: message.value,
            username: props.userId,
            time: Date.now(),
            type: 'text',
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    } finally {
        message.value = '';
    }
};

const handleFileSelect = (event) => {
    const file = event.target.files[0]; // 抓取file

    if (file && file.size > 2 * 1024 * 1024) {
        alert('文件大小超過2MB，請重新上傳');
        fileInput.value.value = '';
        return;
    }
    uploadImage(file);
};

const uploadImage = async (file) => {
    const storageName = storageRef(storage, `images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageName, file);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadProgress.value = parseInt(progress);
        },
        (error) => {
            console.error('Upload failed:', error);
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // 將 downloadURL 存到 Firestore 的訊息中
            uploadProgress.value = null;
            fileInput.value.value = '';
            await addDoc(collection(db, 'messages'), {
                message: downloadURL,
                username: props.userId,
                time: Date.now(),
                type: 'image',
            });
            await nextTick();
        }
    );
};

onMounted(async () => {
    const lastestQuery = query(collection(db, 'messages'), orderBy('time', 'desc'));

    unsubscribe = onSnapshot(
        lastestQuery,
        (snapshot) => {
            chatroom.value = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            isLoading.value = false;
        },
        (error) => {
            console.error('Error getting documents: ', error);
        }
    );
});
onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe();
    }
});


</script>

<style scoped></style>