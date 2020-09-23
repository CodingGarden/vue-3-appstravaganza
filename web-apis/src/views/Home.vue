<template>
  <div class="home">
    <h1>Welcome home!</h1>
    <div>
      <h3 v-if="dadJokes.loading">Loading...</h3>
      <h3 v-if="!dadJokes.loading && dadJokes.error">{{ dadJokes.error }}</h3>
      <h3 v-if="dadJokes.data !== null">
        <h4>{{ dadJokes.data.joke }}</h4>
      </h3>
    </div>
    <div class="nasa">
      <input v-model="nasaSearch" />
      <h3 v-if="nasaImageSearch.loading">Loading...</h3>
      <h3 v-if="!nasaImageSearch.loading && nasaImageSearch.error">{{ dadJokes.error }}</h3>
      <div v-for="image in nasaImages" :key="image.url" class="image">
        <img :src="image.url"/>
        <h4>{{image.caption}}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import useFetch from '@/hooks/useFetch';
import { DadJokeResponse, NasaImage, NasaImageResponse } from '@/interfaces/interfaces';

export default defineComponent({
  setup() {
    const nasaSearch = ref('moon');
    const nasaSearchUrl = computed(() => `https://images-api.nasa.gov/search?q=${nasaSearch.value}`);
    const dadJokeUrl = computed(() => 'https://icanhazdadjoke.com/');

    const dadJokes = useFetch<DadJokeResponse>(dadJokeUrl);
    const nasaImageSearch = useFetch<NasaImageResponse>(nasaSearchUrl, true);

    const nasaImages = computed<NasaImage[]>(() => {
      if (nasaImageSearch.data) {
        return nasaImageSearch.data.collection.items.reduce((items, item) => {
          if (item.links) {
            const image = item.links.find((link) => link.rel === 'preview');
            if (image) {
              items.push({
                caption: item.data[0].title,
                url: image.href,
              });
            }
          }
          return items;
        }, [] as NasaImage[]);
      }
      return [];
    });

    return {
      dadJokes,
      nasaImageSearch,
      nasaImages,
      nasaSearch,
    };
  },
});
</script>

<style lang="scss">
.nasa {
  .image {
    img {
      width: 100%;
    }
  }
}
</style>
