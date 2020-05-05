<template>
  <section class="movie-info" :style="{ backgroundImage: 'url(' +  movie.backdrop_path + ')' }">
    <div class="content">
      <div class="poster">
        <img v-if="movie.poster_path" :src="movie.poster_path">
        <div v-else class="no-poster">
          <i class="el-icon-picture"></i>
        </div>
      </div>
      <div class="text">
        <div class="title">
          <h1 v-if="movie.original_title">{{ movie.original_title }} <span v-if="movie.release_date" class="release_date">({{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }})</span></h1>
          <div class="facts">
            <span v-if="movie.release_date" class="fact release">
              {{ movie.release_date  | dateParse('YYYY-MM-DD') | dateFormat('DD/MM/YYYY') }} <span v-if="movie.production_countries[0]">({{ movie.production_countries[0].iso_3166_1}})</span>
            </span>
            <ul v-if="movie.genres.length > 0" class="fact genres">
              <span class="point"></span>
              <li v-for="(genre, index) in movie.genres" :key="genre.id">
                {{ genre.name }}
                <span v-if="index != movie.genres.length-1">, </span>
              </li>
            </ul>
            <span v-if="movie.runtime" class="fact runtime">
              <span class="point"></span>
              {{ movie.runtime | minutesToHours() }}
            </span>
          </div>
        </div>
        <div>
          <div v-if="movie.overview" id="overview">
            <h3>Résumé</h3>
            <div v-if="movie.overview" class="overview">
              <p>{{ movie.overview }}</p>
            </div>
          </div>
          <div v-if="movieCrew.length > 0" id="crew">
            <h3>l'Équipe technique</h3>
            <CrewCarousel :movieCrew="movieCrew" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tmdbApi from "../../services/tmdb-api"
import CrewCarousel from "@/components/Movie/Carousel/CrewCarousel.vue"

export default {
  name: "MovieDetails",
  props: {
    id: String
  },
  components: {
    CrewCarousel
  },
  created() {
    tmdbApi.getMovieDetails(this.id).then(res => {
      this.movie = res.data
      this.backdropPath()
      this.posterPath()
    })
    tmdbApi.getMovieCredits(this.id).then(res => {
      this.movieCrewFormat(res.data.crew)
    })
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
        { "id": null, "jobs": [], "name": null, "priority": null, "profile_path": null}
      ]
    }
  },
  methods: {
    movieCrewFormat(dataCrew) {
      const movieCrewFormat = []
      const jobsTranslation = [
        {
          "job": "Director",
          "jobTranslatationM":"Réalisateur",
          "jobTranslatationF":"Réalisatrice",
          "priority":0
        },
        {
          "job": "Writer",
          "jobTranslatationM":"Scénariste",
          "jobTranslatationF":"Scénariste",
          "priority":2
        },
        {
          "job": "Scenario Writer",
          "jobTranslatationM":"Scénariste",
          "jobTranslatationF":"Scénariste",
          "priority":2
        },
        {
          "job": "Screenplay",
          "jobTranslatationM":"Scénariste",
          "jobTranslatationF":"Scénariste",
          "priority":2
        },
        {
          "job": "Assistant Director",
          "jobTranslatationM":"Assistant Réalisateur",
          "jobTranslatationF":"Assistant Réalisatrice",
          "priority":3
        },
        {
          "job": "Producer",
          "jobTranslatationM":"Producteur",
          "jobTranslatationF":"Productrice",
          "priority":3
        },
        {
          "job": "Novel",
          "jobTranslatationM":"Roman",
          "jobTranslatationF":"Roman",
          "priority":3
        },
        {
          "job": "Editor",
          "jobTranslatationM":"Monteur",
          "jobTranslatationF":"Monteuse",
          "priority":4
        },
        {
          "job": "Music",
          "jobTranslatationM":"Musique",
          "jobTranslatationF":"Musique",
          "priority":4
        },
        {
          "job": "Sound",
          "jobTranslatationM":"Son",
          "jobTranslatationF":"Son",
          "priority":4
        },
        {
          "job": "Production Design",
          "jobTranslatationM":"Chef décorateur",
          "jobTranslatationF":"Chef décoratrice",
          "priority":4
        },
        {
          "job": "Set Decoration",
          "jobTranslatationM":"Décorateur",
          "jobTranslatationF":"Décoratrice",
          "priority":4
        },
        {
          "job": "Director of Photography",
          "jobTranslatationM":"Directeur de la photographie",
          "jobTranslatationF":"Directrice de la photographie",
          "priority":4
        },
        {
          "job": "Still Photographer",
          "jobTranslatationM":"Photographe",
          "jobTranslatationF":"Photographe",
          "priority":4
        },
        {
          "job": "Conductor",
          "jobTranslatationM":"Chef d'orchestre",
          "jobTranslatationF":"Chef d'orchestre",
          "priority":4
        },
        {
          "job": "Original Music Composer",
          "jobTranslatationM":"Compositeur de la bande originale",
          "jobTranslatationF":"Compositrice de la bande originale",
          "priority":4
        },
        {
          "job": "Adaptation",
          "jobTranslatationM":"Adaptation",
          "jobTranslatationF":"Adaptation",
          "priority":4
        },
      ]
      dataCrew.forEach( person => {
        let jobIsInArray = jobsTranslation.find(p => p.job == person.job)
        if (jobIsInArray){
          let personJob = jobIsInArray.jobTranslatationM
          if(person.gender==1) {
            personJob = jobIsInArray.jobTranslatationF
          }
          let personPriority = jobIsInArray.priority
          let personIsInArray = movieCrewFormat.find(p => p.id == person.id)
          if(!personIsInArray) {
            movieCrewFormat.push({
              id: person.id, 
              jobs: [
                {name: personJob}
              ],
              name: person.name,
              priority: personPriority,
              profile_path: person.profile_path
            })
          } else {
            personIsInArray.jobs = [...personIsInArray.jobs, {name: personJob}]
            if(personIsInArray.priority > personPriority) {
              personIsInArray.priority = personPriority
            }
          }
        }
      })
      movieCrewFormat.sort(function (person1, person2) {
        return person1.priority  - person2.priority
      })
      this.movieCrew = movieCrewFormat
    },
    backdropPath() {
      let backdropPath = null
      if(this.movie.backdrop_path) {
        backdropPath = "https://image.tmdb.org/t/p/original" + this.movie.backdrop_path
      } else {
        backdropPath = require("../../assets/img/backdrop_default.jpg")
      }
      this.movie.backdrop_path = backdropPath
    },
    posterPath() {
      let posterPath = null
      if(this.movie.poster_path) {
        posterPath = "https://image.tmdb.org/t/p/w300" + this.movie.poster_path
      }
      this.movie.poster_path = posterPath
    }
  }
}
</script>

<style scoped lang="scss">

  section.movie-info {
    background-size: cover;
    background-repeat: no-repeat;   

    .content {
      display: flex;
      text-align: left;
      padding: 4.5em 3em 3em 3em;
      position: relative;
      background-image: linear-gradient(to right, #0e0e0ede 150px, rgba(2, 2, 0, 0.88) 100%);

      .poster {
        margin-right: 40px;

        img {
          width: 290px;
          height: 430px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.66), 0 6px 6px rgba(0, 0, 0, 0.81);
        }
        
        .no-poster {
          background-color: lightgrey;
          width: 290px;
          height: 430px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.66), 0 6px 6px rgba(0, 0, 0, 0.81);

          i {
            font-size: 8rem;
            color: #b5b5b5;
          }

        }

      }

      .text {
        color: #f6e5c8;

        .title {
          margin-bottom: 40px;

          h1 {
            margin: 0;
            font-size: 2.2rem;
            font-weight: 800;
            line-height: 1;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            color: #f8f0e0;

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

              &:not(:first-child) {
                margin-left: 20px;
              }

              span.point {
                display: block;
                width: 5px;
                height: 5px;
                background-color: #f6e5c8;
                position: absolute;
                top: 9px;
                left: -12px;
                border-radius: 50%;
              }

            }

            .genres {
              display: flex;
              padding: 0;
              margin-top: 0;
              margin-bottom: 0;

              li:not(:last-child) {
                margin-right: 7px;
              }

            }
            
          }

        }

        div {

          h3 {
            margin: 0;
            text-transform: uppercase;
            font-size: 1em;
            color: #f8f0e0;
            margin-bottom: 0.1em;
          }

          #overview {
            margin-bottom: 40px;

            .overview {
              p{
                margin: 0;
              }

            }

          }

        }

      }

    }

  }

</style>
