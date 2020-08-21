<template>
  <section id="movie">
    <LoginAdmin v-if="view === 'edit' && !isAdmin" />
    <div v-else-if="view === 'edit' && isAdmin" >
      <MovieDetailsEdit :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCastEdit :movieCast="currentMovieCast" />
      <DocuEdit :docu="currentMovieDocumented" docuType="movie"/>
      <ImagesGalleryEdit :images="currentMovieImages" galleryType="movie"/>
    </div>
    <div v-else>
      <MovieDetails :movie="currentMovie" :movieCrew="currentMovieCrew"/>
      <MovieCast :movieCast="currentMovieCast" />
      <Docu v-if="currentMovieDocumented.colLeftContent.length || currentMovieDocumented.colRightContent.length" :docu="currentMovieDocumented" />
      <ImagesGallery v-if="currentMovieImages.length" :images="currentMovieImages"/>
    </div>
  </section>
</template>

<script>
  import MovieDetails from "@/components/Movie/MovieDetails.vue";
  import MovieCast from "@/components/Movie/MovieCast.vue";
  import Docu from "@/components/Docu.vue";
  import ImagesGallery from "@/components/ImagesGallery.vue";
  import LoginAdmin from "@/components/Edit/LoginAdmin.vue";
  import MovieDetailsEdit from "@/components/Movie/MovieEdit/MovieDetailsEdit.vue";
  import MovieCastEdit from "@/components/Movie/MovieEdit/MovieCastEdit.vue";
  import DocuEdit from "@/components/Edit/DocuEdit.vue";
  import ImagesGalleryEdit from "@/components/Edit/ImagesGalleryEdit.vue";
  import f from "../services/func";

  export default {
    name: "Movie",
    components: {
      MovieDetails,
      MovieCast,
      Docu,
      ImagesGallery,
      LoginAdmin,
      MovieDetailsEdit,
      MovieCastEdit,
      DocuEdit,
      ImagesGalleryEdit,
    },
    created() {
      this.view = this.$route.params.view
      this.id = this.$route.params.id
      this.$store.dispatch("getCurrentMovie", this.id)
      this.$store.dispatch("getCurrentMovieCrew", this.id)
      this.$store.dispatch("getCurrentMovieCast", this.id)
      this.$store.dispatch("getCurrentMovieDocumented", this.id)
      this.$store.dispatch("getCurrentMovieImages", this.id)
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
