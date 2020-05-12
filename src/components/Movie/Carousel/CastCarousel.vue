<template>
    <carousel :navigationEnabled="true" :perPage="1" :perPageCustom="[[440,2], [600,3], [800, 4], [992, 5]]" :paginationEnabled="false" navigationNextLabel="" navigationPrevLabel="" :navigationClickTargetSize="15">
      <slide v-for="actor in movieCast" :key="actor.id">
        <a href="" class="card">
          <div class="picture">
            <img v-if="actor.profile_path" :src="actor.profile_path">
            <div v-else class="no-picture">
              <img v-if="actor.gender == 1" src="../../../assets/img/p-female.svg" />
              <img v-else src="../../../assets/img/p-male.svg" />
            </div>
          </div>
          <div class="text">
            <h1>{{ actor.name }}</h1>
            <p class="character">{{ actor.character }}</p>
          </div>
        </a>
      </slide>
    </carousel>
</template>

<script>

export default {
  name: "CastCarousel",
  props: {
    movieCast: Array
  }
};
</script>

<style scoped lang="scss">
  @import '../../../styles/color.scss';  
  @import '../../../styles/shadow.scss';  

  .card {
    display: flex;
    flex-direction: column;
    padding: .8em;
    background-color: #fff;
    box-shadow: $--box-shadow-2;
    margin: 1em;
    transition: .2s ease;
    position: relative;
    top: 0;

    &:hover {
      box-shadow: $--box-shadow-4;
      top: -.2em;
    }

    .picture {
      width: 100%;
      height: 9em;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $--color-hcf-light-grey;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .no-picture {
        width: 100%;
        height: 100%;
        background-color: $--color-hcf-light-grey;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 110%;
          position: relative;
          bottom: -1em;
        }
      }

    }

    .text {
      padding: 0.05em;
      margin-top: 0.7em;
      color: $--color-hcf-black;
      text-align: left;
      line-height: 1.05;

      h1 {
        margin: 0;
        font-size: 1em;
      }

      p {
        font-size: 0.8em;
        margin: 0;
        margin-top: 0.2em;
      }

    }

  }


</style>
