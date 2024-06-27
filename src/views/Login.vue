<template>
    <div class="w-full h-screen flex items-center justify-center bg-hero-pattern bg-center bg-cover">
        <div class="w-full h-screen absolute bg-gray-900 opacity-30 z-0">
        </div>
        <div class="flex w-[80%] h-auto rounded-xl overflow-hidden z-30  xl:w-[50%] md:w-[65%]">
            <div class="w-[50%] bg-login-pattern  bg-center bg-cover hidden md:block">
            </div>
            <div class="w-full  flex flex-col items-center justify-center bg-white py-5 md:w-[50%]">
                <img class="w-[80%]" src="@/img/LogoFull.png" alt="">
                <div class="flex gap-3">
                    <div :class="[
                        'border-2 border-blue-500 text-lg font-bold px-3 py-1 rounded-xl transition duration-300',
                        status === 0 ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-400 hover:text-white'
                    ]" @click="status = 0">
                        登入
                    </div>
                    <div :class="[
                        'border-2 border-blue-500 text-lg font-bold px-3 py-1 rounded-xl transition duration-300',
                        status === 1 ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-400 hover:text-white'
                    ]" @click="status = 1">
                        註冊
                    </div>
                </div>
                <SignUp v-if="status === 1" />
                <SignIn v-if="status === 0" />

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";

const status = ref(0)
console.log(status);
</script>

<style scoped></style>