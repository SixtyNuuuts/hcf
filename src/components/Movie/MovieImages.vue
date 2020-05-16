<template>
  <section class="movie-images">
  <el-carousel height="500px" :interval="4000">
    <el-carousel-item v-for="(img, i) in movieImages" :key="i">
      <img :src="img.src" class="image">
    </el-carousel-item>
  </el-carousel>
  <vue-preview :slides="movieImages"></vue-preview>
  </section>
</template>

<script>

export default {
  name: "MovieImages",
  props: {
    movieImages: Array
  },
  mounted() {
    this.movieImages.forEach(img => {
      if(!img.msrc) {
        img.msrc = img.src
      }
    })
  }
};
</script>

<style lang="scss">
.movie-images {
  background-color: black;

  .image {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

}
</style>

