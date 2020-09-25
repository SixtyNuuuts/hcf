<template>
  <section id="movies">
    <div class="title">
      <div>
        <h1>LES FILMS DOCUMENTÉS <span v-if="isAdmin">({{ documentedMovieListByYear.length }})</span></h1>
          <h2>par année</h2>
          <ul class="years first-line">
            <li v-for="year in yearsFirstLine" :key="year" @click="handleYearSelected(year)" :class="{ 'active': year === selectedYear }">
              {{ year }}
            </li>
          </ul>
          <!-- <ul class="years second-line">
            <li v-for="year in yearsSecondLine" :key="year" @click="handleYearSelected(year)" :class="{ 'active': year === selectedYear }">
              {{ year }}
            </li>
          </ul> -->
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
        yearsFirstLine: [1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939],
        selectedYear: this.$store.state.currentYearSelected,
      }
    },
    methods: {
      handleYearSelected(year) {
        this.selectedYear = year;
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
      isAdmin() {
        return this.$store.state.currentUser.admin;
      },
    },
    name: "Movies",
    components: {
      MoviesList,
      MoviesDocuList
    }
  }
</script>

<style scoped lang="scss">

@import '@/styles/color.scss';  
@import '@/styles/shadow.scss';  
@import '@/styles/bp.scss';

  #movies {
    padding: 4em 1.45em 0 1.5em;

    .title {
      padding: 3.2em 3.6em;
      position: relative;
      text-align: center;
      z-index: 2;
      background: url("../assets/img/box-border-patern.png") repeat 0 0 $--color-hcf-beige;
      font-family: "Righteous";
      line-height: 1.2;

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
        color: $--color-hcf-ddark-brown;
        margin: 0.5em; 
        margin-top: 0.2em;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
        font-size: 1.9rem;
      }

      h2 {
          font-weight: 500;
          color: #d7c6af;
          font-size: 1.3rem;
          margin: 0;
          margin-bottom: 0.4rem;
      }

      ul.years {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        li {
          color: $--color-hcf-red;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.3rem 0.6rem;
          border-radius: 3px;
          background-color: $--color-hcf-light-beige;
          font-size: 1.45rem;
          // margin: .2rem .05rem;
          margin-left: .45rem;
          margin-right: .45rem;
          margin-top: .2rem;
          margin-bottom: .2rem;
          transition: background-color .3s, color .3s, margin-left .3s, margin-right .3s;
          cursor: pointer;

          &:hover, &.active {
            color: $--color-hcf-light-beige;
            background-color: $--color-hcf-red;
            box-shadow: $--box-shadow-brown-2;
          }
          &.active {
            // margin: .3rem .3rem .3rem .43rem;
            margin-left: .43rem;
            margin-right: .3rem;
            margin-top: .3rem;
            margin-bottom: .3rem;
          }
        }
      }

    }

  }

@media (max-width: 400px) {
    #movies {
      .title {
        padding: 2.5em;
        h1 {
          font-size: 1.7rem;
        }
      }
   }
}
</style>
