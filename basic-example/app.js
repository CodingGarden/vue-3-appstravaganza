import { createApp, ref, reactive, computed, onMounted } from 'https://unpkg.com/vue@3.0.0/dist/vue.esm-browser.js';

createApp({
  setup() {
    const message = ref('Hello Vue 3!');
    const count = ref(0);
    const dadJokes = reactive({
      loading: false,
      error: '',
      jokes: [],
    });

    const increment = () => count.value += 1;
    const countPlus10 = computed(() => count.value + 10);

    onMounted(async () => {
      dadJokes.loading = true;
      dadJokes.jokes = [];
      const response = await fetch('https://icanhazdadjoke.com/search', {
        headers: {
          accept: 'application/json'
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (response.ok) {
        dadJokes.error = '';
        const json = await response.json();
        dadJokes.jokes = json.results;
      } else {
        dadJokes.error = 'Could not haz dad jokez. :(';
      }
      dadJokes.loading = false;
    });

    return {
      message,
      count,
      increment,
      countPlus10,
      dadJokes,
    };
  }
}).mount(document.body);
