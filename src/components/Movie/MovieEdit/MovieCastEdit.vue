<template>
<section class="movie-cast">
    <h1>
        Distribution
        <el-button type="success" icon="el-icon-plus" @click="addActor" class="add-person-cast" plain>Ajouter une personnalité
        </el-button>
    </h1>
    <div class="actor-list">
        <div class="cast-carousel-wrapper">
            <div class="cast-carousel-cards">
                <div v-for="(actor, index) in movieCast" :key="index" class="card">
                    <el-button type="primary" icon="el-icon-delete" @click="deleteActor(actor)" class="btn-delete-actor"></el-button>
                    <div class="picture">
                        <img v-if="actor.profile_path" :src="actor.profile_path" />
                        <div v-else class="no-picture">
                            <img v-if="actor.gender == 1" src="../../../assets/img/p-female.svg" />
                            <img v-else src="../../../assets/img/p-male.svg" />
                        </div>
                    </div>
                    <UploadFile @uploadFilePath="setUploadFilePath(actor, $event)" />
                    <el-input type="text" name="profil-path" v-model="actor.profile_path" placeholder="Photo"></el-input>
                    <div class="text">
                        <el-autocomplete :trigger-on-focus="false" hide-loading v-model="actor.name" :fetch-suggestions="querySearchPerson" placeholder="Nom" @select="handleSelectActor(actor, $event)">
                            <template slot-scope="{ item }">
                                <div>{{ item.name }}</div>
                            </template>
                        </el-autocomplete>
                        <p>ID de la personnalité</p>
                        <el-input type="number" v-model.number="actor.id" placeholder="ID de la personnalité"></el-input>
                        <p>SEXE</p>
                        <el-select v-model="actor.gender">
                            <el-option label="-----------" :value="0"></el-option>
                            <el-option label="Femme" :value="1"></el-option>
                            <el-option label="Homme" :value="2"></el-option>
                        </el-select>
                        <p>RÔLE DANS CE FILM</p>
                        <el-input type="text" v-model="actor.character" placeholder="Personnage"></el-input>
                        <p>POSITIONNEMENT</p>
                        <el-input type="text" v-model="actor.order" @input.native="$event.target.blur()"></el-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-button type="success" icon="el-icon-check" @click="saveMovieCastData" class="save-btn">Enregistrer les modifications
    </el-button>
</section>
</template>

<script>
import tmdbApi from "../../../services/tmdb-api";
import UploadFile from "@/components/UploadFile.vue";

export default {
    name: "MovieCastEdit",
    props: {
        movieCast: Array
    },
    components: {
        UploadFile
    },
    methods: {
        setUploadFilePath(actor, filePath) {
            actor.profile_path = filePath
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
        handleSelectActor(actor, item) {
            actor.id = item.id;
            actor.name = item.name;
            let profilPath = "";
            if (item.profile_path) {
                profilPath = "https://image.tmdb.org/t/p/w300" + item.profile_path;
            }
            actor.profile_path = profilPath;
        },
        addActor() {
            this.$store.commit('ADD_PERSON_TO_MOVIE_CAST', {
                id: null,
                name: null,
                character: null,
                gender: 2,
                profile_path: null,
                order: 0
            })
        },
        deleteActor(actor) {
            this.$confirm(
                    "Êtes-vous sûr de vouloir supprimer la fiche de " + actor.name + " ?",
                    "Confirmation", {
                        confirmButtonText: "Confirmer",
                        cancelButtonText: "Annuler"
                    }
                )
                .then(() => {
                    this.$store.commit('REMOVE_PERSON_FROM_MOVIE_CAST', actor)
                })
                .catch(() => {});
        },
        saveMovieCastData() {
            const movieYear = this.$store.state.currentMovie.release_date ? parseInt(this.$store.state.currentMovie.release_date.split('-')[0]) : '';

            this.$db.collection("movies").doc(this.$parent.id).get()
                .then((doc) => {
                    if (doc.exists) {
                        this.$db.collection("movies").doc(this.$parent.id).update({
                                movieCast: this.$store.state.currentMovieCast
                            })
                            .then(() => {
                                console.log("le Film a été mis à jour");
                                this.$message({
                                    type: 'info',
                                    message: 'le Film a bien été mis à jour'
                                });
                            })
                            .catch(function (error) {
                                console.error("Erreur lors de la sauvegarde : ", error);
                            });
                    } else {
                        this.$db.collection("movies").doc(this.$parent.id).set({
                                movie: this.$store.state.currentMovie,
                                movieCrew: this.$store.state.currentMovieCrew,
                                movieCast: this.$store.state.currentMovieCast,
                                movieImages: this.$store.state.currentMovieImages,
                                year: movieYear
                            })
                            .then(() => {
                                console.log("le Film a été créé");
                                this.$message({
                                    type: 'info',
                                    message: 'le Film a bien été créé'
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
@import '../../../styles/color.scss';

section.movie-cast {
    padding: 4% 4% 10% 4%;
    position: relative;

    .save-btn {
        position: absolute;
        bottom: 2.5em;
        right: 3em;
    }

    h1 {
        font-family: "Righteous";
        color: #3a2104;
        font-size: 1.5em;
        margin-bottom: 0.9em;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
        text-transform: uppercase;
        position: relative;
        margin-bottom: 10px;
        text-align: left;
        margin-left: 1.6%;
        position: relative;

        .add-person-cast {
            position: absolute;
            top: -0.4em;
            right: 1.4em;
            z-index: 1;
        }

        &:after {
            content: "";
            position: absolute;
            top: 14px;
            display: block;
            width: 78.7%;
            height: 2px;
            background-color: rgba(65, 38, 7, 0.09);
            right: 2.4%;
        }

    }

    .actor-list {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .cast-carousel-wrapper {
            display: flex;
            align-items: center;
            position: relative;
            width: 100%;
            overflow: auto;
        }

        .cast-carousel-cards {
            display: flex;

            .card {
                margin: 10px 1em 30px 1em;
                width: 10em;
                background-color: #fff;
                margin-right: 10px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                border: 1em solid white;
                position: relative;

                .btn-delete-actor {
                    position: absolute;
                    right: -0.6em;
                    top: -0.5em;
                    padding: 0.7em;
                    z-index: 1;
                }

                .picture {
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: lightgrey;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .no-picture {
                        width: 100%;
                        height: 100%;
                        background-color: lightgrey;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        img {
                            width: 100%;
                            position: relative;
                            top: 0.6em;
                        }
                    }
                }

                .text {
                    padding: 0.05em;
                    margin-top: 0.7em;
                    color: $--color-hcf-black;
                    text-align: left;

                    h1 {
                        margin: 0;
                        font-size: 1em;
                        line-height: 1.1;
                    }

                    p {
                        font-size: 0.8em;
                        margin: 0.7em 0 0.2em 0;
                    }
                }
            }
        }
    }
}
</style>
