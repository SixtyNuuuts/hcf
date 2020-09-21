<template>
  <section class="movie-info" :style="{ backgroundImage: backgroundImage }">
    <el-button v-if="isAdmin" type="success" @click="btnEdit" class="btn-edit" icon="el-icon-edit">EDIT</el-button>
    <div class="content" :class="{'is-loading' : isLoading}">
      <div class="poster" :class="{'is-loading' : isLoading}">
        <img v-if="movie.poster_path" :src="movie.poster_path">
        <div v-else class="no-poster">
          <i class="el-icon-picture"></i>
        </div>
      </div>
      <div class="text">
        <div v-if="loadingErrorMess" class="error-mess"> <img src="@/assets/img/404-error-grey.svg" alt="Logo Error 404" /> {{ loadingErrorMess }}</div>
        <h1 v-if="movie.original_title">{{ movie.original_title }} <span v-if="movie.release_date" class="release_date">({{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }})</span></h1>
        <div class="facts">
          <div v-if="movie.release_date" class=" fact release">
            <h3>Date de Sortie</h3>
            {{ movie.release_date  | dateParse('YYYY-MM-DD') | dateFormat('DD/MM/YYYY') }}
          </div>
          <div v-if="movie.genres && movie.genres.length > 0" class="fact genres">
            <h3>Genre(s)</h3>
            <div v-for="(genre) in movie.genres" :key="genre.id">
              {{ genre.name }}
            </div>
          </div>
          <div v-if="movie.runtime" class="fact runtime">
            <h3>Durée</h3>
            {{ movie.runtime | minutesToHours() }}
          </div>
        </div>
        <div>
          <div v-if="movie.overview" id="overview">
            <h3>Synopsis</h3>
            <div v-if="movie.overview" class="overview" v-html="movie.overview"></div>
          </div>
          <div v-if="movieCrew && movieCrew.length > 0" id="crew">
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
  },
  methods: {
    btnEdit() {
      this.$router.push(({ name: 'film', params: { view: 'edit', id: this.movie.id }}));
      location.reload();
    },
  },
  computed: {
    backgroundImage() {
      let backgroundImg = 'url(' +  require("@/assets/img/backdrop_default.jpg") + ')';
      if(this.movie.backdrop_path) {
        backgroundImg = 'url(' +  this.movie.backdrop_path + ')';
      }
      return backgroundImg;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    loadingErrorMess() {
      return this.$store.state.loadingErrorMess;
    },
    isAdmin() {
      return this.$store.state.currentUser.admin;
    },
  }
}
</script>

<style scoped lang="scss">

  @import '../../styles/bp.scss';  
  @import '../../styles/color.scss';  
  @import '../../styles/shadow.scss';  

  section.movie-info {
    background-size: cover;
    background-repeat: no-repeat;   
    position: relative;

    .btn-edit {
      position: absolute;
      right:25px;
      top:25px;
      z-index: 400;
    }

    .error-mess {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 24rem;
      font-size: 1.2em;
      img {
        width: 3rem;
        margin-bottom: 1rem;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 4.5em 3em 3em 3em;
      position: relative;
      background: linear-gradient(to right, #0e0e0ede 150px, rgba(2, 2, 0, 0.88) 100%);

      &.is-loading {
        background: url('../../assets/img/loader-Bars-1s-108px.gif') no-repeat 64%, linear-gradient(to right, #0e0e0ede 150px, rgba(2, 2, 0, 0.88) 100%);
      }

      .poster {
        width: 100%;
        max-width: 310px;
        margin-bottom: 2em;
        transition: all .3s;

        &.is-loading {
          .no-poster {
            background: url('../../assets/img/loader-Spin-1s-81px.gif') no-repeat center, black;
            i {
              font-size: 0;
            }
          }
        }

        img {
          width: 100%;
          box-shadow: $--box-shadow-dark-3;
        }
        
        .no-poster {
          background-color: $--color-hcf-black;
          width: 280px;
          height: 420px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: $--box-shadow-dark-3;

          i {
            font-size: 8rem;
            color: #746e6d40;
          }

        }

      }

      .text {
        color: $--color-hcf-beige;
        line-height: 1.3;
        width: 100%;

        h1 {
          margin: 0;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
          margin-bottom: .9em;
          color: $--color-hcf-light-beige;

          span {
            opacity: 0.8;
            font-weight: 400;
          }

        }

        .facts {
          display: flex;
          flex-direction: column;
          align-items: center;

          .fact {
            margin-bottom: 2.5em;

            &.genres {
              >div {
                margin-bottom: 0.2em;
              }
            }
          }
          
        }

        div {

          h3 {
            margin: 0;
            text-transform: uppercase;
            font-size: .9em;
            color: #f8f0e0;
            margin-bottom: 0.3em;
          }

          #overview {
            margin-bottom: 2.5em;

            .overview {
              p{
                margin: 0;
                line-height: 1.2;
              }

            }

          }

          #crew {
            h3 {
              margin-bottom: .5em;
            }
          }

        }

      }

    }

  }

  @media (min-width: $--bp-sm) { 
    section.movie-info {
      .content {
        .text {

          .facts {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            margin-bottom: 2.5em;

            .fact {
              margin: 0 2em;
              margin-top:0.2em;
            }
            
          }
        }

      }
    }
  }

  @media (min-width: $--bp-md) { 
    section.movie-info {
      .content {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;

        .poster {
          width: 50%;
          margin-right: 3em;
          margin-bottom: 0;
        }

        .text {
          width: 60%;

          .facts {
            max-width: 28em;
            justify-content: flex-start;
            margin-bottom: 2em;

            .fact {
                &:first-child {
                margin-left: 0;
              }
            }
            

          }
        }

      }
    }
  }

</style>
