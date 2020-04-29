<template>
  <section id="movie">
    <MovieDetails :id="id" />
    <MovieCast :id="id" />
    <MovieImages :id="id" />
  </section>
</template>

<script>
  import MovieDetails from "@/components/Movie/MovieDetails.vue";
  import MovieCast from "@/components/Movie/MovieCast.vue";
  import MovieImages from "@/components/Movie/MovieImages.vue";

  export default {
    created() {
      this.id = this.$route.params.id;
    },
    data() {
      return {
        id: null
      };
    },
    name: "Movie",
    components: {
      MovieDetails,
      MovieCast,
      MovieImages
    }
  };
</script>
