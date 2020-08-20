<template>
  <section v-if="personCredits" class="person-filmo">
    <h1>Filmographie <span>{{ personCredits.length}} films</span></h1>
    <ul class="filmo-list">
      <li v-for="movie in personCredits" :key="movie.id" class="filmo-item">
        <router-link :to="'/film/' + movie.id">
          <div v-if="movie.release_date && movie.release_date!='0001-01-01'" class="year">{{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }}</div>
          <div v-else class="year">----</div>
          <div class="separator"></div>
          <div class="details">
            <div class="poster">
              <img v-if="movie.poster_path" :src="movie.poster_path">
              <div v-else class="no-poster">
                <i class="el-icon-picture"></i>
              </div>
            </div>
            <div class="infos">
              <h2 v-if="movie.original_title" class="title">{{ movie.original_title }}</h2>
              <div v-if="movie.job.length" class="role"><span v-for="job in movie.job" :key="job.name"><strong>{{ job.name }}</strong></span></div>
              <div v-if="movie.character.length" class="role"><span v-for="character in movie.character" :key="character.name">En tant que <strong>{{ character.name }}</strong></span></div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  name: "PersonFilmography",
  props: {
    personCredits: Array
  },
};
</script>

<style scoped lang="scss">
  @import '@/styles/color.scss';  
  @import '@/styles/shadow.scss';  

  section.person-filmo {
    padding: 0 1.5rem;
    padding-bottom: 1.6rem;
    position: relative;

    h1 {
      font-family: "Righteous";
      font-size: 1.5em;
      margin-bottom: .9em;
      text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
      text-transform: uppercase;
      position: relative;

      span {
        font-weight: 500;
        font-size: 1.15rem;
        position: relative;
        top: -0.05rem;
        left: 0.3rem;
        color: #a51f1e;
      }

      &:before, &:after {
        content: '';
        position: absolute;
        top: 14px;
        display: block;
        width: 34%;
        height: 2px;
        background-color: rgba(65, 38, 7, 0.09);
      }

      &:before {
        left: 0;
      }

      &:after {
        right: 0;
      }

    }

    .filmo-list {
      max-height: 32rem;
      overflow-y: auto;
      overflow-x: hidden;
      box-shadow: $--box-shadow-inner-brown;
      border-radius: 3px;

      &::-webkit-scrollbar-track
      {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
        border-radius: 3px;
        background-color: rgba(68, 68, 68, 0.05);
      }

      &::-webkit-scrollbar
      {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: rgba(68, 68, 68, 0.05);
      }

      &::-webkit-scrollbar-thumb
      {
        border-radius: 3px;
        background-color: rgba(56, 52, 47, 0.699);
      }

      .filmo-item {
        transition: all .2s ease-in-out;

        &:last-child {
            margin-bottom: 1rem;
        }
        &:hover {
          background-color: rgba(203, 186, 159, 0.25);          
        }

        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 4.5rem;
          color: $--color-hcf-black;

          .year {
            font-family: 'Righteous';
            font-size: 1.2em;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            width: 2.5rem;
            margin-left: 50px;
          }

          .separator {
            margin: 0 35px;
            width: 1px;
            height: 100%;
            background-color:  $--color-hcf-black;

            &::after {
              content: '';
              display: block;
              width: 6px;
              height: 6px;
              border-radius: 3px;
              background-color:  $--color-hcf-black;
              position: relative;
              top: 45%;
              left: -3px ;
            }
          }

          .details {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            white-space: nowrap;

            .poster {
              width: 2rem;
              height: 3rem;
              background-color: $--color-hcf-light-grey;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: $--box-shadow-1;
              margin-right: 0.6rem;

              img {
                width: 100%;
              }
              i {
                font-size: 1.3rem;
                color: $--color-hcf-dark-grey;
              }

            }

            .infos {
              flex: 1;
              display: flex;
              align-items: center;
                
              h2 {
                font-family: 'Righteous';
                font-size: 1.2rem;
                font-weight: 500;
                color: #a51f1e;
                text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
              }

              .role {
                  margin-left: 0.7rem;

                span {
                  &:before {
                    content: "|";
                    position: relative;
                    left: -.35rem;
                  }
                }
                span:first-child {
                  margin-left: 0.2rem;
                }
                span:not(:last-child) {
                  margin-right: 0.7rem;
                }
              }
            }
          }

        }

      }

    }

  }

</style>
