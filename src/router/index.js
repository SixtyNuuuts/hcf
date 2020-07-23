import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "films" */ "../views/Movies.vue")
    },
    {
      path: "/films",
      name: "films",
      component: () =>
        import(/* webpackChunkName: "films" */ "../views/Movies.vue")
    },
    {
      path: "/film/:type?/:id",
      name: "film",
      component: () => import(/* webpackChunkName: "film" */ "../views/Movie.vue")
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
