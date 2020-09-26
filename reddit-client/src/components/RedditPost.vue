<template>
  <div class="col s12">
    <div class="card post">
      <div v-if="isVideo" class="card-image waves-effect waves-block waves-light">
        <video class="activator video" controls muted autoplay loop>
          <source type="video/mp4" :src="videoUrl" />
        </video>
      </div>
      <div v-if="isImage" class="card-image waves-effect waves-block waves-light">
        <img class="activator" :src="post.url" />
      </div>
      <div class="card-content">
        <span class="card-title activator"
          >{{post.title}}</span
        >
        <p><a :href="`https://www.reddit.com${post.permalink}`">Comments</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    post: Object,
  },
  setup({ post }) {
    // TODO: some posts not displayed correctly...
    // you should check the isVideo and isGif properties
    const isVideo = computed(() => (post.secure_media && post.secure_media.reddit_video) || post.url.match(/mp4|gifv|mkv|mov|webm$/));

    const isImage = computed(() => post.url.match(/bmp|webp|png|jpg|jpeg|gif$/));

    const videoUrl = computed(() => {
      if (post.secure_media && post.secure_media.reddit_video) {
        return post.media.reddit_video.fallback_url;
      }
      const parts = post.url.split('.');
      parts.pop();
      return parts.concat('mp4').join('.');
    });

    return {
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
</style>
