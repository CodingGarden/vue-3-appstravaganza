<template>
  <ScoreCounter name="CJ" />
  <ScoreCounterSyntaxSugar name="Alca" />
</template>

<script>
import ScoreCounter from './components/ScoreCounter';
import ScoreCounterSyntaxSugar from './components/ScoreCounterSyntaxSugar';

export default {
  components: {
    ScoreCounter,
    ScoreCounterSyntaxSugar,
  }
};
</script>

<style>
#app {
  font-family: sans-serif;
  font-size: 3rem;
  text-align: center;
}
</style>
