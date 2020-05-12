<template>
    <carousel :navigationEnabled="true" :perPage="1" :perPageCustom="[[576, 2], [768, 3], [992, 4], [1200, 4]]" :paginationEnabled="false" navigationNextLabel="" navigationPrevLabel="" :navigationClickTargetSize="15">
      <slide v-for="person in movieCrew" :key="person.id" class="person">
        <div>
          <a href="" class="picture">
            <img v-if="person.profile_path" :src="person.profile_path">
            <div v-else class="no-picture">
              <img v-if="person.gender == 1" src="../../../assets/img/p-female.svg" />
              <img v-else src="../../../assets/img/p-male.svg" />
            </div>
          </a>
          <h4 class="name"><a href="">{{ person.name }}</a></h4>
          <ul class="jobs">
            <li v-for="job in person.jobs" :key="job.name">{{ job.name }}</li>
          </ul>
        </div>
      </slide>
    </carousel>
</template>

<script>

export default {
  name: "CrewCarousel",
  props: {
    movieCrew: Array
  },
};
</script>

<style scoped lang="scss">

  @import '../../../styles/color.scss';  
  @import '../../../styles/shadow.scss';  

  .person {
    
    >div {
      padding: 1em;
      display: flex;
      flex-direction: column;
      align-items: center;

      .picture {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 55px;
          height: 55px;
          overflow: hidden;
          border-radius: 50%;
          border: 3px solid $--color-hcf-llight-beige;
          background-color: $--color-hcf-light-grey;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .no-picture {
            img {
              position: relative;
              top: 0.3em;
              width: 98.4%;
            }
          }

      }

      h4 {
          margin: 0.3em 0;
          text-align: center;
          line-height: 1.15;

          a {
            color: $--color-hcf-llight-beige;
          }

      }

      ul {
          margin: 0;
          text-align: center;
          padding: 0;
          font-size: 0.9em;
          line-height: 1.2;
      }
    }
  }



</style>
