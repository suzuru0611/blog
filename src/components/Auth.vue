<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '../firebaseConfig';
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
  
      const register = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
          console.log('User registered:', userCredential);
          alert('User registered!');
        } catch (error) {
          console.error('Registration error:', error);
          alert(error.message);
        }
      };
  
      const login = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
          console.log('User logged in:', userCredential);
          alert('User logged in!');
        } catch (error) {
          console.error('Login error:', error);
          alert(error.message);
        }
      };
  
      return { email, password, register, login };
    }
  };
  </script>