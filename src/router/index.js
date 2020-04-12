import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieYearsList from "../views/MovieYearsList.vue";

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "MovieYearsList",
      component: MovieYearsList
    },
    {
      path: "/films/:year",
      name: "films",
      component: () =>
        import(/* webpackChunkName: "films" */ "../views/Movies.vue")
    },
    {
      path: "/film/:id",
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
