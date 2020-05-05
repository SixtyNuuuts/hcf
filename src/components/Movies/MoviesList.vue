<template>
  <section id="moviesother">
    <div class="moviesother_border">
      <div class="moviesother_container">
        <h1>D'AUTRES FILMS DE {{ year }}</h1>
        <div class="moviesother_list">
          <div v-for="(movie, index) in movies" :key="index">
            <router-link :to="'/film/' + movie.id">{{ movie.original_title }}</router-link>
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
}
</script>

<style scoped lang="scss">

#moviesother {
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3), 0 10px 12px rgba(0, 0, 0, 0.22);
  position: relative;
  width: 110%;
  left: -4.8%;

  .moviesother_border {
    background: url('../../assets/img/content-tail-left.png') repeat-y 0 0, url('../../assets/img/content-tail-right.png') repeat-y right 0;
    padding: 0 3px;
    position: relative;
    width: 101%;
    left: -1%;

    .moviesother_container {
      background: url('../../assets/img/main-pattern.jpg') repeat scroll left top;
      padding: 2%;
      padding-bottom: 4%;

      h1 {
        font-family: "Bazar";
        color: #2b1d07;
        font-size: 1.5em;
        margin-bottom: .9em;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
      }

      .moviesother_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow: auto;

        div {
          margin: 8px 15px;
          font-size: 1em;
          border-top: 1px solid #cdbfac ;
          border-bottom: 1px solid #cdbfac ;
          display: flex;
          justify-content: center;
          align-items: center;

          a {
            color: #472900;
            font-weight: 600;
          }

        }

      }

    }

  }

}

</style>
