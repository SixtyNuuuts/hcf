<template>
  <section v-if="Object.keys(movieImages.backdrops).length || Object.keys(movieImages.posters).length" class="movie-images">
    <h3>Images</h3>
    <div>
      <div v-if="movieImages.backdrops">
        <a v-for="backdrop in movieImages.backdrops" :key="backdrop.file_path" :href="'https://image.tmdb.org/t/p/original' + backdrop.file_path" target="_blank">
          <img :src="'https://image.tmdb.org/t/p/w1280' + backdrop.file_path">
        </a>
      </div>
      <div v-if="movieImages.posters">
        <a v-for="poster in movieImages.posters" :key="poster.file_path" :href="'https://image.tmdb.org/t/p/original' + poster.file_path" target="_blank">
          <img :src="'https://image.tmdb.org/t/p/w1280' + poster.file_path">
        </a>
      </div>
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
        backdrops: {},
        posters: {}
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
    text-align: left;

    >div {
      display: flex;

      img {
        max-width: 340px;
      }

    }

  }

</style>
