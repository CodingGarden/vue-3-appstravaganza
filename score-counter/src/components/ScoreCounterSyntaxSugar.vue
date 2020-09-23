<template>
  <div>
    <h2>{{properties.name}}</h2>
    <p>{{player.score}}</p>
    <button v-on:click="decrease">Decrease</button>
    <button v-on:click="increase">Increase</button>
  </div>
</template>


<script setup="props">
import { reactive } from 'vue'

export default {
  props: {
    name: String,
  },
  inheritAttrs: false,
};

export const player = reactive({
  score: 0,
});

export const increase = () => {
  player.score += 1;
};

export const decrease = () => {
  player.score -= 1;
};

// eslint-disable-next-line no-undef
export const properties = props;
</script>
