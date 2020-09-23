<template>
  <NavBar />
  <router-view class="container mt-5" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  components: {
    NavBar,
  },
});
</script>

<style lang="scss">

</style>
