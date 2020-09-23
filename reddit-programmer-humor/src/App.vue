<template>
  <h1>Programmer Humor</h1>
  <div v-for="post in posts" :key="post.id" class="post">
    <a :href="post.url">
      <h3>{{post.title}}</h3>
      <img v-if="post.image" :src="post.image" />
    </a>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const posts = ref([]);

    async function getPosts() {
      const response = await fetch('https://www.reddit.com/r/ProgrammerHumor.json');
      const json = await response.json();
      posts.value = json.data.children.map((child) => ({
        id: child.data.id,
        url: `https://www.reddit.com/${child.data.permalink}`,
        title: child.data.title,
        image: child.data.url,
      }));
    }
    getPosts();

    return {
      posts,
    };
  }
}
</script>

<style>
body {
  font-family: sans-serif;
  font-size: 2rem;
  text-align: center;
}

.post {
  width: 80%;
  margin: 1rem auto;
  border: 2px solid grey;
  border-radius: 10px;
  padding: 2rem;
}

.post img {
  max-width: 100%;
  max-height: 400px;
}
</style>
