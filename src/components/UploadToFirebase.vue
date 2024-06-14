<template>
    <div>
        <p>圖片上傳</p>
        <div class="flex border border-violet-400 bg-gray-200 p-5 justify-between items-center rounded-lg">
            <input type="file" class="block text-sm focus:outline-none" accept="image/*" @change="handleFileSelect"
                ref="fileInput" />
            <button type="button" class="border p-2 bg-violet-400 text-white" @click="upload">上傳</button>
        </div>
        <div class="min-h-[300px] border-2 border-dashed p-2 mt-5 border-violet-400 flex justify-center items-center">
            <div v-if="uploadProgress !== null">
                <progress :value="uploadProgress" max="100">
                </progress>
                {{ uploadProgress }}%

            </div>
            <p v-if="downloadURL">
                <img :src="downloadURL" />
            </p>
            <p v-else>圖片顯示於此</p>
        </div>
        <div class="flex flex-wrap justify-center mt-4 max-h-[500px] ">
            <p class="w-full">照片清單</p>
            <p v-if="loading">Loadig...</p>
            <div v-else v-for="item in downloadURLs" class="w-[24%] box-border border relative p-2 mr-[1%]">
                <img :src="item.url" alt="" :key="item.url" class="object-cover w-full h-full" />

                <button type="button" class="absolute cursor-pointer right-3 top-0.5" @click="removeImg(item.fullPath)">
                    <img src="/src/img/delete.svg" width="32" height="32" />
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { nextTick, ref, onMounted } from "vue";
import { storage } from "../services/firebase";
import {
    ref as storageRef,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
    deleteObject
} from "firebase/storage";

const selectedFile = ref();
const uploadProgress = ref(null);
const loading = ref(false);

const fileInput = ref(null);
const downloadURL = ref();
const downloadURLs = ref([]);

const handleFileSelect = (event) => {
    selectedFile.value = event.target.files[0];
};

const upload = async () => {

    if (!selectedFile.value) {
        return;
    }

    const storageName = storageRef(storage, `images/${selectedFile.value.name}`);
    const uploadTask = uploadBytesResumable(storageName, selectedFile.value);

    uploadTask.on(
        'state_changed',
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            console.log('Upload state ', snapshot.state);
            uploadProgress.value = parseInt(progress);

        },
        error => {
            console.log('Upload error', error);
        },
        async () => {
            downloadURL.value = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL.value);
            uploadProgress.value = null;
            selectedFile.value = '';
            fileInput.value.value = '';
            getImgListAll();
        }
    )
};

const getImgListAll = async () => {
    loading.value = true;
    await nextTick();
    downloadURLs.value = [];
    const listRef = storageRef(storage, 'images');
    try {
        const res = await listAll(listRef);
        const urls = await Promise.all(
            res.items.map(async itemRef => ({
                url: await getDownloadURL(itemRef),
                fullPath: itemRef.fullPath
            }))
        );
        downloadURLs.value = urls;
    } catch (error) {
        console.error('Error getting download URLs', error);
    } finally {
        loading.value = false;
    }
};
const removeImg = async fullPath => {
    try {
        await deleteObject(storageRef(storage, fullPath));
        await getImgListAll();
    } catch (error) {
        console.error('Error deleting image', error);
    }
};
onMounted(() => {
    getImgListAll();
});
</script>