<template>
  <section class="movie-cast">
    <h3>Acteurs</h3>
    <div class="actor-list">
      <div class="card">
        <a href="/person/11543-gaston-modot?language=fr-FR">
          <img src="https://image.tmdb.org/t/p/w138_and_h175_face/2iYNh1NPS21O3Cq5sWzHlOUOFv3.jpg">
        </a>
        <p><a href="/person/11543-gaston-modot?language=fr-FR">Gaston Modot</a></p>
        <p class="character">The Man</p>
      </div>
      <div class="card">
        <a href="/person/11543-gaston-modot?language=fr-FR">
          <img src="https://image.tmdb.org/t/p/w138_and_h175_face/2iYNh1NPS21O3Cq5sWzHlOUOFv3.jpg">
        </a>
        <p><a href="/person/11543-gaston-modot?language=fr-FR">Gaston Modot</a></p>
        <p class="character">The Man</p>
      </div>
      <div class="card">
        <a href="/person/11543-gaston-modot?language=fr-FR">
          <img src="https://image.tmdb.org/t/p/w138_and_h175_face/2iYNh1NPS21O3Cq5sWzHlOUOFv3.jpg">
        </a>
        <p><a href="/person/11543-gaston-modot?language=fr-FR">Gaston Modot</a></p>
        <p class="character">The Man</p>
      </div>
    </div>
  </section>
</template>

<script>
// import tmdbApi from "../services/tmdb-api";

export default {
  // created() {
  //   tmdbApi.getMovieById(this.id).then(res => {
  //     this.movie = res.data;
  //   });
  // },
  data() {
    return {
      movie: null
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
