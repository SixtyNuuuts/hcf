<template>
  <section id="movie">
    <div v-if="type === 'edit'" >
      <MovieDetailsEdit :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCastEdit :movieCast="currentMovieCast" />
      <MovieDocuEdit />
    </div>
    <div v-else>
      <MovieDetails :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCast :movieCast="currentMovieCast" />
      <MovieDocu />
      <!-- <MovieImages /> -->
    </div>
  </section>
</template>

<script>
  import MovieDetails from "@/components/Movie/MovieDetails.vue";
  import MovieCast from "@/components/Movie/MovieCast.vue";
  import MovieDocu from "@/components/Movie/MovieDocu.vue";
  import MovieDetailsEdit from "@/components/Movie/MovieEdit/MovieDetailsEdit.vue";
  import MovieCastEdit from "@/components/Movie/MovieEdit/MovieCastEdit.vue";
  import MovieDocuEdit from "@/components/Movie/MovieEdit/MovieDocuEdit.vue";
  import f from "../services/func";

  export default {
    name: "MovieEdit",
    components: {
      MovieDetailsEdit,
      MovieCastEdit,
      MovieDocuEdit,
      MovieDetails,
      MovieCast,
      MovieDocu
    },
    created() {
      this.type = this.$route.params.type
      this.id = this.$route.params.id
      this.$store.dispatch("getCurrentMovie", this.id)
      this.$store.dispatch("getMovieCrew", this.id)
      this.$store.dispatch("getMovieCast", this.id)
    },
    data() {
      return {
        id: null,
        type: null,
      };
    },
    computed: {
      currentMovie() {
        return this.$store.state.currentMovie
      },
      currentMovieCrew() {
        return f.sortedByOrder(this.$store.state.currentMovieCrew)
      },
      currentMovieCast() {
        return f.sortedByOrder(this.$store.state.currentMovieCast)
      }
    }
  };
</script>
