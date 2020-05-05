<template>
  <section class="movie-info" :style="{ backgroundImage: 'url(' +  movie.backdrop_path + ')' }">
    <div class="content">
      <div>
        <div class="poster">
          <img v-if="movie.poster_path" :src="movie.poster_path" />
          <div v-else class="no-poster">
            <i class="el-icon-picture"></i>
          </div>
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
              <el-input type="text" name="genre" v-model="genre.name"></el-input>
              <el-button type="primary" plain @click="deleteGenre(genre)">
                <i class="el-icon-delete"></i> Supprimer
              </el-button>
            </div>
            <!-- <div>
              <el-input
                type="text"
                name="genre"
                v-model="newGenre.name"
                placeholder="Ajouter un nouveau genre"
              ></el-input>
              <el-button type="success" plain @click="genreAdd()">
                <i class="el-icon-folder-add"></i> Ajouter
              </el-button>
            </div> -->
          </div>
          <div class="overview">
            <label for="overview">Résumé</label>
            <el-input type="textarea" :rows="4" v-model="movie.overview"></el-input>
          </div>
        </div>
      </div>
      <div>
        <div class="crew">
          <label for="crew">l'Équipe technique</label>
          <el-button type="success" icon="el-icon-plus" @click="addPerson" plain >Ajouter une personnalité</el-button>
          <!-- <div class="add-person">
            <el-upload
              class="upload-np-profile-path"
              action="/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove">
              <el-button size="small" type="primary">Cliquer pour envoyer</el-button>
            </el-upload>
            <el-input type="text" name="name" v-model="newPerson.name"></el-input>
            <div class="jobs">
              <p class="subt">Rôle(s)</p>
              <div v-for="(job, index) in newPerson.jobs" :key="index" class="job">
                <el-input
                  type="text"
                  name="job"
                  v-model="job.name"
                ></el-input>
                <el-button type="primary" plain icon="el-icon-delete" @click="deleteJobNewPerson(job)"></el-button>
              </div>
              <div class="job">
                <el-input
                  type="text"
                  name="add-job"
                  v-model="newJobNewPerson.name"
                ></el-input>
                <el-button type="success" plain icon="el-icon-plus" @click="jobAddNewPerson()"></el-button>
              </div>
            </div>
          </div> -->
          <div class="persons">
            <div v-for="(person, index) in sortedMovieByPrio" :key="index" class="person">
              <div>
                <!-- <el-input type="text" name="name" v-model="person.name"></el-input> -->
                <el-autocomplete
                  :trigger-on-focus="false"
                  hide-loading
                  v-model="person.name"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="Entrez quelque chose"
                  @select="handleSelect">
                  <template slot-scope="{ item }">
                    <div>{{ item.name }}<span> ({{ item.known_for_department }})</span></div>
                  </template>
                </el-autocomplete>
                <el-button type="primary" icon="el-icon-delete" @click="deletePerson(person)" plain ></el-button>
              </div>
              <div class="profile-path">
                <div class="picture">
                  <img
                    v-if="person.profile_path"
                    :src="person.profile_path"
                  />
                  <div v-else class="no-picture">
                    <i class="el-icon-user-solid"></i>
                  </div>
                </div>
                <el-input type="text" name="profil-path" v-model="person.profile_path"></el-input>
              </div>
              <p class="subt">Rôle(s) dans ce film</p>
              <div class="jobs">
                <div v-for="(job, index) in person.jobs" :key="index" class="job">
                  <el-input
                    type="text"
                    name="job"
                    v-model="job.name"
                  ></el-input>
                  <el-button type="primary" plain icon="el-icon-delete" @click="deleteJob(person, job)"></el-button>
                </div>
                <el-button type="success" icon="el-icon-plus" plain @click="addJob(person)">Ajouter un rôle</el-button>
              </div>
              <p class="subt">Positionnement</p>
              <el-input type="text" v-model="person.priority" @input.native="$event.target.blur()"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tmdbApi from "../../../services/tmdb-api";

export default {
  name: "MovieDetailsEdit",
  props: {
    id: String
  },
  created() {
    tmdbApi.getMovieDetails(this.id).then(res => {
      this.movie = res.data
      this.backdropPath()
      this.posterPath()
    });
    tmdbApi.getMovieCredits(this.id).then(res => {
      this.movieCrewFormat(res.data.crew)
      this.movieCrew.forEach(person => { 
        this.profilePath(person)
      })
    });
  },
  data() {
    return {
      movie: {
        backdrop_path: null,
        genres: [
          {
            id: null,
            name: null
          }
        ],
        id: null,
        original_title: null,
        overview: null,
        poster_path: null,
        release_date: "1930-01-01",
        runtime: null,
        vote_average: null,
        production_countries: [
          {
            iso_3166_1: null,
            name: null
          }
        ]
      },
      movieCrew: [
        { id: null, jobs: [], name: null, priority: null, profile_path: null }
      ],
      debounce: null
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        console.log('go')
        tmdbApi.searchPerson(queryString, 1).then(res => {
          let searchPersonResult = []
          for (let page = 1; page <= res.data.total_pages; page++) {
            tmdbApi.searchPerson(queryString, page).then(res => {
              searchPersonResult = [...searchPersonResult, ...res.data.results]
              if (page === res.data.total_pages) {cb(searchPersonResult)}
            })
          }
        })
      }, 600)
    },
    handleSelect(item) {
      console.log(item, this.state);
    },
    // jobAdd(personId, value) {
    //   console.log(value)
    // },
    // jobAddNewPerson() {
    //   this.newPerson.jobs.push({...this.newJobNewPerson})
    //   this.newJobNewPerson = { name: "" }
    // },
    // deleteJobNewPerson(job) {
    //    this.newPerson.jobs.splice(this.newPerson.jobs.indexOf(job), 1)
    // },
    // genreAdd() {
    //   this.movie.genres.push({...this.newGenre});
    // },
    // handleRemove(file) {
    //   console.log(file);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    // beforeRemove(file) {
    //   return this.$confirm(`Supprimer le transfert de ${ file.name } ?`);
    // },
    addJob(person) {
      person.jobs = [...person.jobs, ...[{ name: null }]]
    },
    deleteJob(person, job) {
      this.$confirm('Ceci effacera le métier ' + job.name + ' de ' + person.name, 'Attention', {
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler',
      }).then(() => {
        this.$message({
          type: 'info',
          message: 'Métier supprimé'
        });
        person.jobs.splice(person.jobs.indexOf(job), 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Suppression annulée'
        });          
      });
    },
    deleteGenre(genre) {
      this.movie.genres.splice(this.movie.genres.indexOf(genre), 1)
    },
    addPerson() {
      this.movieCrew = [...this.movieCrew, ...[{ id: null, jobs: [], name: null, priority: 0, profile_path: null }]]
    },
    deletePerson(person) {
      this.$confirm('Ceci effacera ' + person.name, 'Attention', {
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler',
      }).then(() => {
        this.$message({
          type: 'info',
          message: person.name + ' supprimé'
        });
        this.movieCrew.splice(this.movieCrew.indexOf(person), 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Suppression annulée'
        });          
      });
    },
    movieCrewFormat(dataCrew) {
      const movieCrewFormat = []
      const jobsTranslation = [
        {
          job: "Director",
          jobTranslatationM: "Réalisateur",
          jobTranslatationF: "Réalisatrice",
          priority: 1
        },
        {
          job: "Writer",
          jobTranslatationM: "Scénariste",
          jobTranslatationF: "Scénariste",
          priority: 2
        },
        {
          job: "Scenario Writer",
          jobTranslatationM: "Scénariste",
          jobTranslatationF: "Scénariste",
          priority: 2
        },
        {
          job: "Screenplay",
          jobTranslatationM: "Scénariste",
          jobTranslatationF: "Scénariste",
          priority: 2
        },
        {
          job: "Assistant Director",
          jobTranslatationM: "Assistant Réalisateur",
          jobTranslatationF: "Assistant Réalisatrice",
          priority: 3
        },
        {
          job: "Producer",
          jobTranslatationM: "Producteur",
          jobTranslatationF: "Productrice",
          priority: 3
        },
        {
          job: "Novel",
          jobTranslatationM: "Roman",
          jobTranslatationF: "Roman",
          priority: 3
        },
        {
          job: "Editor",
          jobTranslatationM: "Monteur",
          jobTranslatationF: "Monteuse",
          priority: 4
        },
        {
          job: "Music",
          jobTranslatationM: "Musique",
          jobTranslatationF: "Musique",
          priority: 4
        },
        {
          job: "Sound",
          jobTranslatationM: "Son",
          jobTranslatationF: "Son",
          priority: 4
        },
        {
          job: "Production Design",
          jobTranslatationM: "Chef décorateur",
          jobTranslatationF: "Chef décoratrice",
          priority: 4
        },
        {
          job: "Set Decoration",
          jobTranslatationM: "Décorateur",
          jobTranslatationF: "Décoratrice",
          priority: 4
        },
        {
          job: "Director of Photography",
          jobTranslatationM: "Directeur de la photographie",
          jobTranslatationF: "Directrice de la photographie",
          priority: 4
        },
        {
          job: "Still Photographer",
          jobTranslatationM: "Photographe",
          jobTranslatationF: "Photographe",
          priority: 4
        },
        {
          job: "Conductor",
          jobTranslatationM: "Chef d'orchestre",
          jobTranslatationF: "Chef d'orchestre",
          priority: 4
        },
        {
          job: "Original Music Composer",
          jobTranslatationM: "Compositeur de la bande originale",
          jobTranslatationF: "Compositrice de la bande originale",
          priority: 4
        },
        {
          job: "Adaptation",
          jobTranslatationM: "Adaptation",
          jobTranslatationF: "Adaptation",
          priority: 4
        }
      ];
      dataCrew.forEach(person => {
        let jobIsInArray = jobsTranslation.find(p => p.job == person.job);
        if (jobIsInArray) {
          let personJob = jobIsInArray.jobTranslatationM;
          if (person.gender == 1) {
            personJob = jobIsInArray.jobTranslatationF;
          }
          let personPriority = jobIsInArray.priority;
          let personIsInArray = movieCrewFormat.find(p => p.id == person.id);
          if (!personIsInArray) {
            movieCrewFormat.push({
              id: person.id,
              jobs: [{ name: personJob }],
              name: person.name,
              priority: personPriority,
              profile_path: person.profile_path
            });
          } else {
            personIsInArray.jobs = [
              ...personIsInArray.jobs,
              { name: personJob }
            ];
            if (personIsInArray.priority > personPriority) {
              personIsInArray.priority = personPriority;
            }
          }
        }
      });
      this.movieCrew = movieCrewFormat;
    },
    backdropPath() {
      let backdropPath = null;
      if (this.movie.backdrop_path) {
        backdropPath =
          "https://image.tmdb.org/t/p/original" + this.movie.backdrop_path;
      } else {
        backdropPath = require("../../../assets/img/backdrop_default.jpg");
      }
      this.movie.backdrop_path = backdropPath;
    },
    posterPath() {
      let posterPath = null;
      if (this.movie.poster_path) {
        posterPath = "https://image.tmdb.org/t/p/w300" + this.movie.poster_path;
      }
      this.movie.poster_path = posterPath;
    },
    profilePath(person) {
      let profilePath = null;
      if (person.profile_path) {
        profilePath = "https://image.tmdb.org/t/p/w138_and_h175_face" + person.profile_path;
      }
      person.profile_path = profilePath;
    }
  },
  computed: {
    sortedMovieByPrio() {
      let movieCrewClone = [...this.movieCrew]
      movieCrewClone.sort(function(person1, person2) {
        return person1.priority  - person2.priority
      })
      return movieCrewClone
    }
  }
};
</script>

<style scoped lang="scss">

  section.movie-info {
    background-size: cover;
    background-repeat: no-repeat;

    .content {
      text-align: left;
      padding: 4.5em 3em 3em 3em;
      position: relative;
      background-image: linear-gradient(
        to right,
        #0e0e0ede 150px,
        rgba(2, 2, 0, 0.88) 100%
      );

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
            >div {
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
          }
        }

        .crew {
          width: 100%;

          label {
            margin-right: 1.5em;
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
              flex: 1;
              min-width: 25%;
              margin: 0.5em 0;
              margin-right: 1em;
              border: 1px solid rgba(255, 255, 255, 0.205);
              border-radius: 4px;
              padding: 0.7em;
              
              >div {
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
                  }

                  i {
                    color: #b5b5b5;
                    font-size: 1.9em;
                  }
                }
              }

              p.subt {
                color:  #f8f0e0;
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

                >button {
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
