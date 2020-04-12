<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <MovieDetails :id="id" />
    <MovieCast :id="id" />
  </div>
</template>

<script>
import MovieDetails from "@/components/MovieDetails.vue";
import MovieCast from "@/components/MovieCast.vue";

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
    MovieCast
  }
};
</script>
