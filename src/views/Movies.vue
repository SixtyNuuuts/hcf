<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <MoviesListByYear :year="year" />
  </div>
</template>

<script>
import MoviesListByYear from "@/components/MoviesListByYear.vue";

export default {
  created() {
    this.year = this.$route.params.year;
  },
  data() {
    return {
      year: null
    };
  },
  name: "Movies",
  components: {
    MoviesListByYear
  }
};
</script>
