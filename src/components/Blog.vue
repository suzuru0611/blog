<template>
    <div>
      <h2>Create Blog Post</h2>
      <form @submit.prevent="createPost">
        <input v-model="title" type="text" placeholder="Title" />
        <textarea v-model="content" placeholder="Content"></textarea>
        <button type="submit">Create Post</button>
      </form>
  
      <h2>Blog Posts</h2>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db } from '../firebaseConfig';
  import { collection, addDoc, getDocs } from 'firebase/firestore';
  
  export default {
    setup() {
      const title = ref('');
      const content = ref('');
      const posts = ref([]);
  
      const fetchPosts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'posts'));
          posts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      const createPost = async () => {
        try {
          await addDoc(collection(db, 'posts'), {
            title: title.value,
            content: content.value
          });
          title.value = '';
          content.value = '';
          alert('Post created!');
          fetchPosts(); // 刷新博客文章列表
        } catch (error) {
          console.error('Error creating post:', error);
          alert(error.message);
        }
      };
  
      onMounted(fetchPosts);
  
      return { title, content, posts, createPost };
    }
  };
  </script>