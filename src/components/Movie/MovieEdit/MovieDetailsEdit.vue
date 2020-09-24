<template>
  <section class="movie-info" :style="{ backgroundImage: 'url(' + movie.backdrop_path + ')' }">
    <el-button type="success" @click="btnView" class="btn-view" icon="el-icon-view">VIEW</el-button>
    <div class="content" :class="{'is-loading' : isLoading}">
      <div>
        <div class="poster" :class="{'is-loading' : isLoading}">
          <img v-if="movie.poster_path" :src="movie.poster_path" />
          <div v-else class="no-poster">
            <i class="el-icon-picture"></i>
          </div>
          <UploadFile @uploadFilePath="setUploadPosterPath(movie, $event)"/>
          <el-input type="text" name="poster_path" v-model="movie.poster_path"></el-input>
        </div>
        <div class="form-details-edit">
          <div class="title">
            <label for="original_title">Titre</label>
            <el-input
              type="text"
              name="original_title"
              id="original_title"
              v-model="movie.original_title"
            ></el-input>
          </div>
          <div class="rdate-runtime">
            <div class="release-date">
              <label for="release_date">Date de sortie</label>
              <el-date-picker
                format="dd-MM-yyyy"
                value-format="yyyy-MM-dd"
                type="date"
                name="release_date"
                id="release_date"
                v-model="movie.release_date"
              ></el-date-picker>
            </div>
            <div class="movie-runtime">
              <label for="movie_runtime">Durée</label>
              <el-input-number name="movie_runtime" id="movie_runtime" v-model="movie.runtime"></el-input-number>
            </div>
          </div>
          <div class="genres">
            <label>Genres</label>
            <div v-for="genre in movie.genres" :key="genre.id">
              <el-select v-model="genre.id" @change="handleChangeGenre(genre, $event)">
                <el-option
                  v-for="genreL in genresList"
                  :key="genreL.id"
                  :label="genreL.name"
                  :value="genreL.id"
                ></el-option>
              </el-select>
              <el-button type="primary" @click="deleteGenre(genre)" plain>
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
            <el-button type="success" icon="el-icon-plus" @click="addGenre()" plain>Ajouter un genre</el-button>
          </div>
          <div class="overview edit">
            <label for="overview">Synopsis</label>
            <vue-editor v-model="movie.overview" :editorToolbar="customToolbar" />
          </div>
        </div>
      </div>
      <div>
        <div class="crew">
          <label for="crew">l'Équipe technique</label>
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="addPerson"
            plain
          >Ajouter une personnalité</el-button>
          <div class="persons">
            <div v-for="(person, index) in movieCrew" :key="index" class="person">
              <div>
                <el-autocomplete
                  :trigger-on-focus="false"
                  hide-loading
                  v-model="person.name"
                  :fetch-suggestions="querySearchPerson"
                  placeholder="Nom de la personnalité"
                  @select="handleSelectPerson(person, $event)"
                >
                  <template slot-scope="{ item }">
                    <div>{{ item.name }}</div>
                  </template>
                </el-autocomplete>
                <el-button type="primary" icon="el-icon-delete" @click="deletePerson(person)" plain></el-button>
              </div>
              <el-input
                type="number"
                v-model="person.id"
                placeholder="ID de la personnalité"
              ></el-input>
              <UploadFile @uploadFilePath="setUploadFilePath(person, $event)"/>
              <div class="profile-path">
                <div class="picture">
                  <img v-if="person.profile_path" :src="person.profile_path" />
                  <div v-else class="no-picture">
                    <img v-if="person.gender == 1" src="../../../assets/img/p-female.svg" />
                    <img v-else src="../../../assets/img/p-male.svg" />
                  </div>
                </div>
                <el-input
                  type="text"
                  name="profil-path"
                  v-model="person.profile_path"
                  placeholder="Photo de la personnalité"
                ></el-input>
              </div>
              <p class="subt">Sexe</p>
              <el-select v-model="person.gender">
                <el-option label="-----------" :value="0"></el-option>
                <el-option label="Femme" :value="1"></el-option>
                <el-option label="Homme" :value="2"></el-option>
              </el-select>
              <p class="subt">Rôle(s) dans ce film</p>
              <div class="jobs">
                <div v-for="(job, index) in person.jobs" :key="index" class="job">
                  <el-input type="text" name="job" v-model="job.name"></el-input>
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    @click="deleteJob(person, job)"
                    plain
                  ></el-button>
                </div>
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  @click="addJob(person)"
                  plain
                >Ajouter un rôle</el-button>
              </div>
              <p class="subt">Positionnement</p>
              <el-input type="text" v-model="person.order" @input.native="$event.target.blur()"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button
      type="success"
      icon="el-icon-check"
      @click="saveMovieAndMovieCrewData"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
  </section>
</template>

<script>
import tmdbApi from "../../../services/tmdb-api";
import UploadFile from "@/components/UploadFile.vue";

export default {
  name: "MovieDetailsEdit",
  props: {
    movie: Object,
    movieCrew: Array
  },
  components: {
    UploadFile
  },
  created() {
    tmdbApi.getGenresList().then(res => {
      this.genresList = res.data.genres;
    });
  },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [],
        ["link"],
        [],
        ["clean"],
      ],
      genresList: [],
      debounce: null,
    };
  },
  methods: {
    btnView() {
      this.$router.push(({ name: 'film', params: { id: this.movie.id }}));
      location.reload();
    },
    setUploadPosterPath(movie, posterPath) {
      movie.poster_path = posterPath
    },
    setUploadFilePath(person, filePath) {
      person.profile_path = filePath
    },
    querySearchPerson(queryString, cb) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        tmdbApi.searchPerson(queryString, 1).then(res => {
          let searchPersonResult = []
          let pageLimit = 5
          if (res.data.total_pages < 5) {
            pageLimit = res.data.total_pages
          }
          for (let page = 1; page <= pageLimit; page++) {
            tmdbApi.searchPerson(queryString, page).then(res => {
              searchPersonResult = [...searchPersonResult, ...res.data.results]
              if (page === pageLimit) {
                cb(searchPersonResult)
              }
            })
          }
        })
      }, 600)
    },
    handleSelectPerson(person, item) {
      person.id = item.id;
      person.name = item.name;
      let profilPath = "";
      if (item.profile_path) {
        profilPath = "https://image.tmdb.org/t/p/w300" + item.profile_path;
      }
      person.profile_path = profilPath;
    },
    handleChangeGenre(genre, e) {
      genre.name = this.genresList.filter(g => g.id === e)[0].name
    },
    addGenre() {
      this.movie.genres.push({ id: null, name: null })
    },
    deleteGenre(genre) {
      this.$confirm(
        "Êtes-vous sûr de vouloir supprimer le genre " + genre.name + " ?",
        "Confirmation",
        {
          confirmButtonText: "Confirmer",
          cancelButtonText: "Annuler"
        }
      )
        .then(() => {
          this.movie.genres.splice(this.movie.genres.indexOf(genre), 1)
        })
        .catch(() => {
        });
    },
    addPerson() {
      this.$store.commit('ADD_PERSON_TO_MOVIE_CREW', { id: null, name: null, jobs: [], gender: 2, profile_path: null, order: 0 })
    },
    deletePerson(person) {
      this.$confirm(
        "Êtes-vous sûr de vouloir supprimer la fiche de " + person.name + " ?",
        "Confirmation",
        {
          confirmButtonText: "Confirmer",
          cancelButtonText: "Annuler"
        }
      )
        .then(() => {
          this.$store.commit('REMOVE_PERSON_FROM_MOVIE_CREW', person)
        })
        .catch(() => {
        });
    },
    addJob(person) {
      this.$store.commit('ADD_JOB_TO_PERSON', { person, job: { name: null } })
    },
    deleteJob(person, job) {
      this.$confirm(
        "Êtes-vous sûr de vouloir supprimer le rôle " + job.name + " ?",
        "Confirmation",
        {
          confirmButtonText: "Confirmer",
          cancelButtonText: "Annuler"
        }
      )
      .then(() => {
        this.$store.commit('REMOVE_JOB_FROM_PERSON', { person, job })
      })
      .catch(() => {
      });
    },
    saveMovieAndMovieCrewData() {
      const movieYear = this.$store.state.currentMovie.release_date ? parseInt(this.$store.state.currentMovie.release_date.split('-')[0]) : '';
      this.$db.collection("movies").doc(this.$parent.id).get()
      .then((doc) => {
          if (doc.exists) {
            this.$db.collection("movies").doc(this.$parent.id).update({ movie: this.$store.state.currentMovie, movieCrew: this.$store.state.currentMovieCrew, year: movieYear })
            .then(() => {
                console.log("le Film a été mis à jour");
                this.$message({
                  type: 'info',
                  message: 'le Film a bien été mis à jour'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          } else {
            this.$db.collection("movies").doc(this.$parent.id).set({ movie: this.$store.state.currentMovie, movieCrew: this.$store.state.currentMovieCrew, movieCast: this.$store.state.currentMovieCast, movieImages: this.$store.state.currentMovieImages, year: movieYear })
            .then(() => {
                console.log("le Film a été créé");
                this.$message({
                  type: 'info',
                  message: 'le Film a bien été créé'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  }
};
</script>

<style scoped lang="scss">
  section.movie-info {
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;

    .btn-view {
      position: absolute;
      right:25px;
      top:25px;
      z-index: 400;
    }

    .save-btn {
      position: absolute;
      bottom: 2.5em;
      right: 3em;
    }

    .content {
      text-align: left;
      padding: 4.5em 3em 7em 3em;
      position: relative;
      background: linear-gradient(
        to right,
        #0e0e0ede 150px,
        rgba(2, 2, 0, 0.88) 100%
      );

      &.is-loading {
        background: url('../../../assets/img/loader-Bars-1s-108px.gif') no-repeat 64%, linear-gradient(to right, #0e0e0ede 150px, rgba(2, 2, 0, 0.88) 100%);
      }

      > div {
        display: flex;
        margin-bottom: 1.5em;

        label {
          text-transform: uppercase;
          font-size: 1em;
          font-weight: 800;
          color: #f8f0e0;
          margin-bottom: 0.3em;
        }

        .poster {
          margin-right: 40px;

          &.is-loading {
            .no-poster {
              background: url('../../../assets/img/loader-Spin-1s-81px.gif') no-repeat center, black;
              i {
                font-size: 0;
              }
            }
          }

          img {
            width: 290px;
            height: 430px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.66),
              0 6px 6px rgba(0, 0, 0, 0.81);
          }

          .no-poster {
            background-color: lightgrey;
            width: 290px;
            height: 430px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.66),
              0 6px 6px rgba(0, 0, 0, 0.81);

            i {
              font-size: 8rem;
              color: #b5b5b5;
            }
          }
        }

        .form-details-edit {
          color: #f6e5c8;
          flex-basis: 100%;

          .title,
          .release-date,
          .movie-runtime,
          .genres,
          .overview,
          .crew {
            display: flex;
            flex-direction: column;
            > div {
              margin-bottom: 0.8em;
            }
          }

          > div {
            margin-bottom: 1em;
          }

          .rdate-runtime {
            display: flex;
            justify-content: space-between;
          }

          .genres {
            > div {
              display: flex;
            }
            .el-select {
              width: 100%;
            }

            > button {
              margin-bottom: 1em;
            }
          }
        }

        .crew {
          width: 100%;
          position: relative;

          >button {
            position: absolute;
            right: 2.4em;
            top: -0.8em;
            z-index: 1;
          }

          input {
            border-radius: 4px;
            box-sizing: border-box;
            display: inline-block;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 100%;
          }

          .persons {
            display: flex;
            flex-wrap: wrap;
            max-height: 400px;
            overflow: auto;
            margin-top: 0.5em;

            .person {
              width: 28.5%;
              min-width: 25%;

              margin: 0.5em 0;
              margin-right: 1em;
              border: 1px solid rgba(255, 255, 255, 0.205);
              border-radius: 4px;
              padding: 0.7em;

              > div {
                margin-bottom: 0.8em;

                &:first-child {
                  display: flex;

                  button {
                    margin-left: 0.8em;
                    padding: 0 1em;
                  }
                }
              }

              .profile-path {
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                .picture {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 55px;
                  min-width: 55px;
                  height: 55px;
                  overflow: hidden;
                  border-radius: 50%;
                  border: 3px solid #f8f0e0;
                  background-color: #d3d3d3;
                  margin-right: 5px;

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
              }

              .el-select {
                width: 100%;
              }

              p.subt {
                color: #f8f0e0;
                font-weight: 500;
                font-size: 0.8em;
                text-transform: uppercase;
                margin-bottom: 0.5em;
              }

              .jobs {
                display: flex;
                flex-wrap: wrap;

                .job {
                  display: flex;
                  margin-bottom: 0.5em;
                  width: 100%;

                  button {
                    padding: 0 1em;
                  }
                }

                > button {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
