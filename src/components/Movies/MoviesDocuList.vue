<template>
  <section id="moviesdocu" :class="{'is-loading' : isLoading}">
    <div v-if="loadingErrorMess" class="error-mess"> <img src="@/assets/img/404-error-brown.svg" alt="Logo Error 404" /> {{ loadingErrorMess }}</div>
     <router-link v-for="(movie, index) in movies" :to="'/film/' + movie.id" :key="index" class="moviedocu_wrap"  :style="{ backgroundImage: 'url(' +  movie.backdrop_path + ')' }">
      <div>
        <div class="moviedocu_box">
          <h3>{{ movie.original_title }}</h3>
          <div class="moviedocu_image">
            <a href="#" target="_blank">
              <img v-if="movie.poster_path" :src="movie.poster_path">
              <div v-else class="no-poster">
                <i class="fa fa-file-image-o" aria-hidden="true"></i>
              </div>
            </a>
          </div>
          <div class="moviedocu_directors">
              <div v-for="director in movie.directors" :key="director">
                <img src="../../assets/img/icon-clap.svg" alt="icon clap">
                <p>{{ director }}</p>
              </div>
          </div>
          <!-- <div class="moviedocu_overview">
              {{ movie.overview }}
          </div> -->
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>

export default {
  name: "MoviesDocuList",
  props: {
    movies: Array
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    loadingErrorMess() {
      return this.$store.state.loadingErrorMess;
    },
  }
}
</script>

<style scoped lang="scss">
  @import '../../styles/color.scss';  
  @import '../../styles/bp.scss';  
  @import '../../styles/shadow.scss';  

  #moviesdocu {
    display: flex;
    justify-content: center;
    margin-top: 1.5em;
    margin-bottom: 3em;
    flex-wrap: wrap;
    
    .error-mess {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 14rem;
      font-size: 1.2em;
      max-width: 33rem;
      margin: auto;
      img {
        width: 3rem;
        margin-bottom: 1rem;
      }
    }

    &.is-loading {
      background: url('../../assets/img/loader-Spin-1s-74px.gif') no-repeat center;
      min-height: 20rem;
    }
    
    .moviedocu_wrap {
      box-shadow: $--box-shadow-1;
      background-color: $--color-hcf-black;
      width: 85%;
      min-width: 190px;
      margin: 1em;
      color: $--color-hcf-light-beige;
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;   
      position: relative;
      top:0;
      transition: .2s ease-out;

      &:hover {
        box-shadow: $--box-shadow-3;
        top: -0.6em;

      }

      >div {
        background-color: rgba(2, 2, 0, 0.88);
        padding: .8em;
        height: 100%;
        box-sizing: border-box;

        .moviedocu_box {
          border: 1px solid $--color-hcf-ddark-beige;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: .8rem;
          height: 100%;
          box-sizing: border-box;

          h3 {
            font-weight: 700;
            font-size: 1.25em;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 1.1;
            margin: 0;
            margin-bottom: 1.7em;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;

            &::after {
              content: '';
              display: block;
              height: 10px;
              width: 85%;
              position: absolute;
              bottom: -1.15em;
              background: url("../../assets/img/sep-3-stars.svg") no-repeat center 0;
            }

          }

          .moviedocu_image {
            width: 80%;
            margin-bottom: 2rem;
            position: relative;
            display: flex;
            justify-content: center;
            max-height: none;

            img {
              height: initial;
              width: 100%;
              box-shadow: $--box-shadow-dark-2;
            }

            a {
              width: 100%;
              .no-poster {
                background-color: lightgrey;
                width: 100%;
                height: 185px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.66),
                  0 6px 6px rgba(0, 0, 0, 0.81);

                i {
                  font-size: 8rem;
                  color: #b5b5b5;
                }
              }

            }

          }

          .moviedocu_directors {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            div {
              display: flex;
              justify-content: center;

              img {
                width: .6rem;
                margin-right: .4rem;
                position: relative;
                top: -1px;
              }
              p {
                text-align: left;
                margin: 0.3rem 0;
                line-height: 1.2;
                font-size: 0.8rem;
              }
            }

            &::before {
              content: '';
              display: block;
              height: 10px;
              width: 80%;
              position: absolute;
              top: -0.95em;
              background: url("../../assets/img/sep-1-star.svg") no-repeat center 0;
            }
          }

          // .moviedocu_overview {
          //   font-size: 0.8em;
          //   line-height: 1.3em;
          //   max-height: 6em;
          //   overflow: auto;
          //   font-style: italic;
          //   padding: 0 0.5em 0.4em 0.5em;
          // }
          
        }

      }

    }
    
  }
  @media (min-width: $--bp-sm) { 
    #moviesdocu {
      .moviedocu_wrap {
        width: 20%;
        > div {
          .moviedocu_box {
            .moviedocu_image {
              max-height: 9rem;
              img {
                height: 100%;
                width: initial;
              }
            }
          }
        }
      }
    }
  }

  // @media (min-width: $--bp-lg) { 
  //   #moviesdocu {
  //     .moviedocu_wrap {
  //       width: 10%;
  //     }
  //   }
  // }

</style>
