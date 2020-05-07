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
import CrewCarousel from "@/components/Movie/Carousel/CrewCarousel.vue"

export default {
  name: "MovieDetails",
  props: {
    movie: Object,
    movieCrew: Array,
  },
  components: {
    CrewCarousel
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
