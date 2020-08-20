<template>
  <section class="images-gallery">
  <el-carousel height="500px" :interval="4000" indicator-position="none">
    <el-carousel-item v-for="(img, i) in images" :key="i">
      <img :src="img.src" class="image">
    </el-carousel-item>
  </el-carousel>
  <vue-preview :slides="images"></vue-preview>
  </section>
</template>

<script>

export default {
  name: "ImagesGallery",
  props: {
    images: Array,
    type: String,
  },
  mounted() {
    this.images.forEach(img => {
      if(!img.msrc) {
        img.msrc = img.src
      }
    })
  }
};
</script>

<style lang="scss">
.images-gallery {
  background-color: black;
  padding-top: 2rem;

  .image {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

}
</style>

