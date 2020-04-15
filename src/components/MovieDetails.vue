<template>
  <section class="movie-info">
    <div class="poster">
      <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path">
      <div v-else class="no-poster">
        <i class="fa fa-file-image-o" aria-hidden="true"></i>
      </div>
    </div>
    <div class="text">
      <div class="title">
        <h1 v-if="movie.original_title">{{ movie.original_title }} <span v-if="movie.release_date" class="release_date">({{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }})</span></h1>
        <div class="facts">
          <span v-if="movie.release_date" class="fact release">
            {{ movie.release_date  | dateParse('YYYY-MM-DD') | dateFormat('DD/MM/YYYY') }} <span v-if="movie.production_countries[0]">({{ movie.production_countries[0].iso_3166_1}})</span>
          </span>
          <ul v-if="movie.genres" class="fact genres">
            <li v-for="(genre, index) in movie.genres" :key="genre.id">
              {{ genre.name }}
              <span v-if="index != movie.genres.length-1">, </span>
            </li>
          </ul>
          <span v-if="movie.runtime" class="fact runtime">
            {{ movie.runtime | minutesToHours() }}
          </span>
        </div>
      </div>
      <div>
        <h3>Synopsis</h3>
        <div v-if="movie.overview" class="overview">
          <p>{{ movie.overview }}</p>
        </div>
        <div v-if="movieCrew" class="crew">
          <div v-for="person in movieCrewFormat" :key="person[0]">
            <p><a href="">{{ person[2] }}</a></p>
            <p v-for="job in person[1]" :key="job">{{ job }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <div v-if="movie.vote_average" class="score">{{ movie.vote_average }}</div> -->
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
      movie: {
        "backdrop_path": null,
        "genres": [
            {
                "id": null,
                "name": null
            }
        ],
        "id": null,
        "original_title": null,
        "overview": null,
        "poster_path": null,
        "release_date": "1930-01-01",
        "runtime": null,
        "vote_average": null,
        "production_countries": [
            {
                "iso_3166_1": null,
                "name": null
            }
        ]
      },
      movieCrew: [
        {"id": null, "name": null, "job": null}
      ]
    };
  },
  computed: {

    movieCrewFormat: function() {
      const movieCrewFormat = [];
      const jobsTranslation = [
        {
          "job": "Writer",
          "jobTranslatationM":"Scénariste",
          "jobTranslatationF":"Scénariste",
        },
        {
          "job": "Scenario Writer",
          "jobTranslatationM":"Scénariste",
          "jobTranslatationF":"Scénariste",
        },
        {
          "job": "Screenplay",
          "jobTranslatationM":"Scénariste",
          "jobTranslatationF":"Scénariste",
        },
        {
          "job": "Director",
          "jobTranslatationM":"Réalisateur",
          "jobTranslatationF":"Réalisatrice",
        },
        {
          "job": "Assistant Director",
          "jobTranslatationM":"Assistant Réalisateur",
          "jobTranslatationF":"Assistant Réalisatrice",
        },
        {
          "job": "Editor",
          "jobTranslatationM":"Monteur",
          "jobTranslatationF":"Monteuse",
        },
        {
          "job": "Music",
          "jobTranslatationM":"Musique",
          "jobTranslatationF":"Musique",
        },
        {
          "job": "Production Design",
          "jobTranslatationM":"Chef décorateur",
          "jobTranslatationF":"Chef décoratrice",
        },
        {
          "job": "Set Decoration",
          "jobTranslatationM":"Décorateur",
          "jobTranslatationF":"Décoratrice",
        },
        {
          "job": "Director of Photography",
          "jobTranslatationM":"Directeur de la photographie",
          "jobTranslatationF":"Directrice de la photographie",
        },
        {
          "job": "Still Photographer",
          "jobTranslatationM":"Photographe",
          "jobTranslatationF":"Photographe",
        },
        {
          "job": "Producer",
          "jobTranslatationM":"Producteur",
          "jobTranslatationF":"Productrice",
        },
        {
          "job": "Novel",
          "jobTranslatationM":"Roman",
          "jobTranslatationF":"Roman",
        },
        {
          "job": "Conductor",
          "jobTranslatationM":"Chef d'orchestre",
          "jobTranslatationF":"Chef d'orchestre",
        },
        {
          "job": "Sound",
          "jobTranslatationM":"Son",
          "jobTranslatationF":"Son",
        },
        {
          "job": "Adaptation",
          "jobTranslatationM":"Adaptation",
          "jobTranslatationF":"Adaptation",
        },
        {
          "job": "Original Music Composer",
          "jobTranslatationM":"Compositeur de la bande originale",
          "jobTranslatationF":"Compositrice de la bande originale",
        },
      ];
      this.movieCrew.forEach( person => {
        let jobIsInArray = jobsTranslation.find(v => v.job == person.job);
        if (jobIsInArray){
          
          let personJob = jobIsInArray.jobTranslatationM;
          if(person.gender==1) {
            personJob = jobIsInArray.jobTranslatationF;
          }

          let personIsInArray = movieCrewFormat.find(v => v[0] == person.id);
          if(!personIsInArray) {
            movieCrewFormat.push([
              person.id, 
              [
                personJob
              ],
              person.name
            ]);
          } else {
            personIsInArray[1] = [...personIsInArray[1], personJob];
          }
        }
      });
      return movieCrewFormat;
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
    background-color: #e2e1e0;
    padding: 40px;
    position: relative;

    .poster {
      margin-right: 40px;

      img {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      }
      
      .no-poster {
        background-color: lightgrey;
        width: 300px;
        height: 450px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

        i {
          font-size: 8rem;
          color: #b5b5b5;
        }

      }

    }

    .text {
      overflow: auto;

      .title {
        margin-bottom: 20px;

        h1 {
          margin: 0;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1;

          span {
            opacity: 0.8;
            font-weight: 400;
          }

        }

        .facts {
          display: flex;
          margin-top: 3px;

          .fact {
            position: relative;

            &:not(:last-child) {
              margin-right: 20px;
            }

            &:not(:last-child):after {
              content: "";
              display: block;
              width: 5px;
              height: 5px;
              background-color: black;
              position: absolute;
              top: 8px;
              right: -13px;
              border-radius: 50%;
            }

          }

          .genres {
            display: flex;
            list-style: none;
            padding: 0;
            margin-top: 0;
            margin-bottom: 0;

            li:not(:last-child) {
              margin-right: 7px;
            }

          }
        }

      }

      h3 {
        margin: 0;
      }

      .overview {

        p{
          margin: 0;
        }

      }

      .crew {
        display: flex;
        
        div {
          margin-right: 40px;
        }

      }
    }

  }

</style>
