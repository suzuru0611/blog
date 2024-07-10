<template>
    <div class="flex w-[80%] h-auto p-5 flex-col mx-auto bg-white sm:w-[40%] ">
        <Loading :isLoading="loading" />
        <div class="mb-4 flex items-center bg-violet-100 p-4">
            <input class="flex-1 mr-5 min-w-[160px]" type="text" v-model.trim="todo" @keyup.enter="create" />
            <button class="flex items-center justify-center rounded-xl gap-1 py-2 bg-blue-500 text-white w-[80px]"
                type="button" @click="create">新增</button>
        </div>
        <div class="max-h-[300px] overflow-y-auto sm:max-h-[350px] xl:max-h-[500px]">
            <ul>
                <li v-for="item in todoList" :key="item.id"
                    class="p-4 border-b-2 flex justify-between items-center flex-wrap"
                    :class="{ 'bg-gray-100': item.status }">
                    <div class="flex items-center">
                        <input :id="item.id" name="todo" type="checkbox" v-model="item.status" @change="update(item)"
                            class="h-4 w-4 border-gray-300 mr-2" />

                        <label class="flex">
                            <div>
                                <input v-if="item.id === openUpdateId" type="text" v-model="item.text"
                                    class="border p-2 mr-2 border-violet-400" @keyup.enter="update(item)"
                                    @blur="update(item)" />
                                <span v-else class="p-2 mr-2 cursor-pointer break-all"
                                    :class="{ 'line-through': item.status }" @click="openUpdate(item.id, item.text)">
                                    {{ item.text }}
                                </span>
                            </div>

                        </label>

                    </div>
                    <div class="w-full text-right">
                        <button type="button" class="bg-red-400 p-2 mr-2 " @click="remove(item.id)">
                            刪除
                        </button>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../services/firebase";
import Loading from '@/components/Loading.vue';

const todo = ref("");
const todoList = ref([]);
const openUpdateId = ref();
const openUpdateText = ref();
const loading = ref(true);
let unsubscribe;
const props = defineProps({
    userId: {
        type: String,
        required: true
    }
})
//創建資料
const create = async () => {
    if (!todo.value) {
        return
    }
    try {
        const docRef = await addDoc(collection(db, 'todoList', props.userId, 'list'), {
            text: todo.value,
            date: new Date().getTime(),
            status: false
        })
        console.log('Document written with ID', docRef.id);
    } catch (error) {
        console.log('Error adding document', error);
    } finally {
        todo.value = '';
    }
}

// 資料讀取
onMounted(async () => { //組件掛載完成時
    loading.value = true;
    const lastestQuery = query(collection(db, 'todoList', props.userId, 'list'), orderBy('date', 'desc')); //時間從大到小
    unsubscribe = onSnapshot(lastestQuery, snapshot => { //監聽即時資料更新
        todoList.value = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        loading.value = false
    });
});

onUnmounted(() => { //組件被銷毀時
    if (unsubscribe) {
        unsubscribe(); // 停止監聽資料
    }
});

const openUpdate = (id, text) => {
    openUpdateId.value = id;
    openUpdateText.value = text;
}

const cancel = item => {
    item.text = openUpdateText.value;
    openUpdateId.value = '';
}

const timestampToCustomFormat = timestamp => {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
}

//修改資料
const update = async todoItem => {
    console.log('update called', todoItem);
    try {
        await updateDoc(doc(db, 'todoList', props.userId, 'list', todoItem.id), {
            text: todoItem.text,
            status: todoItem.status
        });
        openUpdateId.value = '';
    } catch (err) {
        console.log('error', err);
    }
}


//刪除資料
const remove = async id => {
    try {
        await deleteDoc(doc(db, 'todoList', props.userId, 'list', id));
    } catch (err) {
        console.log('error', err);
    }
}
console.log(todoList);

</script>

<style scoped></style>
