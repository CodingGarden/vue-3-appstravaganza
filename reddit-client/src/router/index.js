import { createRouter, createWebHashHistory } from 'vue-router';
import SubReddit from '../views/SubReddit.vue';

const routes = [
  {
    path: '/r/:subreddit',
    name: 'SubredditPage',
    component: SubReddit,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'SubredditPage') {
    next({
      name: 'SubredditPage',
      params: {
        subreddit: 'aww',
      },
    });
  } else next();
});

export default router;
