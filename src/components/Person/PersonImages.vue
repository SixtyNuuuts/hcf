<template>
  <section class="person-images">
  <el-carousel height="500px" :interval="4000">
    <el-carousel-item v-for="(img, i) in personImages" :key="i">
      <img :src="img.src" class="image">
    </el-carousel-item>
  </el-carousel>
  <vue-preview :slides="personImages"></vue-preview>
  </section>
</template>

<script>

export default {
  name: "PersonImages",
  props: {
    personImages: Array
  },
  mounted() {
    this.personImages.forEach(img => {
      if(!img.msrc) {
        img.msrc = img.src
      }
    })
  }
};
</script>

<style lang="scss">
.person-images {
  background-color: black;
  padding-top: 2rem;

  .image {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

}
</style>

