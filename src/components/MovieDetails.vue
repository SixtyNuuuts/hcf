<template>
  <section class="movie-info">
    <div class="poster">
      <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/nrpeks4ScEBSYzpYSvex6CGWdlT.jpg" data-src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/nrpeks4ScEBSYzpYSvex6CGWdlT.jpg" data-srcset="https://image.tmdb.org/t/p/w300_and_h450_bestv2/nrpeks4ScEBSYzpYSvex6CGWdlT.jpg 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2/nrpeks4ScEBSYzpYSvex6CGWdlT.jpg 2x" alt="L'Âge d'Or" srcset="https://image.tmdb.org/t/p/w300_and_h450_bestv2/nrpeks4ScEBSYzpYSvex6CGWdlT.jpg 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2/nrpeks4ScEBSYzpYSvex6CGWdlT.jpg 2x" data-loaded="true">
    </div>
    <div>
      <div class="title">
        <h2>
          <a href="/movie/5729-l-age-d-or?language=fr-FR">L'Âge d'Or</a>
          <span class="release_date">(1930)</span>
        </h2>
        <div>
          <span class="release">
            28/10/1930 (FR)
          </span>
          <span class="genres">
              <a href="/genre/10749-romance/movie">Romance</a>,&nbsp;<a href="/genre/35-comedie/movie">Comédie</a>,&nbsp;<a href="/genre/18-drame/movie">Drame</a>
          </span>
          <span class="runtime">
              1h 3m
          </span>
        </div>
      </div>
      <div>
        <div class="score"></div>
      </div>
      <div>
        <h3>A surrealist masterpiece</h3>
        <h3>Synopsis</h3>
        <div class="overview">
          <p>Sur un scénario de Bunuel et Dali des images folles, un film choc qui fut longtemps frappe d'interdiction et provoqua la parution du "Manifeste surréaliste".</p>
        </div>
        <div class="characters">
          <div>
            <p><a href="/person/793-luis-bunuel?language=fr-FR">Luis Buñuel</a></p>
            <p>Director, Screenplay</p>
          </div>
          <div>
            <p><a href="/person/100327-marques-de-sade?language=fr-FR">Marquês de Sade</a></p>
            <p>Novel</p>
          </div>
          <div>
            <p><a href="/person/8988-salvador-dali?language=fr-FR">Salvador Dalí</a></p>
            <p>Screenplay</p>
          </div>
        </div>
      </div>
    </div>
  </section>
<!-- 
  <div>
    <h1>{{ movie.original_title }}</h1>
    <img
      v-if="movie.poster_path"
      :src="'http://image.tmdb.org/t/p/w185' + movie.poster_path"
      alt="poster"
    />
    <p>{{ movie.overview }}</p>
  </div> -->
</template>

<script>
import tmdbApi from "../services/tmdb-api";

export default {
  created() {
    tmdbApi.getMovieById(this.id).then(res => {
      this.movie = res.data;
    });
  },
  data() {
    return {
      movie: null
    };
  },
  name: "MovieDetails",
  props: {
    id: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  section.movie-info {
    display: flex;
    text-align: left;

    .poster {
      margin-right: 20px;
    }

    .title {
      margin-bottom: 20px;
    }

    .score {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgb(13, 202, 216); 
    }

    .characters {
      display: flex;
      
      div {
        margin-right: 40px;
      }

    }

  }

</style>
