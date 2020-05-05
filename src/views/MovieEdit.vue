<template>
  <section id="movie">
    <MovieDetailsEdit :id="id" />
    <MovieCastEdit :id="id" />
    <MovieDocuEdit />
    <!-- <MovieImages :id="id" /> -->
  </section>
</template>

<script>
  import MovieDetailsEdit from "@/components/Movie/MovieEdit/MovieDetailsEdit.vue";
  import MovieCastEdit from "@/components/Movie/MovieEdit/MovieCastEdit.vue";
  import MovieDocuEdit from "@/components/Movie/MovieEdit/MovieDocuEdit.vue";

  export default {
    created() {
      this.id = this.$route.params.id;
    },
    data() {
      return {
        id: null
      };
    },
    name: "MovieEdit",
    components: {
      MovieDetailsEdit,
      MovieCastEdit,
      MovieDocuEdit
    }
  };
</script>
