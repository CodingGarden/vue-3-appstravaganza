import { ComputedRef, reactive, UnwrapRef, watchEffect } from 'vue';

interface FetchState<T> {
  loading: boolean;
  error: string;
  data: T | null;
}

const dataCache = new Map<string, Object>();

export default function useFetch<T>(url: ComputedRef<string>, cache = false) {
  const state = reactive<FetchState<T>>({
    loading: false,
    error: '',
    data: null,
  });

  const fetchData = async () => {
    state.loading = true;
    state.data = null;
    state.error = '';
    try {
      if (dataCache.has(url.value)) {
        state.data = dataCache.get(url.value) as UnwrapRef<T>;
      } else {
        const response = await fetch(url.value, {
          headers: {
            accept: 'application/json',
          },
        });
        if (response.ok) {
          const json = await response.json();
          state.data = json;
          if (cache) {
            dataCache.set(url.value, json);
          }
        } else {
          state.error = 'Error fetching data.';
        }
      }
    } catch (error) {
      state.error = `Error fetching data. ${error.message}`;
    }
    state.loading = false;
  };

  watchEffect(() => {
    fetchData();
  });

  return state;
}
