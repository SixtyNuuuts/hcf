<template>
<section v-if="personCredits" class="person-filmo">
    <h1>
        Filmographie <span>{{ personCredits.length}} films</span>
        <el-button type="primary" icon="el-icon-plus" @click="addFilmToFilmo" class="add-filmo-cast" plain>Ajouter un film
        </el-button>
    </h1>
    <ul class="filmo-list">
        <li v-for="(movie, i) in personCredits" :key="movie.id" class="filmo-item">
            <el-button type="primary" icon="el-icon-delete" @click="deleteMovie(movie)" class="btn-delete-movie" plain></el-button>

            <div class="title-and-date">
                <div class="original-title">
                    <label for="original-title">Titre du film ({{ i + 1 }})</label>
                    <el-autocomplete :trigger-on-focus="false" hide-loading v-model="movie.original_title" :fetch-suggestions="querySearchMovie" placeholder="Titre" @select="handleSelectMovie(movie, $event)">
                        <template slot-scope="{ item }">
                            <div><strong>{{ item.original_title }}</strong> ({{ item.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }})</div>
                        </template>
                    </el-autocomplete>
                    <label for="original-title">ID du film</label>
                    <el-input type="number" v-model.number="movie.id" placeholder="ID du film"></el-input>
                </div>
                <div class="release-date">
                    <label for="release_date">Date de sortie</label>
                    <el-date-picker format="dd-MM-yyyy" value-format="yyyy-MM-dd" type="date" name="release_date" v-model="movie.release_date"></el-date-picker>
                </div>
            </div>

            <div class="poster-and-jobscharac">
                <div class="poster">
                    <img v-if="movie.poster_path" :src="movie.poster_path">
                    <div v-else class="no-poster">
                        <i class="el-icon-picture"></i>
                    </div>
                </div>
                <UploadFile @uploadFilePath="setUploadPosterPath(movie, $event)" />

                <div class="jobs">
                    <label>Métier(s) dans ce film</label>
                    <div class="jlist">
                        <div v-for="(job, index) in movie.job" :key="index" class="jitem">
                            <el-input type="text" name="job" v-model="job.name"></el-input>
                            <el-button type="primary" icon="el-icon-delete" @click="deleteJob(movie, job)" plain></el-button>
                        </div>
                        <el-button type="primary" icon="el-icon-plus" @click="addJob(movie)" plain>Ajouter un métier</el-button>
                    </div>
                </div>

                <div class="charac">
                    <label>Rôle(s) dans ce film</label>
                    <div class="jlist">
                        <div v-for="(character, index) in movie.character" :key="index" class="jitem">
                            <el-input type="text" name="job" v-model="character.name"></el-input>
                            <el-button type="primary" icon="el-icon-delete" @click="deleteCharac(movie, character)" plain></el-button>
                        </div>
                        <el-button type="primary" icon="el-icon-plus" @click="addCharac(movie)" plain>Ajouter un rôle</el-button>
                    </div>
                </div>

            </div>

        </li>
    </ul>
    <el-button type="success" icon="el-icon-check" @click="saveFilmo" class="save-btn">Enregistrer les modifications
    </el-button>
</section>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import tmdbApi from "../../../services/tmdb-api";

export default {
    name: "PersonFilmography",
    props: {
        personCredits: Array
    },
    components: {
        UploadFile
    },
    methods: {
        querySearchMovie(queryString, cb) {
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                tmdbApi.searchMovie(queryString, 1).then(res => {
                    let searchMovieResult = []
                    let pageLimit = 5
                    if (res.data.total_pages < 5) {
                        pageLimit = res.data.total_pages
                    }
                    for (let page = 1; page <= pageLimit; page++) {
                        tmdbApi.searchMovie(queryString, page).then(res => {
                            searchMovieResult = [...searchMovieResult, ...res.data.results]
                            if (page === pageLimit) {
                                cb(searchMovieResult)
                            }
                        })
                    }
                })
            }, 600)
        },
        handleSelectMovie(movie, item) {
            movie.id = item.id;
            movie.original_title = item.original_title;
            movie.release_date = item.release_date;
            let posterPath = "";
            if (item.poster_path) {
                posterPath = "https://image.tmdb.org/t/p/w300" + item.poster_path;
            }
            movie.poster_path = posterPath;
        },
        deleteMovie(movie) {
            this.$confirm(
                    "Êtes-vous sûr de vouloir supprimer le film " + movie.original_title + " ?",
                    "Confirmation", {
                        confirmButtonText: "Confirmer",
                        cancelButtonText: "Annuler"
                    }
                )
                .then(() => {
                    this.$store.commit('REMOVE_MOVIE_FROM_FILMO', movie)
                })
                .catch(() => {});
        },
        setUploadPosterPath(movie, posterPath) {
            movie.poster_path = posterPath
        },
        addFilmToFilmo() {
            this.$store.commit('ADD_FILM_TO_FILMO', {
                id: null,
                original_title: null,
                character: [],
                job: [],
                poster_path: null,
                release_date: "1900-01-01"
            })
        },
        addJob(movie) {
            this.$store.commit('ADD_JOB_TO_MOVIEFILMO', {
                movie,
                job: {
                    name: null
                }
            })
        },
        deleteJob(movie, job) {
            this.$confirm(
                    "Êtes-vous sûr de vouloir supprimer le métier " + job.name + " ?",
                    "Confirmation", {
                        confirmButtonText: "Confirmer",
                        cancelButtonText: "Annuler"
                    }
                )
                .then(() => {
                    this.$store.commit('REMOVE_JOB_FROM_MOVIEFILMO', {
                        movie,
                        job
                    })
                })
                .catch(() => {});
        },
        addCharac(movie) {
            this.$store.commit('ADD_CHARAC_TO_MOVIEFILMO', {
                movie,
                character: {
                    name: null
                }
            })
        },
        deleteCharac(movie, character) {
            this.$confirm(
                    "Êtes-vous sûr de vouloir supprimer le rôle " + character.name + " ?",
                    "Confirmation", {
                        confirmButtonText: "Confirmer",
                        cancelButtonText: "Annuler"
                    }
                )
                .then(() => {
                    this.$store.commit('REMOVE_CHARAC_FROM_MOVIEFILMO', {
                        movie,
                        character
                    })
                })
                .catch(() => {});
        },
        saveFilmo() {
            const fullName = this.$store.state.currentPerson.name ? this.$store.state.currentPerson.name.trim() : '';
            const index = fullName.lastIndexOf(' ');
            const lastname = fullName.substring(index + 1);
            const firstname = fullName.substring(0, index);
            this.$db.collection("persons").doc(this.$parent.id).get()
                .then((doc) => {
                    if (doc.exists) {
                        this.$db.collection("persons").doc(this.$parent.id).update({
                                personCredits: this.$store.state.currentPersonCredits
                            })
                            .then(() => {
                                console.log("la filmographie a été mise à jour");
                                this.$message({
                                    type: 'info',
                                    message: 'la filmographie a bien été mise à jour'
                                });
                            })
                            .catch(function (error) {
                                console.error("Erreur lors de la sauvegarde : ", error);
                            });
                    } else {
                        this.$db.collection("persons").doc(this.$parent.id).set({
                                person: this.$store.state.currentPerson,
                                personCredits: this.$store.state.currentPersonCredits,
                                personImages: this.$store.state.currentPersonImages,
                                firstname: firstname,
                                lastname: lastname
                            })
                            .then(() => {
                                console.log("la filmographie a été créée");
                                this.$message({
                                    type: 'info',
                                    message: 'la filmographie a bien été créée'
                                });
                            })
                            .catch(function (error) {
                                console.error("Erreur lors de la sauvegarde : ", error);
                            });
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';
@import '@/styles/shadow.scss';

section.person-filmo {
    padding: 0 1.5rem;
    padding-bottom: 5rem;
    position: relative;

    .save-btn {
        position: absolute;
        bottom: 1.5em;
        right: 1.7em;
    }

    h1 {
        font-family: "Righteous";
        color: #3a2104;
        font-size: 1.4em;
        margin-bottom: 0.9em;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
        text-transform: uppercase;
        position: relative;
        margin-bottom: 22px;
        text-align: left;

        span {
            font-weight: 500;
            font-size: 1.15rem;
            position: relative;
            top: -0.05rem;
            left: 0.3rem;
            color: #a51f1e;
        }

        .add-filmo-cast {
            position: absolute;
            top: -0.4em;
            right: 0;
            z-index: 1;
        }

        &:after {
            content: "";
            position: absolute;
            top: 14px;
            display: block;
            width: 71.5%;
            height: 2px;
            background-color: rgba(65, 38, 7, 0.09);
            right: 0;
        }

    }

    .filmo-list {
        max-height: 45rem;
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: $--box-shadow-inner-brown;
        border-radius: 3px;

        .filmo-item {
            border-bottom: 1px solid rgba(214, 178, 131, 0.9);
            padding: 1.8em 2em;
            position: relative;

            .btn-delete-movie {
                position: absolute;
                right: 6px;
                top: 7px;
                padding: 0.7em;
                z-index: 1;
            }

            .title-and-date {
                display: flex;
                margin-bottom: .8em;

                >:first-child {
                    margin-right: .8em;
                    flex: 1;
                }
            }

            .poster-and-jobscharac {
                display: flex;

                .jobs,
                .charac {
                    flex: 1;
                    margin-left: 2em;
                }

            }

            label {
                display: block;
                text-transform: uppercase;
                font-size: 1em;
                font-weight: 800;
                color: $--color-hcf-red;
                margin-bottom: 0.3em;
                text-align: left;
            }

            .release-date,
            .original-title {
                display: flex;
                flex-direction: column;

                >div {
                    margin-bottom: 0.8em;
                }
            }

            .release-date {
                .el-date-editor {
                    max-width: 160px;
                }
            }

            .poster {
                width: 3rem;
                height: 4.1rem;
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

            .jlist {
                display: flex;
                flex-wrap: wrap;

                .jitem {
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
</style>
