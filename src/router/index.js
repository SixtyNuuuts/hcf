import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "home",
      redirect: { name: 'films' }
    },
    {
      path: "/films",
      name: "films",
      component: () =>
        import(/* webpackChunkName: "films" */ "../views/Movies.vue")
    },
    {
      path: "/film/:view?/:id",
      name: "film",
      component: () => import(/* webpackChunkName: "film" */ "../views/Movie.vue")
    },
    {
      path: "/persons",
      name: "persons",
      component: () =>
        import(/* webpackChunkName: "films" */ "../views/Persons.vue")
    },
    {
      path: "/person/:view?/:id",
      name: "person",
      component: () => import(/* webpackChunkName: "film" */ "../views/Person.vue")
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
