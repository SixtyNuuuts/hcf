<template>
  <section id="movie">
    <LoginAdmin v-if="view === 'edit' && !isAdmin" />
    <div v-else-if="view === 'edit' && isAdmin" >
      <MovieDetailsEdit :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCastEdit :movieCast="currentMovieCast" />
      <MovieDocuEdit :movieDocumented="currentMovieDocumented" />
      <ImagesGalleryEdit :images="currentMovieImages" />
    </div>
    <div v-else>
      <MovieDetails :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCast :movieCast="currentMovieCast" />
      <MovieDocu v-if="currentMovieDocumented.colLeftContent.length || currentMovieDocumented.colRightContent.length" :movieDocumented="currentMovieDocumented" />
      <ImagesGallery v-if="currentMovieImages.length" :images="currentMovieImages"/>
    </div>
  </section>
</template>

<script>
  import MovieDetails from "@/components/Movie/MovieDetails.vue";
  import MovieCast from "@/components/Movie/MovieCast.vue";
  import MovieDocu from "@/components/Movie/MovieDocu.vue";
  import ImagesGallery from "@/components/ImagesGallery.vue";
  import LoginAdmin from "@/components/Edit/LoginAdmin.vue";
  import MovieDetailsEdit from "@/components/Movie/MovieEdit/MovieDetailsEdit.vue";
  import MovieCastEdit from "@/components/Movie/MovieEdit/MovieCastEdit.vue";
  import MovieDocuEdit from "@/components/Movie/MovieEdit/MovieDocuEdit.vue";
  import ImagesGalleryEdit from "@/components/Edit/ImagesGalleryEdit.vue";
  import f from "../services/func";

  export default {
    name: "Movie",
    components: {
      MovieDetails,
      MovieCast,
      MovieDocu,
      ImagesGallery,
      LoginAdmin,
      MovieDetailsEdit,
      MovieCastEdit,
      MovieDocuEdit,
      ImagesGalleryEdit,
    },
    created() {
      this.view = this.$route.params.view
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
        view: null
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
