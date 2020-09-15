<template>
  <section class="person-info" :style="{ backgroundImage: backgroundImage }">
    <div class="content" :class="{'is-loading' : isLoading}">
      <div class="poster" :class="{'is-loading' : isLoading}">
        <img v-if="person.profile_path" :src="person.profile_path">
        <div v-else class="no-picture">
          <img v-if="person.gender == 1" src="@/assets/img/p-female.svg" />
          <img v-else src="@/assets/img/p-male.svg" />
        </div>
      </div>
      <div class="text">
        <div class="title">
          <h1 v-if="person.name">{{ person.name }}</h1>
          <div v-if="person.known_for_department" class="jobs"><span class="job" v-for="(job, index) in person.known_for_department" :key="index" >{{ job.name }}</span></div>
        </div>
        <div class="facts">
          <div v-if="person.birthday" class="fact">
            <h3>Date de naissance</h3>
            {{ person.birthday  | dateParse('YYYY-MM-DD') | dateFormat('DD/MM/YYYY') }}
          </div>
          <div v-if="person.place_of_birth" class="fact">
            <h3>Lieu de naissance</h3>
            {{ person.place_of_birth }}
          </div>
          <div v-if="person.deathday" class="fact">
            <h3>Date de décès</h3>
            {{ person.deathday  | dateParse('YYYY-MM-DD') | dateFormat('DD/MM/YYYY') }}
          </div>
          <div v-if="person.place_of_death" class="fact">
            <h3>Lieu de décès</h3>
            {{ person.place_of_death }}
          </div>
        </div>
        <div>
          <div v-if="person.biography" id="biography">
            <h3>Biographie</h3>
            <div v-if="person.biography" class="biography" v-html="person.biography"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "PersonDetails",
  props: {
    person: Object,
  },
  computed: {
    backgroundImage() {
      let backgroundImg = 'url(' +  require("@/assets/img/backdrop_default.jpg") + ')';
      if(this.person.profile_path) {
        backgroundImg = 'url(' +  this.person.profile_path + ')';
      }
      return backgroundImg;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  }
}
</script>

<style scoped lang="scss">

  @import '../../styles/bp.scss';  
  @import '../../styles/color.scss';  
  @import '../../styles/shadow.scss';  

  section.person-info {
    background-size: cover;
    background-repeat: no-repeat;   
    background-position: center;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 4.5em 3em 3em 3em;
      position: relative;
      background: linear-gradient(to right, #0e0e0ee1 150px, rgba(2, 2, 0, 0.88) 100%);

      &.is-loading {
        background: url('../../assets/img/loader-Bars-1s-108px.gif') no-repeat 64%, linear-gradient(to right, #0e0e0ee1 150px, rgba(2, 2, 0, 0.88) 100%);
      }

      .poster {
        width: 100%;
        max-width: 310px;
        margin-bottom: 2em;

        &.is-loading {
          .no-picture {
            background: url('../../assets/img/loader-Spin-1s-81px.gif') no-repeat center, black;
            img {
              display: none;;
            }
          }
        }

        img {
          width: 100%;
          box-shadow: $--box-shadow-dark-3;
        }
        
        .no-picture {
          background-color: $--color-hcf-light-grey;
          background: linear-gradient(0deg, rgba(181,181,181,1) 0%, rgba(181,181,181,1) 15%, rgba(214,212,209,1) 20%, rgba(214,212,209,1) 100%);
          width: 283px;
          height: 424px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: $--box-shadow-dark-3;

          img {
            width: 110%;
            position: relative;
            bottom: -0.9em;
            box-shadow: none;
          }

        }

      }

      .text {
        color: $--color-hcf-beige;
        line-height: 1.3;
        width: 100%;

        .title {
          margin-bottom: 1.9rem;

          h1 {
            margin: 0;
            font-size: 2.2rem;
            font-weight: 800;
            line-height: 1;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            color: $--color-hcf-light-beige;
            margin-bottom: 0.1rem;
          }

          .jobs {
            opacity: 0.8;
            font-weight: 400;
            font-size: 1.5rem;
            font-style: italic;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .job {
              &:not(:last-child) {
                margin-right: 1.3rem;
                &:after {
                  content:"/";
                  content: "/";
                  position: relative;
                  top: -0.1rem;
                  right: -0.7rem;
                  font-size: 1.2rem;
                }
              }
            }
          }
        }

        h3 {
          margin: 0;
          text-transform: uppercase;
          font-size: 0.9em;
          line-height: 1.1;
          color: #f8f0e0;
          margin-bottom: 0.3em;
        }

        .facts {
          display: flex;
          flex-direction: column;
          align-items: center;

          .fact {
            margin-bottom: 2.5em;
          }
          
        }

        .biography {
          // voir  le css dans App.vue 
          // p {
          //   margin: .5rem 0;
          // }
        }

      }

    }

  }

  @media (min-width: $--bp-sm) { 
    section.person-info {
      .content {
        .text {
          // width: 75%;

          h1 {
          }

          .facts {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            margin-bottom: 2.5em;

            .fact {
              margin: 0 2em;
              margin-top:0.2em;
            }
            
          }
        }

      }
    }
  }

  @media (min-width: $--bp-md) { 
    section.person-info {
      .content {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;

        .poster {
          width: 50%;
          margin-right: 3em;
          margin-bottom: 0;
        }

        .text {
          width: 60%;
          .title .jobs {
            justify-content: flex-start;
          }
          .facts {
            max-width: 28em;
            justify-content: flex-start;
            margin-bottom: 2em;

            .fact {
                &:first-child {
                margin-left: 0;
              }
            }
          }
        }

      }
    }
  }

</style>
