<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/img/logo.png" /> -->
    <MovieDetails :id="id" />
    <MovieCast :id="id" />
    <MovieImages :id="id" />
  </div>
</template>

<script>
import MovieDetails from "@/components/MovieDetails.vue";
import MovieCast from "@/components/MovieCast.vue";
import MovieImages from "@/components/MovieImages.vue";

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
