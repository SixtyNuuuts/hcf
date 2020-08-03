<template>
  <section class="person-info" :style="{ backgroundImage: backgroundImage }">
    <div class="content">
      <div class="poster">
        <img v-if="person.profile_path" :src="person.profile_path">
        <div v-else class="no-picture">
          <img v-if="person.gender == 1" src="@/assets/img/p-female.svg" />
          <img v-else src="@/assets/img/p-male.svg" />
        </div>
      </div>
      <div class="text">
        <h1 v-if="person.name">{{ person.name }}<span v-if="person.known_for_department">({{ person.known_for_department }})</span></h1>
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
        </div>
        <div>
          <div v-if="person.biography" id="biography">
            <h3>Biographie</h3>
            <div v-if="person.biography" class="biography">
              <p>{{ person.biography }}</p>
            </div>
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
    }
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
      background-image: linear-gradient(to right, #0e0e0ede 150px, rgba(2, 2, 0, 0.88) 100%);

      .poster {
        width: 100%;
        max-width: 310px;
        margin-bottom: 2em;

        img {
          width: 100%;
          box-shadow: $--box-shadow-dark-3;
        }
        
        .no-picture {
          background-color: $--color-hcf-light-grey;
          width: 280px;
          height: 310px;
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
        width: 80%;

        h1 {
          margin: 0;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
          margin-bottom: 1.3em;
          color: $--color-hcf-light-beige;

          span {
            opacity: 0.8;
            font-weight: 400;
            font-size: 1.7rem;
            display: block;
            position: relative;
            top:.4rem;
            left:0;
          }
          
        }

        .facts {
          display: flex;
          flex-direction: column;
          align-items: center;

          .fact {
            margin-bottom: 2.5em;
          }
          
        }

        div {

          h3 {
            margin: 0;
            text-transform: uppercase;
            font-size: 0.9em;
            line-height: 1.1;
            color: #f8f0e0;
            margin-bottom: 0.3em;
          }

          #biography {
            margin-bottom: .5em;

            .biography {
              p{
                margin: 0;
                line-height: 1.2;
              }

            }

          }

        }

      }

    }

  }

  @media (min-width: $--bp-sm) { 
    section.person-info {
      .content {
        .text {
          width: 75%;

          h1 {
            margin-bottom: .9em;

            span {
              display: inline;
              top: -0.1rem;
              left: .9rem;
            }
            
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
