<template>
   <div class="container mt-4">
    <h1>Listado</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
            <th> <button @click="addPost()" class="btn btn-primary">Agregar</button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>
              <button class="btn btn-primary" @click="editPost(post.id)">Editar</button>
              <button class="btn btn-danger"  @click="removePost(post.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { deletePost, getPosts } from '../services/postService'; // Asegúrate de que esta ruta sea correcta
const posts = ref([]);
const router = useRouter();


onMounted(() => { 
  fetchPosts();
});

const fetchPosts = async () => {
  try {
    const response = await getPosts();
    posts.value = response.data;
  } catch (error) {
    console.error('error listado', error);
  }
};
const addPost = () => {
  router.push('/create');
};
const editPost = (id) => {
  router.push(`/edit/${id}`);
};

const removePost = async (id) => {
  try {
    await deletePost(id);
    posts.value = posts.value.filter(post => post.id !== id);
    alert('Post eliminado');
    // Refrescar la lista de posts después de eliminar
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};


</script>