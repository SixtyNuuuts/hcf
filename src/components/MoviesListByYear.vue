<template>
  <div>
    <h1>Films de {{ year }}</h1>
    <p v-for="movie in sortedMovies" :key="movie.id">
      <router-link :to="'/film/' + movie.id">{{ movie.original_title }}</router-link>
    </p>
  </div>
</template>

<script>
import tmdbApi from "../services/tmdb-api";

export default {
  created() {
    tmdbApi.getMoviesFrByYear(this.year, 1).then(res => {
      for (let page = 1; page <= res.data.total_pages; page++) {
        tmdbApi.getMoviesFrByYear(this.year, page).then(res => {
          this.movies = [...this.movies, ...res.data.results];
        });
      }
    });
  },
  data() {
    return {
      movies: []
    };
  },
  name: "MoviesListByYear",
  props: {
    year: String
  },
  computed: {
    sortedMovies: function() {
      function compare(a, b) {
        return a.original_title.localeCompare(b.original_title);
      }
      return [...this.movies].sort(compare);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
