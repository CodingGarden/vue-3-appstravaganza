<script lang="jsx">
import { computed } from 'vue';

import usePosts from '@/hooks/usePosts';
import RedditPost from '@/components/RedditPost.vue';

export default {
  props: {
    name: String,
  },
  setup(props) {
    const postsState = usePosts(props.name);
    const posts = computed(() => postsState.data.filter((child) => !child.data.over_18).map((child) => child.data));

    return {
      postsState,
      posts,
    };
  },
  render() {
    const { postsState, posts } = this;
    return (
      <div class="subreddit">
        {postsState.loading && (
          <div class="progress green lighten-3">
            <div class="indeterminate green"></div>
          </div>
        )}
        {postsState.error && (
          <div class="card red accent-1">
            <div class="card-content white-text">
              <span class="card-title">{postsState.error}</span>
            </div>
          </div>
        )}
        <div class="row">
          {posts.map((post) => (
            <RedditPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  },
};
</script>
