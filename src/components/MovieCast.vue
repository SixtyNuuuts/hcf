<template>
  <section class="movie-cast">
    <h3>Distribution</h3>
    <div class="actor-list">
      <div v-for="actor in movieCast" :key="actor.id" class="card">
        <a href="">
          <img :src="'https://image.tmdb.org/t/p/w138_and_h175_face' + actor.profile_path">
        </a>
        <p><a href=""> {{ actor.name }} </a></p>
        <p class="character">{{ actor.character }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import tmdbApi from "../services/tmdb-api";

export default {
  created() {
    tmdbApi.getMovieCredits(this.id).then(res => {
      this.movieCast = res.data.cast;
    });
  },
  data() {
    return {
      movieCast: null
    };
  },
  name: "MovieCast",
  props: {
    id: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  section.movie-cast {
    text-align: left;

    .actor-list {
      display: flex;

      div {
        margin-right: 20px;
      }
      
    }

  }

</style>
