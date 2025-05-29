<template>
   <div class="container mt-4">
    <h2>Formulario</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label" for="title">Título</label>
        <input id="title" v-model="form.title" type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="body">Cuerpo</label>
        <textarea id="body" v-model="form.body" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import { createPost, getPostById, updatePost } from '../services/postService';

const router = useRouter();
const route = useRoute();

const form = ref({
  title: '',
  body: ''
});
const isEdit = ref(false);

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true;
    fetchPost(route.params.id);
  }
});

const fetchPost = async (id) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    form.value = response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

const submitForm = async () => {
    // Validar que los campos no estén vacíos
    if (!form.value.title.trim() || !form.value.body.trim()) {
    alert('Por favor, completa todos los campos antes de guardar.');
    return;
  }
  try {
    if (isEdit.value) {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`, form.value);
      alert('Post actualizado');
    } else {
      await axios.post('https://jsonplaceholder.typicode.com/posts', form.value);
      alert('Post creado');
    }
   // router.push('/');
  } catch (error) {
    console.error('Error al guardar', error);
  }
};
</script>