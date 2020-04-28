<template>
  <div id="moviesdocu_container">
    <div v-for="(movie, index) in movies" :key="index" class="moviedocu_wrap">
      <div class="moviedocu_box">
        <h3>{{ movie.original_title }}</h3>
        <div class="moviedocu_image">
          <a href="#" target="_blank">
            <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path">
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
  </div>
</template>

<script>

export default {
  name: "MoviesDocuList",
  props: {
    movies: Array
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  #moviesdocu_container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    
    .moviedocu_wrap {
      flex-basis: 30%;
      box-shadow: 0 0 13px rgba(63,48,22,0.12);
      background: #fdf1db;
      padding: 10px;
      
      .moviedocu_box {
        background: #fdf1db;
        border: 1px solid #ceb792;
        padding: 21px 10px 16px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 480px;

        h3 {
          margin: 0;
          color: #a51f1e;
          font-family: "Bazar";
          font-size: 1.64em;
          line-height: 1.4;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
          text-align: center;
          letter-spacing: -1px;
          padding: 0 0 42px;
          text-transform: uppercase;

          &::after {
            content: '';
            display: block;
            height: 1px;
            width: 40%;
            position: relative;
            top: 21px;
            left: 30%;
            background-color: #000;
          }

        }

        .moviedocu_image {
          width: 70%;

          img {
            box-shadow: 0 0 10px rgba(27, 20, 7, 0.514);
            width: 100%;
          }
        }

        .moviedocu_entry {
          color: #000;
          font-family: 'Baskerville';
          line-height: 1.4;
          padding: 12px 14px 0;
        }
        
      }

    }
    
  }

</style>
