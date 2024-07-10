<template>
    <div class="h-full w-full">
        <div class="flex-col justify-between h-[30px]">
            <div class="text-[12px] text-end w-full text-gray-400">
                {{ formatDate(timestamp, 'YYYY-MM-DD') }}
            </div>
            <div class="flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <input class="w-[100%] text-ellipsis" v-if="titleData" type="text" v-model="titleData"
                    @blur="upload(false)">
            </div>
        </div>
        <div
            class="h-[30%] w-full border-2 border-dashed mt-5 border-violet-400 flex justify-center overflow-hidden items-center relative  ">
            <div type="button"
                class="border-t-2 border-l-2 z-30  cursor-pointer  border-dashed border-violet-400 rounded-tl-lg absolute right-0 bottom-0 bg-white p-3"
                @click="triggerFileInput">
                <svg fill="#4662be" height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487 487">
                    <g>
                        <g>
                            <path
                                d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z" />
                        </g>
                    </g>
                </svg>
            </div>
            <div class="trasition duration-700 hover:scale-150">
                <img v-if="previewImage !== defaultImage" :src="previewImage" alt="Preview Image">
                <img v-else-if="props.selectDayItem && props.selectDayItem.url" :src="props.selectDayItem.url"
                    alt="Selected Image">
                <img v-else :src="defaultImage" alt="Default Image">
            </div>
        </div>
        <div class="w-full content">
            <textarea type="text" v-model="textData" placeholder="今天的心情...."
                class="block h-full w-full text-md focus:outline-none mt-3" />
            <div class="flex items-between mt-3">
                <div :class="['flex-1', uploadProgress != null ? 'block' : 'invisible']">
                    <progress :value="uploadProgress" max="100"></progress>
                    {{ uploadProgress }}%
                </div>
                <div class="flex gap-2">
                    <div v-if="props.selectDayItem" type="button"
                        class="flex items-center cursor-pointer justify-center rounded-xl gap-1 py-2 bg-[#6a5acd]  text-white w-auto p-3 text-md trasition duration-300 hover:bg-[#7a6fc2]"
                        @click="upload">
                        分享日記
                        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 5.75C3 4.23122 4.23122 3 5.75 3H15.7145C16.5764 3 17.4031 3.34241 18.0126 3.9519L20.0481 5.98744C20.6576 6.59693 21 7.42358 21 8.28553V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H6V14.25C6 13.0074 7.00736 12 8.25 12H15.75C16.9926 12 18 13.0074 18 14.25V19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V8.28553C19.5 7.8214 19.3156 7.37629 18.9874 7.0481L16.9519 5.01256C16.6918 4.75246 16.3582 4.58269 16 4.52344V7.25C16 8.49264 14.9926 9.5 13.75 9.5H9.25C8.00736 9.5 7 8.49264 7 7.25V4.5H5.75ZM16.5 19.5V14.25C16.5 13.8358 16.1642 13.5 15.75 13.5H8.25C7.83579 13.5 7.5 13.8358 7.5 14.25V19.5H16.5ZM8.5 4.5V7.25C8.5 7.66421 8.83579 8 9.25 8H13.75C14.1642 8 14.5 7.66421 14.5 7.25V4.5H8.5Z"
                                fill="#ffffff" />
                        </svg>
                    </div>
                    <div v-if="props.selectDayItem" type="button"
                        class="flex items-center cursor-pointer justify-center rounded-xl gap-1 py-2 bg-[#6a5acd] text-white w-auto p-3 text-md trasition duration-300 hover:bg-[#7a6fc2]"
                        @click="upload">
                        儲存
                        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 5.75C3 4.23122 4.23122 3 5.75 3H15.7145C16.5764 3 17.4031 3.34241 18.0126 3.9519L20.0481 5.98744C20.6576 6.59693 21 7.42358 21 8.28553V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H6V14.25C6 13.0074 7.00736 12 8.25 12H15.75C16.9926 12 18 13.0074 18 14.25V19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V8.28553C19.5 7.8214 19.3156 7.37629 18.9874 7.0481L16.9519 5.01256C16.6918 4.75246 16.3582 4.58269 16 4.52344V7.25C16 8.49264 14.9926 9.5 13.75 9.5H9.25C8.00736 9.5 7 8.49264 7 7.25V4.5H5.75ZM16.5 19.5V14.25C16.5 13.8358 16.1642 13.5 15.75 13.5H8.25C7.83579 13.5 7.5 13.8358 7.5 14.25V19.5H16.5ZM8.5 4.5V7.25C8.5 7.66421 8.83579 8 9.25 8H13.75C14.1642 8 14.5 7.66421 14.5 7.25V4.5H8.5Z"
                                fill="#ffffff" />
                        </svg>
                    </div>
                    <div v-else type="button"
                        class="flex items-center cursor-pointer justify-center rounded-xl gap-1 py-2 bg-[#6a5acd] text-white w-auto p-3 text-md trasition duration-300 hover:bg-[#7a6fc2]"
                        @click="upload(false)">
                        新增日記
                        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 5.75C3 4.23122 4.23122 3 5.75 3H15.7145C16.5764 3 17.4031 3.34241 18.0126 3.9519L20.0481 5.98744C20.6576 6.59693 21 7.42358 21 8.28553V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H6V14.25C6 13.0074 7.00736 12 8.25 12H15.75C16.9926 12 18 13.0074 18 14.25V19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V8.28553C19.5 7.8214 19.3156 7.37629 18.9874 7.0481L16.9519 5.01256C16.6918 4.75246 16.3582 4.58269 16 4.52344V7.25C16 8.49264 14.9926 9.5 13.75 9.5H9.25C8.00736 9.5 7 8.49264 7 7.25V4.5H5.75ZM16.5 19.5V14.25C16.5 13.8358 16.1642 13.5 15.75 13.5H8.25C7.83579 13.5 7.5 13.8358 7.5 14.25V19.5H16.5ZM8.5 4.5V7.25C8.5 7.66421 8.83579 8 9.25 8H13.75C14.1642 8 14.5 7.66421 14.5 7.25V4.5H8.5Z"
                                fill="#ffffff" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <input type="file" class="hidden" accept="image/*" @change="handleFileSelect" ref="fileInput" />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits, defineExpose } from 'vue';
import { storage, db } from "@/services/firebase"; // 引入Firebase配置
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"; // 引入Firestore函數
import { v4 as uuidv4 } from 'uuid'; // 引入UUID
import { formatDate } from "@/utils/utils.js";

const selectedFile = ref(null);
const downloadURL = ref(null);
const titleData = ref(formatDate(new Date(), 'MM-DD'));
const uploadProgress = ref(null);
const textData = ref(''); // 存儲文字描述
const defaultImage = '/src/img/sample.jpeg'; // 預設圖片路徑
const previewImage = ref(defaultImage); // 圖片預覽地址，預設為預設圖片
const emit = defineEmits(['loaded', 'resetContent']);
const timestamp = ref('')
const fileInput = ref(null);
const props = defineProps({
    selectDayItem: {
        type: Object,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    }
});



const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileSelect = (event) => {
    selectedFile.value = event.target.files[0];
    previewImage.value = URL.createObjectURL(selectedFile.value); // 设置预览图片地址
};

const defaulthandleFileSelect = async () => {
    const url = defaultImage;
    const response = await fetch(url);
    const blob = await response.blob();
    const mimeType = blob.type || 'image/jpeg'; // 获取 Blob 的 MIME 类型或使用默认类型
    const file = new File([blob], 'defaultImage.jpeg', { type: mimeType });
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
};

const newPage = () => {
    console.log('eeeeeeeee33333');
    titleData.value = formatDate(new Date(), "YYYY-MM-DD");
    emit('resetContent', null)
    console.log(props.selectDayItem);
}

defineExpose({
    newPage
})

const upload = async (shouldClearState = true) => {
    let downloadURLValue = downloadURL.value;
    let storageName; // 在此定义 storageName

    if (selectedFile.value) {
        // 处理文件上传逻辑
        const fileExtension = selectedFile.value.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        storageName = storageRef(storage, `images/${props.userId}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageName, selectedFile.value);

        await new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadProgress.value = parseInt(progress);
                },
                error => {
                    console.log('Upload error', error);
                    reject(error);
                },
                async () => {
                    downloadURLValue = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve();
                }
            );
        });
    }

    // 准备更新的数据对象
    let updatedData = {
        title: titleData.value,
        text: textData.value,
        url: downloadURLValue || (props.selectDayItem && props.selectDayItem.url),
    };

    if (storageName) {
        updatedData.fullPath = storageName.fullPath;
    }

    if (props.selectDayItem && props.selectDayItem.id) {
        // 更新现有文档
        const docRef = doc(db, "users", props.userId, "userfile", props.selectDayItem.id);
        await updateDoc(docRef, updatedData);
    } else {
        // 创建新文档
        updatedData.title = titleData ? titleData.value : new Date().getTime(); // 抓預設獲選取的圖片
        updatedData.url = downloadURLValue || props.selectDayItem.url; // 抓預設獲選取的圖片
        updatedData.timestamp = new Date().getTime(); // 設置為當前時間
        await addDoc(collection(db, "users", props.userId, "userfile"), updatedData);
    }
    uploadProgress.value = null;

    // 根据参数是否清理状态
    if (shouldClearState) {
        fileInput.value.value = '';
        titleData.value = formatDate(new Date(), "YYYY-MM-DD");
        previewImage.value = defaultImage;
    }
};

watch(() => props.selectDayItem, (newVal) => {
    if (newVal) {
        previewImage.value = newVal.url; // 如果有 URL，則設置預覽圖像為該 URL
        textData.value = newVal.text || '';
        titleData.value = newVal.title || formatDate(newVal.timestamp, "YYYY-MM-DD");
        timestamp.value = newVal.timestamp// 如果 newVal.text 是空的，也將 textData 設置為空字符串
    } else {
        previewImage.value = defaultImage; // 如果沒有 URL，則設置預覽圖像為預設圖像
        textData.value = '';
        timestamp.value = new Date()// 如果 newVal 是空的，也將 textData 設置為空字符串
    }
}, { immediate: true });

onMounted(() => {
    emit('loaded', 'noteContent')
    defaulthandleFileSelect();

    // 在組件加載時執行的初始化操作
});
</script>
<style>
.content {
    height: calc(70% - 116px);
}


.inputTitleLength {
    position: relative;
    width: auto;
    min-width: 3em;
    min-height: 20px;
    max-width: 80%;
    padding: .8em .3em .8em 0;
    font-size: large;
    line-height: 1.8;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow: clip;
    user-select: all;
    -webkit-text-stroke: .3px #ccc;
    cursor: pointer;

}
</style>