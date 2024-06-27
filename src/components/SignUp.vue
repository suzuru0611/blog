<template>
    <div class="w-[90%] h-[80%]">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-lg font-bold mb-2" for="email">
                    帳號
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="text" placeholder="email" v-model="email" :class="{ 'border-red-500': errMsg }" />
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
                    class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="signUp">
                    <svg fill="#ffff" height="16" width="16" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512" xml:space="preserve" class="mr-1">
                        <g>
                            <g>
                                <path d="M403.255,0l-78.591,78.591H0V512h433.409V187.338L512,108.747L403.255,0z M391.466,470.057h-41.943v-41.943h41.943
        V470.057z M391.466,386.172h-83.886v83.886H41.943V120.534h240.778L156.557,246.698L129.371,382.63l135.932-27.186L391.466,229.28
        V386.172z M192.05,283.097l36.852,36.852l-46.066,9.213L192.05,283.097z M264.851,296.58l-49.43-49.43l128.52-128.518
        l49.428,49.43L264.851,296.58z M423.025,138.406l-49.428-49.431l29.658-29.658l49.43,49.43L423.025,138.406z" />
                            </g>
                        </g>
                    </svg>
                    註冊
                </button>
                <p class="text-red-500 text-xs italic" v-if="errMsg">
                    {{ errMsg }}
                </p>
            </div>
        </form>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');
const password = ref('');
const errMsg = ref('');

const auth = getAuth();
const signUp = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log('123');

            // Signed up 
            const user = userCredential.user;
            // 註冊成功 跳轉至其他頁面
            setTimeout(() => {
                router.push('/SignIn');
            }, 400);
        })
        .catch((error) => {
            // 錯誤訊息
            console.log('error', error);

            if (error.code === 'auth/missing-password') {
                errMsg.value = '請輸入密碼';
            } else if (error.code === 'auth/invalid-email') {
                errMsg.value = '請輸入Email';
            } else if (error.code === 'auth/email-already-in-use') {
                errMsg.value = 'Email已被使用';
            } else if (error.code === 'auth/weak-password') {
                errMsg.value = '密碼請輸入至少六碼';
            }
            else {
                errMsg.value = '登入失敗，請稍後再試';
            }

        });

}
</script>

<style scoped></style>