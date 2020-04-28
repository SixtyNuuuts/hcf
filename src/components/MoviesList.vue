<template>
  <section id="moviesother">
  <div class="moviesother_border">
    <div class="moviesother_container">
      <h1>D'AUTRES FILMS DE {{ year }}</h1>
      <div class="moviesother_list">
        <div v-for="(movie, index) in movies" :key="index">
          <router-link :to="'/film/' + movie.id">{{ movie.original_title }}</router-link>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>

export default {
  name: "MoviesList",
  props: {
    movies: Array,
    year: Number
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .moviesother_border {
    background: url(https://retro.olegnax.com/wp-content/themes/retro/images/content-tail-left.png) repeat-y 0 0, url(https://retro.olegnax.com/wp-content/themes/retro/images/content-tail-right.png) repeat-y right 0;
    position: relative;
    width: 110%;
    left: -5%;
    padding: 0 3px;

    .moviesother_container {
      background: url(//retro.olegnax.com/wp-content/themes/comments/images/main-pattern.jpg) repeat scroll left top;
      padding: 2%;

      .moviesother_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow: auto;

        div {
          margin: 8px 15px;
          font-size: 1em;
          border-top: 1px solid #cdbfac ;
          border-bottom: 1px solid #cdbfac ;
          display: flex;
          justify-content: center;
          align-items: center;

          a {
            color: #472900;
            text-decoration: none;
            font-weight: 600;
          }

        }

      }

    }

  }

</style>
