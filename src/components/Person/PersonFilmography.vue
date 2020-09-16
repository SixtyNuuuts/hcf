<template>
  <section v-if="personCredits" class="person-filmo">
    <!-- <h1>Filmographie <span>{{ personCredits.length}} films</span></h1> -->
    <h1>Filmographie</h1>
    <div v-if="personCreditsFilteredCount">
      <div class="filters">
        <h3>Filtres :</h3>
        <el-radio-group v-model="filter">
          <el-radio label="all">Tous les films ({{ personCredits.length }})</el-radio>
          <el-radio :disabled="!personCreditsFilteredCount" label="doc-movies">Films documentés ({{ personCreditsFilteredCount }})</el-radio>
        </el-radio-group>
      </div>
      <ul class="filmo-list" :class="{'is-loading' : isLoading}">
        <li v-for="movie in personCreditsFiltered" :key="movie.id" class="filmo-item" :class="{'only-one' : personCreditsFiltered.length===1}">
          <router-link :to="'/film/' + movie.id">
            <div v-if="movie.release_date && movie.release_date!='2021-01-01'" class="year">{{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }}</div>
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
                <div v-if="movie.job && movie.job.length" class="role"><span v-for="job in movie.job" :key="job.name" class="job"><strong>{{ job.name }}</strong></span></div>
                <div v-if="movie.character && movie.character.length" class="role"><span v-for="character in movie.character" :key="character.name" class="character"><span class="entantque">En tant que</span><strong>{{ character.name }}</strong></span></div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <div class="filters">
        <h3>Filtres :</h3>
        <el-radio-group v-model="filter2">
          <el-radio label="all">Tous les films ({{ personCredits.length }})</el-radio>
          <el-radio :disabled="!personCreditsFilteredCount" label="doc-movies">Films documentés ({{ personCreditsFilteredCount }})</el-radio>
        </el-radio-group>
      </div>
      <ul class="filmo-list" :class="{'is-loading' : isLoading}">
        <li v-for="movie in personCredits" :key="movie.id" class="filmo-item" :class="{'only-one' : personCredits.length===1}">
          <router-link :to="'/film/' + movie.id">
            <div v-if="movie.release_date && movie.release_date!='2021-01-01'" class="year">{{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }}</div>
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
                <div v-if="movie.job && movie.job.length" class="role"><span v-for="job in movie.job" :key="job.name" class="job"><strong>{{ job.name }}</strong></span></div>
                <div v-if="movie.character && movie.character.length" class="role"><span v-for="character in movie.character" :key="character.name" class="character"><span class="entantque">En tant que</span><strong>{{ character.name }}</strong></span></div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

export default {
  name: "PersonFilmography",
  props: {
    personCredits: Array
  },
  data() {
    return {
      filter: 'doc-movies',
      filter2: 'all'
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoadingFilmo;
    },
    personCreditsFiltered() {
      if(this.filter === 'all') {
        return this.personCredits;
      }
      return this.personCredits.filter(m => this.$store.state.allDocumentedMovieList.some((am) => am.id === m.id));
    },
    personCreditsFilteredCount() {
      return this.personCredits.filter(m => this.$store.state.allDocumentedMovieList.some((am) => am.id === m.id)).length;
    },
  }
};
</script>

<style scoped lang="scss">
  @import '@/styles/bp.scss';  
  @import '@/styles/color.scss';  
  @import '@/styles/shadow.scss';  

  section.person-filmo {
    padding: 0 1.5rem;
    padding-bottom: 1.9rem;
    position: relative;

    .filters {
      margin-top: 0.9rem;
      margin-bottom: 1rem;

      h3 {
        display: inline-block;
        font-size: 0.9rem;
        margin: 0;
        margin-right: 2rem;
      }
    }

    h1 {
      font-family: "Righteous";
      font-size: 1.5em;
      //margin-bottom: .9em;
      margin-bottom: 0;
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
        width: 22%;
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
      max-height: 40rem;
      overflow-y: auto;
      overflow-x: hidden;
      box-shadow: $--box-shadow-inner-brown;
      background: url('../../assets/img/content-pattern.png') repeat local left top;
      border-radius: 3px;
      min-height: none;

      &.is-loading {
        background: url('../../assets/img/loader-Spin-1s-74px.gif') no-repeat center;
        min-height: 10rem;
      }

      .filmo-item {
        transition: all .2s ease-in-out;
        
        &:first-child {
          margin-top: 0rem;
          .separator {
            height: 55%;
            position: relative;
            top: 23%;

            &::after {
              top: 0;
            }
          }
        }

        &:last-child {
            margin-bottom: 0rem;
            .separator {
              height: 55%;
              position: relative;
              bottom: 23%;

              &::after {
                top: 85%;
              }
            }
        }

        &.only-one {
          .separator {
            height: 0;
            top: -3px;

            &::after {
              content: '';
              top: 5%;
              left: -3px ;
            }
          }
        }

        &:hover {
          background-color: rgba(255, 239, 212, 0.57);
          border-radius: 0 .4rem .4rem 0;      
        }

        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 5rem;
          color: $--color-hcf-black;

          > div {
            flex-shrink: 0;
          }

          .year {
            font-family: 'Righteous';
            font-size: .95em;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            width: 2.5rem;
            margin-left: 20px;
          }

          .separator {
            margin: 0 20px;
            width: 1px;
            height: 100%;
            background-color:  #a4937a;

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
            white-space: initial;

            .poster {
              width: 1.5rem;
              height: 2.1rem;
              background-color: $--color-hcf-light-grey;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: $--box-shadow-1;
              margin-right: .7rem;

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
              flex-direction: column;
              align-items: flex-start;

              h2 {
                font-family: 'Righteous';
                font-size: .95rem;
                text-align: left;
                line-height: 1.15;
                font-weight: 500;
                color: #a51f1e;
                text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
                margin: 0.2rem 0;
                max-height: 3.2rem;
                overflow: hidden;
              }

              .role {
                font-size: 0.8rem;
                display: flex;
                flex-wrap: wrap;
                margin: 0.05rem 0;
                max-height: 2.2rem;
                overflow: hidden;

                > span {
                  display: inline-flex;
                  flex-wrap: wrap;
                  line-height: 1.2;

                  &.job {
                    &:before {
                      content: url('../../assets/img/cinema-chair.svg');
                      width: .9rem;
                      position: relative;
                      top: 0.1rem;
                      margin-right: 0.15rem;
                    }
                  }
                  &.character {
                    &:before {
                      content: url('../../assets/img/acting.svg');
                      width: .9rem;
                      position: relative;
                      top: 0.1rem;
                      margin-right: 0.15rem;
                    }
                  }
                  .entantque {
                    margin-right: .3rem;
                  }
                  strong {
                    text-align: left;
                    max-height: 1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
                > span:not(:last-child) {
                  margin-right: .5rem;
                }
              }
            }
          }

        }

      }

    }

  }

  @media (min-width: $--bp-sm) { 
    section.person-filmo {
      h1 {
        &:before, &:after {
          width: 32%;
        }
      }

      .filmo-list {
        .filmo-item {
          &:first-child {
            margin-top: 1rem;
          }

          &:last-child {
              margin-bottom: 1rem;
          }

          a {
            .year {
              font-size: 1em;
              margin-left: 3rem;
            }

            .separator {
              margin: 0 25px;
            }

            .details {
              .poster {
                width: 2rem;
                height: 3rem;
                margin-right: 1rem;
              }

              .infos {
                h2 {
                  font-size: 1rem;
                  line-height: 1.2;
                  margin: 0.1rem 0;
                  max-height: none;
                  overflow: visible;
                }

                .role {
                  font-size: 0.9rem;
                  max-height: none;
                  overflow: visible;

                  > span {
                    &.job {
                      &:before {
                        width: .95rem;
                      }
                    }
                    &.character {
                      &:before {
                        width: 1rem;
                      }
                    }
                    strong {
                      max-height: none;
                      overflow: visible;
                    }
                  }
                }
              }
            }

          }
        }
      }
    }
  }      

  @media (min-width: $--bp-md) { 
    section.person-filmo {
      h1 {
        &:before, &:after {
          width: 36%;
        }
      }

      .filmo-list {
        .filmo-item {
          a {
            .year {
              font-size: 1.1em;
            }

            .separator {
              margin: 0 35px;
            }

            .details {
              .infos {
                h2 {
                  font-size: 1.1rem;
                }

                .role {
                  > span:not(:last-child) {
                    margin-right: .8rem;
                  }
                }
              }
            }

          }
        }
      }
    }
  }      
  @media (min-width: $--bp-lg) {
    section.person-filmo {
      h1 {
        &:before, &:after {
          width: 39%;
        }
      }

      .filmo-list {
        background: url('../../assets/img/content-pattern.png') repeat local left top, url('../../assets/img/fond-cine.svg') repeat-y local right top, ;
        background-size: 8% , 29%;

        .filmo-item {
          max-width: 41rem;
          a {
            .year {
              font-size: 1.2em;
            }

            .separator {
              margin: 0 35px;
            }

            .details {
              .poster {
                width: 2.5rem;
                height: 3.5rem;
                margin-right: 1.5rem;
              }

              .infos {
                h2 {
                  font-size: 1.2rem;
                  margin: 0.3rem 0;
                  margin-top: 0;
                }
              }
            }

          }
        }
      }
    }
  }      

</style>
