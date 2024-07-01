<template>
    <div class="flex w-full flex-col mt-4 mx-auto">
        <div class="mb-4 flex items-center bg-violet-100 p-4">
            <input class="flex-1 mr-5" type="text" v-model.trim="todo" @keyup.enter="create" />
            <button class="border  mr-2 border-violet-400" type="button" @click="create">新增</button>
        </div>
        <div>
            <ul>
                <li v-for="item in todoList" :key="item.id"
                    class="p-4 border-b-2 flex justify-center items-center flex-wrap"
                    :class="{ 'bg-gray-100': item.status }">
                    <!-- <input :id="item.id" name="todo" type="checkbox" v-model="item.status" @change="update(item)"
                        class="h-4 w-4 border-gray-300 mr-2" /> -->

                    <label class="flex-1 flex items-center">
                        <div v-if="item.id == openUpdateId">
                            <input type="text" v-model="item.text" class="border p-2 mr-2 border-violet-400"
                                @keyup.enter="update(item)" />
                            <button type="button" @click.stop="update(item)" class="bg-yellow-200 p-2 mr-2">
                                儲存
                            </button>
                            <button type="button" @click.stop="cancel(item)" class="bg-red-200 p-2 mr-2">
                                取消
                            </button>
                        </div>

                        <span class="p-2 mr-2" v-else>{{ item.text }}</span>

                        <span class="text-sm text-gray-400">
                            {{ timestampToCustomFormat(item.date) }}</span>
                    </label>
                    <div class="flex">
                        <button type="button" @click.stop="openUpdate(item.id, item.text)"
                            class="bg-yellow-400 p-2 mr-2 hidden md:block">
                            編輯
                        </button>
                        <button type="button" class="bg-red-400 p-2 mr-2" @click="remove(item.id)">
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
const todo = ref("");
const todoList = ref([]);
const openUpdateId = ref();
const openUpdateText = ref();

let unsubscribe;

//創建資料
const create = async () => {
    if (!todo.value) {
        return
    }
    try {
        const docRef = await addDoc(collection(db, 'todoList'), {
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
    const lastestQuery = query(collection(db, 'todoList'), orderBy('date', 'desc')); //時間從大到小

    unsubscribe = onSnapshot(lastestQuery, snapshot => { //監聽即時資料更新
        todoList.value = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
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
        await updateDoc(doc(db, 'todoList', todoItem.id), {
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
        await deleteDoc(doc(db, 'todoList', id));
    } catch (err) {
        console.log('error', err);
    }
}
console.log(todoList);

</script>

<style scoped></style>
