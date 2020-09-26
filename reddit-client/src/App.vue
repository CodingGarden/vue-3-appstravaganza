<template>
  <NavBar />
  <div class="grey darken-4">
    <router-view class="container"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
</style>
