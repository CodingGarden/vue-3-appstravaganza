<template>
  <div class="col s12">
    <div class="card post">
      <div class="card-content title-info">
        <span class="card-title vertical-center">
          <span class="badge green white-text score">{{ post.score }}</span>
          {{ post.title }}
        </span>
        <p>
          Posted {{postTime}} by <a :href="`https://www.reddit.com/u/${post.author}`">{{post.author}}</a>
        </p>
      </div>
      <div
        v-if="isVideo"
        class="card-image waves-effect waves-block waves-light"
      >
        <video class="activator video" controls muted autoplay loop>
          <source type="video/mp4" :src="videoUrl" />
        </video>
      </div>
      <div
        v-if="isImage"
        class="card-image waves-effect waves-block waves-light"
      >
        <img class="activator" :src="post.url" />
      </div>
      <div class="card-content">
        <!-- pluralize! -->
        <p><a :href="`https://www.reddit.com${post.permalink}`">{{post.num_comments}} Comments</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import * as timeago from 'timeago.js';

export default {
  props: {
    post: Object,
  },
  setup({ post }) {
    // TODO: some posts not displayed correctly...
    // you should check the isVideo and isGif properties
    const isVideo = computed(
      () => (post.secure_media && post.secure_media.reddit_video)
        || post.url.match(/mp4|gifv|mkv|mov|webm$/),
    );

    const isImage = computed(() => post.url.match(/bmp|webp|png|jpg|jpeg|gif$/));

    const videoUrl = computed(() => {
      if (post.secure_media && post.secure_media.reddit_video) {
        return post.media.reddit_video.fallback_url;
      }
      const parts = post.url.split('.');
      parts.pop();
      return parts.concat('mp4').join('.');
    });

    const postTime = computed(() => timeago.format(post.created_utc * 1000));

    return {
      postTime,
      isVideo,
      isImage,
      videoUrl,
    };
  },
};
</script>

<style scoped>
.post {
  height: 100%;
}

.video {
  width: 100%;
}

.title-info {
  padding-bottom: 0px;
}

.score {
  float: none;
  border-radius: 10px;
  margin-right: 8px;
  padding: 6px;
}

.vertical-center {
  display: flex;
  align-items: center;
}
</style>
