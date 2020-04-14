<template>
  <section class="movie-images">
    <div v-for="backdrop in movieImages.backdrops" :key="backdrop.file_path">
      <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + backdrop.file_path">
    </div>
    <div v-for="poster in movieImages.posters" :key="poster.file_path">
      <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + poster.file_path">
    </div>
  </section>
</template>

<script>
import tmdbApi from "../services/tmdb-api";

export default {
  created() {
    tmdbApi.getMovieImages(this.id).then(res => {
      this.movieImages = res.data;
    });
  },
  data() {
    return {
      movieImages: {
        backdrops: null,
        posters: null
      },
    };
  },
  name: "MovieImages",
  props: {
    id: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  section.movie-images {
    display: flex;
    text-align: left;
  }

</style>
