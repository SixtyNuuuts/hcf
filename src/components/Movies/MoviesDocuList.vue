<template>
  <section id="moviesdocu">
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
          <div class="moviedocu_entry">
              {{ movie.overview }}
          </div>
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
}
</script>

<style scoped lang="scss">
  @import '../../styles/color.scss';  
  @import '../../styles/bp.scss';  
  @import '../../styles/shadow.scss';  

  #moviesdocu {
    display: flex;
    justify-content: center;
    margin-bottom: 3em;
    flex-wrap: wrap;
    
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
          justify-content: flex-start;
          align-items: center;
          padding: 1em;
          height: 100%;
          box-sizing: border-box;

          h3 {
            font-weight: 700;
            font-size: 1.3em;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 1.1;
            margin: 0;
            margin-bottom: 2em;
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
              bottom: -1em;
              background: url("../../assets/img/sep-3-stars.svg") no-repeat center 0;
            }

          }

          .moviedocu_image {
            width: 70%;
            margin-bottom: 3em;
            position: relative;
            display: flex;
            justify-content: center;

            img {
              width: 100%;
              box-shadow: $--box-shadow-dark-2;
            }

            &::after {
              content: '';
              display: block;
              height: 10px;
              width: 100%;
              position: absolute;
              bottom: -2em;
              background: url("../../assets/img/sep-1-star.svg") no-repeat center 0;
            }

          }

          .moviedocu_entry {
            font-size: 0.8em;
            line-height: 1.3em;
            max-height: 6em;
            overflow: auto;
            font-style: italic;
            padding: 0 0.5em 0.4em 0.5em;
          }
          
        }

      }

    }
    
  }

  @media (min-width: $--bp-sm) { 
    #moviesdocu {
      .moviedocu_wrap {
        width: 20%;
      }
    }
  }

  @media (min-width: $--bp-lg) { 
    #moviesdocu {
      .moviedocu_wrap {
        width: 25%;
      }
    }
  }

</style>
