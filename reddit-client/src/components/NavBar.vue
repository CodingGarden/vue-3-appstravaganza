<template>
  <nav>
    <div class="nav-wrapper green">
      <form @submit.prevent="updateSubreddit">
        <div class="input-field">
          <input v-model="searchTerm" ref="subreddit" id="subreddit" class="autocomplete" type="search" autocomplete="off">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

import API from '@/lib/API';

export default {
  setup() {
    const router = useRouter();
    // TODO: Allow users to hit enter on search bar for when autocomplete doesn't find the small ones
    const searchTerm = ref('');
    const subreddit = ref(null);

    let instance;
    let debounceTimeout;

    // TODO: show loading in autocomplete drop down...
    onMounted(() => {
      instance = M.Autocomplete.init(subreddit.value, {
        data: {},
        onAutocomplete(result) {
          router.push({
            name: 'SubredditPage',
            params: {
              subreddit: result,
            },
          });
        },
      });
      async function getResults() {
        if (searchTerm.value.length < 3) return;
        const response = await API.getPosts('search', {
          q: searchTerm.value,
          type: 'sr',
        });
        const results = response
          .data
          .children
          .reduce((all, child) => {
            if (!child.data.over18) {
              all[child.data.display_name] = null;
            }
            return all;
          }, {});
        instance.updateData(results);
        instance.open();
      }
      watch(() => searchTerm.value, () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          getResults();
        }, 100);
      });
    });

    const updateSubreddit = () => {
      // TODO: fix this...
      clearTimeout(debounceTimeout);
      router.push({
        name: 'SubredditPage',
        params: {
          subreddit: searchTerm.value,
        },
      });
      if (subreddit.value) {
        subreddit.value.blur();
      }
    };

    return {
      updateSubreddit,
      searchTerm,
      subreddit,
    };
  },
};
</script>

<style>

</style>
