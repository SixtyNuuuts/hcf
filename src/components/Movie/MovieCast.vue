<template>
  <section v-if="movieCast.length" class="movie-cast">
    <h1>Distribution</h1>
    <div class="actor-list">
      <CastCarousel :movieCast="movieCast" />
    </div>
  </section>
</template>

<script>
import CastCarousel from "@/components/Movie/Carousel/CastCarousel.vue";

export default {
  name: "MovieCast",
  props: {
    movieCast: Array
  },
  components: {
    CastCarousel
  }
};
</script>

<style scoped lang="scss">
  @import '@/styles/bp.scss';  

  section.movie-cast {
    padding: 1em 3em 1em 3em;

    h1 {
      font-family: "Righteous";
      color: #3a2104;
      font-size: 1.5em;
      margin-bottom: .9em;
      text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
      text-transform: uppercase;
      position: relative;
      margin-bottom: 10px;

      &:before, &:after {
        content: '';
        position: absolute;
        top: 14px;
        display: block;
        width: 16%;
        height: 2px;
        background-color: rgba(65, 38, 7, 0.09);
      }

      &:before {
        left: 0;
      }

      &:after {
        right: 0;
      }

    }

  }

  @media (min-width: $--bp-sm) { 
      section.movie-cast {
        h1 {
          &:before, &:after {
            width: 30%;
          }
        }
    }
  }

  @media (min-width: $--bp-md) { 
      section.movie-cast {
        h1 {
          &:before, &:after {
            width: 36%;
          }
        }
    }
  }

  @media (min-width: $--bp-lg) { 
      section.movie-cast {
        h1 {
          &:before, &:after {
            width: 39%;
          }
        }
    }
  }

</style>
