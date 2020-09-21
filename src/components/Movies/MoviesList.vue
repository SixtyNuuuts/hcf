<template>
  <section id="moviesother">
    <div class="moviesother_border">
      <div class="moviesother_container">
        <h1>D'AUTRES FILMS DE {{ year }}</h1>
        <div v-if="!movies.length" class="error-mess"> <img src="@/assets/img/404-error-brown.svg" alt="Logo Error 404" /> {{ loadingErrorMess }}</div>
        <div class="moviesother_list">
          <div v-for="(movie, index) in movies" :key="index">
            <img src="../../assets/img/icon-film.svg" alt="icon film" ><router-link :to="'/film/' + movie.id">{{ movie.original_title }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "MoviesList",
  props: {
    movies: Array,
    year: Number
  },
  data() {
    return {
      loadingErrorMess: 'Erreur lors du chargement des films, essayez de recharger la page ou de réessayer ultérieurement'
    };
  },
}
</script>

<style scoped lang="scss">
  @import '../../styles/bp.scss';  
  @import '../../styles/color.scss';  
  @import '../../styles/shadow.scss';  

  #moviesother {
    box-shadow: $--box-shadow-dark-4;
    position: relative;
    width: 100%;
    left: 0;

    .moviesother_border {
      background: url('../../assets/img/content-tail-left.png') repeat-y 0 0, url('../../assets/img/content-tail-right.png') repeat-y right 0;
      padding: 0 3px;
      position: relative;
      width: 100%;
      left: -3px;

      .moviesother_container {
        background: url('../../assets/img/main-pattern.jpg') repeat scroll left top;
        padding: 2%;
        padding-bottom: 3%;

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

        h1 {
          font-family: "Righteous";
          color: $--color-hcf-ddark-brown;
          font-size: 1.5em;
          margin: 0.7em;
          margin-bottom: .9em;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
          position: relative;

          &:before, &:after {
            content: '';
            content: '';
            position: absolute;
            top: 0.1em;
            display: block;
            width: 32%;
            height: 22px;
            background: url("../../assets/img/box-border-patern.png") repeat 0 0;
          }

          &:before {
            left: 1.5%;
          }

          &:after {
            right: 1.5%;
          }

        }

        .moviesother_list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          overflow: auto;

          div {
            margin: 0.5em 0.7em;
            font-size: 1em;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            img {
              height: 18px;
              width: 18px;
              position: relative;
              left: -3px;
              top: -1px;
            }

            a {
              color: $--color-hcf-dark-brown;
              font-weight: 600;
              border-top: 1px solid $--color-hcf-ddark-beige ;
              border-bottom: 1px solid $--color-hcf-ddark-beige ;
              display: block;
              padding: 0.15em 0 0.25em 0;
              transition: .2s ease;

              &:hover {
                color: $--color-hcf-red;
              }

            }

          }

        }

      }

    }

  }

  @media (min-width: $--bp-lg) { 
    
    #moviesother {
      width: 110%;
      left: -4.8%;

      .moviesother_border {
        width: 101%;
        left: -1%;
      }

    }

  }

</style>
