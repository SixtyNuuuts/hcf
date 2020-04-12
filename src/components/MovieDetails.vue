<template>
  <section class="movie-info">
    <div class="poster">
      <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path">
    </div>
    <div>
      <div class="title">
        <h2>
          <h1>{{ movie.original_title }} <span class="release_date">({{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }})</span></h1>
        </h2>
        <div>
          <span class="release">
            {{ movie.release_date  | dateParse('YYYY-MM-DD') | dateFormat('DD/MM/YYYY') }} ({{ movie.production_countries[0].iso_3166_1}})
          </span>
          <ul class="genres">
            <li v-for="genre in movie.genres" :key="genre.id">
              {{ genre.name }}
            </li>
          </ul>
          <span class="runtime">
            {{ movie.runtime | minutesToHours() }}
          </span>
        </div>
      </div>
      <div>
        <div class="score">{{ movie.vote_average }}</div>
      </div>
      <div>
        <h3>Synopsis</h3>
        <div class="overview">
          <p>{{ movie.overview }}</p>
        </div>
        <div class="crew">
          <div v-for="person in movieCrew" :key="person.id">
            <p><a href="">{{ person.name }}</a></p>
            <p>{{ person.job }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tmdbApi from "../services/tmdb-api";

export default {
  created() {
    tmdbApi.getMovieDetails(this.id).then(res => {
      this.movie = res.data;
    });
    tmdbApi.getMovieCredits(this.id).then(res => {
      this.movieCrew = res.data.crew;
    });
  },
  data() {
    return {
      movie: null,
      movieCrew: null,
    };
  },
  filters: {
    minutesToHours: function (value) {
      const hours = (value / 60);
      const rhours = Math.floor(hours);
      const minutes = (hours - rhours) * 60;
      const rminutes = Math.round(minutes);
      return rhours != 0 ? rhours + "h" + " " + rminutes + "m" : rminutes + "m";
    }
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

    .crew {
      display: flex;
      
      div {
        margin-right: 40px;
      }

    }

  }

</style>
