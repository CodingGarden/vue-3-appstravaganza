<script lang="jsx">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import usePosts from '@/hooks/usePosts';
import useSubreddit from '@/hooks/useSubreddit';
import RedditPost from '@/components/RedditPost.vue';

export default {
  setup() {
    const route = useRoute();
    const subreddit = computed(() => `r/${route.params.subreddit}`);
    const postsState = usePosts(subreddit);
    const subredditState = useSubreddit(subreddit);
    watch(subredditState, () => {
      document.title = subredditState.data?.title || subreddit.value;
    }, {
      immediate: true,
    });
    const posts = computed(() => postsState
      .data
      .filter((child) => !child.data.over_18)
      .map((child) => child.data));

    return {
      postsState,
      posts,
      subredditState,
    };
  },
  render() {
    const { postsState, subredditState, posts } = this;
    return (
      <div class="subreddit">
        <div class="info">
          {subredditState.loading ? (
            <div class="loading">
              <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {!!subredditState.error && (
            <div class="card red accent-1">
              <div class="card-content white-text">
                <span class="card-title">{subredditState.error}</span>
              </div>
            </div>
          )}
          {!subredditState.error && !subredditState.loading && (
            <div class="card">
              {subredditState.data.banner_img ? (
                <div class="card-image">
                  <img src={subredditState.data.banner_img} />
                </div>
              ) : null}
              <div class="card-content banner">
                {subredditState.data.icon_img ? (
                  <div class="icon">
                    <img class="circle" src={subredditState.data.icon_img} />
                  </div>
                ) : null}
                <div>
                  <span class="card-title">{subredditState.data.display_name_prefixed}</span>
                  <span class="card-title">{subredditState.data.title}</span>
                </div>
              </div>
              <div class="card-content">
                <p>{subredditState.data.public_description}</p>
                <small>{subredditState.data.active_user_count} of {subredditState.data.subscribers} subscribers are here.</small>
              </div>
            </div>
          )}
        </div>
        {postsState.loading && (
          <div class="progress green lighten-3">
            <div class="indeterminate green"></div>
          </div>
        )}
        {!!postsState.error && (
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

<style lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

.info {
  .banner {
    display: flex;
    justify-content: flex-start;
    .icon {
      margin-right: 2rem;
      img {
        height: 75px;
      }
    }
  }
}
</style>
