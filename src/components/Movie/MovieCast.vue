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

  section.movie-cast {
    padding-bottom: 30px;

    h1 {
      font-family: "Bazar";
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
        width: 37%;
        height: 2px;
        background-color: rgba(65, 38, 7, 0.09);
      }

      &:before {
        left: 4%;
      }

      &:after {
        right: 4%;
      }

    }

    .actor-list {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;      
    }

  }

</style>
