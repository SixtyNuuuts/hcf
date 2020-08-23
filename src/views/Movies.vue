<template>
  <section id="movies">
    <div class="title">
      <div>
        <h1>
          LES FILMS DOCUMENTÉS DE
          <el-select v-model="selectedYear" filterable @change="handleYearSelected">
            <el-option
              v-for="(item, index) in 60"
              :key="index"
              :label="index+startYear"
              :value="index+startYear"
            ></el-option>
          </el-select>
        </h1>
      </div>
    </div>
    <MoviesDocuList :movies="documentedMovieListByYear" />
    <MoviesList :movies="movieListByYear" :year="selectedYear" />
  </section>
</template>

<script>
  import MoviesDocuList from "@/components/Movies/MoviesDocuList.vue"
  import MoviesList from "@/components/Movies/MoviesList.vue"
  import f from "../services/func";

  export default {
    created() {
      this.$store.dispatch("getMoviesByYear", this.selectedYear)
      this.$store.dispatch("getDocumentedMoviesByYear", this.selectedYear)
    },
    data() {
      return {
        startYear: 1930,
        selectedYear: this.$store.state.currentYearSelected,
      }
    },
    methods: {
      handleYearSelected(year) {
        this.$store.commit('SET_CURRENT_YEAR_SELECTED', year)
        this.$store.dispatch("getMoviesByYear", year)
        this.$store.dispatch("getDocumentedMoviesByYear", year)
      }
    },
    computed: {
      movieListByYear() {
        let currentMovieListByYearfiltered = this.$store.state.currentMovieListByYear.filter(m => !this.$store.state.currentDocumentedMovieListByYear.find(e => e.id === m.id) );
        return f.sortedByAlphabet(currentMovieListByYearfiltered);
      },
      documentedMovieListByYear() {
        return f.sortedByAlphabet(this.$store.state.currentDocumentedMovieListByYear);
      },
    },
    // this.$store.state.currentDocumentedMovieListByYear.includes(m.id) m.id == '47831'
    name: "Movies",
    components: {
      MoviesList,
      MoviesDocuList
    }
  }
</script>

<style scoped lang="scss">

@import '../styles/color.scss';  

  #movies {
    padding: 3em 1.45em 0 1.5em;

    .title {
      margin: 0 0 2em;
      padding: 1.5em;
      position: relative;
      text-align: center;
      z-index: 2;
      background: url("../assets/img/box-border-patern.png") repeat 0 0 $--color-hcf-beige;

      &:before {
        background: $--color-hcf-light-beige;
        bottom: 0;
        content: "";
        display: block;
        left: 0;
        margin: 1.5em;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
      }

      h1 {
        font-family: "Righteous";
        color: $--color-hcf-ddark-brown;
        font-size: 1.9em;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
        line-height: 1.2;
        margin: 0.8em 1em 1em 1em; 

        .el-select {
          margin-top: 0.25em;
        }

      }

    }

  }
</style>
