<template>
  <div id="movies">
    <!-- <img alt="Vue logo" src="../assets/img/logo.png" /> -->
    <div class="box-select-year">
      <div>
        <h1>
          LES FILMS DOCUMENTÉS DE
          <el-select v-model="selectedYear" filterable placeholder="Sélectionnez une année">
            <el-option
              v-for="(item, index) in 10"
              :key="index"
              :label="index+startYear"
              :value="index+startYear"
            ></el-option>
          </el-select>
        </h1>
      </div>
    </div>
    <MoviesDocuList :movies="filteredMoviesDocu" />
    <MoviesList :movies="sortedMovies" :year="selectedYear" />
  </div>
</template>

<script>
import MoviesDocuList from "@/components/MoviesDocuList.vue"
import MoviesList from "@/components/MoviesList.vue"
import tmdbApi from "../services/tmdb-api"

export default {
  created() {
    this.getMovies(this.selectedYear)
  },
  data() {
    return {
      startYear: 1930,
      selectedYear: 1930,
      movies: [],
      moviesDocuId: [
        5729, 47831, 556675, 
      ]
    }
  },
  watch: {
    selectedYear: function(year) {
      this.movies = []
      this.$router.push("/films/" + year)
      this.getMovies(year)
    }
  },
  methods: {
    getMovies: function(year) {
      tmdbApi.getMoviesFrByYear(year, 1).then(res => {
        for (let page = 1; page <= res.data.total_pages; page++) {
          tmdbApi.getMoviesFrByYear(year, page).then(res => {
            this.movies = [...this.movies, ...res.data.results]
          })
        }
      })
    },
    sortMoviesAlphab: function(array) {
      function compare(a, b) {
        return a.original_title.localeCompare(b.original_title)
      }
      return [...array].sort(compare)
    },
  },
  computed: {
    sortedMovies: function() {
      return this.sortMoviesAlphab(this.movies)
    },
    filteredMoviesDocu: function() {
      return this.movies.filter(movie => this.moviesDocuId.includes(movie.id))
    }
  },
  name: "Movies",
  components: {
    MoviesList,
    MoviesDocuList
  }
}
</script>

<style scoped lang="scss">
#movies {
  padding: 3em 2em;

  .box-select-year {
    margin: 0 0 36px;
    padding: 21px 0 19px 0;
    position: relative;
    text-align: center;
    z-index: 2;
    background: url("../assets/img/box-border-patern.png") repeat 0 0 #f6e5c8;

    &:before {
      background: #fcedd5;
      bottom: 0;
      content: "";
      display: block;
      left: 0;
      margin: 19px 18px 18px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
    }

    h1 {
      font-family: "Bazar";
      color: #2b1d07;
      font-size: 1.9em;
      text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
    }

  }

}
</style>
