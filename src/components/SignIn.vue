<template>
    <div class="w-[90%] h-[80%]">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4 ">
                <label class="block text-gray-700 text-lg font-bold mb-2" for="email">
                    帳號
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="text" placeholder="請輸入你的email" v-model="email"
                    :class="{ 'border-red-500': errMsg }" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-lg font-bold mb-2" for="password">
                    密碼
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************" v-model="password"
                    :class="{ 'border-red-500': errMsg }" />
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 flex items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="signIn">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 256 256" width="16px" height="16px" enable-background="new 0 0 24 24"
                        xml:space="preserve" class="mr-1">
                        <g>
                            <g>
                                <g>
                                    <path fill="#ffffff" d="M126.6,20.4c-0.4,0.2-1.2,4.8-2.4,13.4c-3.3,25.3-5.9,39-9.8,50.5c-6,17.9-14.9,28.6-29.9,36
                    c-12.1,6-28.5,9.7-60.7,13.9C10.9,136,10,136.2,10,138c0,1.8,0.9,2.1,10.1,3.2c48.2,6.1,66.4,11.8,79.6,25
                    c12.9,12.9,18.6,30.6,24.5,75.9c1.7,12.9,1.9,13.8,3.7,13.8s2.1-0.9,3.5-12.1c6-46.8,11.7-64.6,24.8-77.6
                    c13.2-13.2,31.4-18.9,79.6-25c9.2-1.2,10.1-1.5,10.1-3.2c0-1.8-0.9-2-13.8-3.7c-25-3.2-38.4-5.9-49.6-9.5
                    c-18.5-6-29.3-14.8-36.7-29.7c-6.3-12.7-9.9-28.5-14.4-62.9c-1-7.5-1.7-11.4-2.1-11.7
                    C128.5,19.9,127.5,19.9,126.6,20.4z" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    登入
                </button>
                <div class="text-red-500 text-xs italic" v-if="errMsg">
                    {{ errMsg }}

                </div>
            </div>
        </form>

    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const email = ref('');
const password = ref('');
const errMsg = ref('');
const emit = defineEmits(['loaded']);

const auth = getAuth();
const signIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;

        })
        .catch((error) => {
            console.log('Firebase Auth Error:', error.code);
            if (error.code === 'auth/invalid-email') {
                errMsg.value = 'Email錯誤';
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errMsg.value = '尋找不到用戶';
            } else {
                errMsg.value = '登入失敗，請稍後再試';
            }
        });
};

</script>

<style scoped></style>