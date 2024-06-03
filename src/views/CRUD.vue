<template>

</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const email = ref('');
const password = ref('');
const errMsg = ref('');


</script>

<style scoped></style>