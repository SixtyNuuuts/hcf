<template>
  <section id="movie">
    <LoginAdmin v-if="type === 'edit' && !isAdmin" />
    <div v-else-if="type === 'edit' && isAdmin" >
      <MovieDetailsEdit :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCastEdit :movieCast="currentMovieCast" />
      <MovieDocuEdit :movieDocumented="currentMovieDocumented" />
      <MovieImagesEdit :movieImages="currentMovieImages" />
    </div>
    <div v-else>
      <MovieDetails :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCast :movieCast="currentMovieCast" />
      <MovieDocu v-if="currentMovieDocumented.colLeftContent.length || currentMovieDocumented.colRightContent.length" :movieDocumented="currentMovieDocumented" />
      <MovieImages v-if="currentMovieImages.length" :movieImages="currentMovieImages"/>
    </div>
  </section>
</template>

<script>
  import MovieDetails from "@/components/Movie/MovieDetails.vue";
  import MovieCast from "@/components/Movie/MovieCast.vue";
  import MovieDocu from "@/components/Movie/MovieDocu.vue";
  import MovieImages from "@/components/Movie/MovieImages.vue";
  import MovieDetailsEdit from "@/components/Movie/MovieEdit/MovieDetailsEdit.vue";
  import MovieCastEdit from "@/components/Movie/MovieEdit/MovieCastEdit.vue";
  import MovieDocuEdit from "@/components/Movie/MovieEdit/MovieDocuEdit.vue";
  import MovieImagesEdit from "@/components/Movie/MovieEdit/MovieImagesEdit.vue";
  import LoginAdmin from "@/components/Movie/MovieEdit/LoginAdmin.vue";
  import f from "../services/func";

  export default {
    name: "MovieEdit",
    components: {
      LoginAdmin,
      MovieDetailsEdit,
      MovieCastEdit,
      MovieDocuEdit,
      MovieImagesEdit,
      MovieDetails,
      MovieCast,
      MovieDocu,
      MovieImages
    },
    created() {
      this.type = this.$route.params.type
      this.id = this.$route.params.id
      this.$store.dispatch("getCurrentMovie", this.id)
      this.$store.dispatch("getMovieCrew", this.id)
      this.$store.dispatch("getMovieCast", this.id)
      this.$store.dispatch("getMovieDocumented", this.id)
      this.$store.dispatch("getMovieImages", this.id)
    },
    data() {
      return {
        id: null,
        type: null
      };
    },
    computed: {
      isAdmin() {
        return this.$store.state.currentUser.admin;
      },
      currentMovie() {
        return this.$store.state.currentMovie
      },
      currentMovieCrew() {
        return f.sortedByOrder(this.$store.state.currentMovieCrew)
      },
      currentMovieCast() {
        return f.sortedByOrder(this.$store.state.currentMovieCast)
      },
      currentMovieDocumented() {
        return this.$store.state.currentDocumentedMovie
      },
      currentMovieImages() {
        return this.$store.state.currentMovieImages
      }
    },
  };
</script>
