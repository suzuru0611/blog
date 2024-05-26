!<template>
    <div>
        <input type="text" v-model.trim="todo" @keyup.enter="create" />
        <button type="button" @click="create">新增</button>
    </div>
    <div>
        <ul>
            <li v-for="item in todo" :key="item.id">
                <input type="checkbox" :id="item.id" name="todo" v-model="item.status" @change="update(item)" />
                <label :for="item.id">
                    <input type="text" v-model="item.text" />
                    <span>{{ timestampToCustomFormat(item.date) }}</span>
                </label>
                <div>
                    <button type="button" @click.stop="update(item)">編輯</button>
                    <button type="button" @click="remove(item.id)">刪除</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../services/firebase";
const todo = ref("");
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

</script>

<style scoped></style>