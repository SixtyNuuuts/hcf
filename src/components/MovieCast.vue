<template>
  <section v-if="movieCast.length" class="movie-cast">
    <h3>Distribution</h3>
    <div class="actor-list">
      <div v-for="actor in movieCast" :key="actor.id" class="card">
        <a href="">
          <img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w138_and_h175_face' + actor.profile_path">
          <div v-else class="no-picture">
            <i class="fa fa-user" aria-hidden="true"></i>
          </div>
        </a>
        <div class="text">
          <p><a href=""> {{ actor.name }} </a></p>
          <p class="character">{{ actor.character }}</p>
        </div>
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
      movieCast: []
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
      overflow: auto;

      .card {
        margin-right: 20px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        
        .no-picture {
          background-color: lightgrey;
          width: 138px;
          height: 175px;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 5rem;
            color: #b5b5b5;
          }

        }

        .text {
          padding: 0 10px;

        }

      }

    }

  }

</style>
