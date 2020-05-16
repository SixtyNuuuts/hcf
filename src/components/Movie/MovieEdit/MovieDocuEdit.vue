<template>
  <section id="moviedocu">
    <div class="moviedocu_border">
      <div class="moviedocu_container">
        <h1>EN SAVOIR +</h1>
        <div class="moviedocu_content">
          <div class="col-left">
            <el-button-group>
              <el-button type="success" icon="el-icon-tickets" @click="addTextCL"></el-button>
              <el-button type="success" icon="el-icon-picture-outline" @click="addPictureCL"></el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addVideoCL"></el-button>
            </el-button-group>
            <div v-for="(item, index) in colLeftMovieDocu" :key="index">
              <div class="content" v-if="item.type === 'text'">
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="deleteContentCL(item)"
                class="btn-delete-content"
              ></el-button>
                <wysiwyg v-model="item.content" />
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'picture'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCL(item)"
                  class="btn-delete-content"
                ></el-button>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <figure class="pict">
                  <div :style=" { minHeight: item.height+'px', height: item.height+'px' }">
                    <img :src="item.path" :alt="item.caption?item.caption:'Image'">
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Hauteur de l'image" v-model="item.height"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'video'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCL(item)"
                  class="btn-delete-content"
                ></el-button>
                <!-- <h3>Vidéo</h3>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <hr>
                <h3>Image de la vidéo</h3>
                <UploadFile @uploadFilePath="setUploadPosterPath(item, $event)"/> -->
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <iframe :style=" { minHeight: item.height+'px', height: item.height+'px' }" :src="item.path" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url Video" v-model="item.path"></el-input>
                <!-- <el-input placeholder="Url Poster" v-model="item.posterpath"></el-input> -->
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Hauteur de la vidéo" v-model="item.height"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
            </div>
          </div>
          <div class="col-right">
            <el-button-group>
              <el-button type="success" icon="el-icon-tickets" @click="addTextCR"></el-button>
              <el-button type="success" icon="el-icon-picture-outline" @click="addPictureCR"></el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addVideoCR"></el-button>
            </el-button-group>
            <div v-for="(item, index) in colRightMovieDocu" :key="index">
              <div class="content" v-if="item.type === 'text'">
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="deleteContentCR(item)"
                class="btn-delete-content"
              ></el-button>
                <wysiwyg v-model="item.content" />
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'picture'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCR(item)"
                  class="btn-delete-content"
                ></el-button>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <figure class="pict">
                  <div :style=" { minHeight: item.height+'px', height: item.height+'px' }">
                    <img :src="item.path" :alt="item.caption?item.caption:'Image'">
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Hauteur de l'image" v-model="item.height"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'video'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCR(item)"
                  class="btn-delete-content"
                ></el-button>
                <!-- <h3>Vidéo</h3>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <hr>
                <h3>Image de la vidéo</h3>
                <UploadFile @uploadFilePath="setUploadPosterPath(item, $event)"/> -->
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <iframe :style=" { minHeight: item.height+'px', height: item.height+'px' }" :src="item.path" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url Video" v-model="item.path"></el-input>
                <!-- <el-input placeholder="Url Poster" v-model="item.posterpath"></el-input> -->
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Hauteur de la vidéo" v-model="item.height"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button
      type="success"
      icon="el-icon-check"
      @click="saveMovieDocumented"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
  </section>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import f from "@/services/func";

export default {
  name: "MovieDocuEdit",
  components: {
    UploadFile
  },
  props: {
    movieDocumented: Object,
  },
  methods: {
    setUploadFilePath(item, filePath) {
      item.path = filePath
    },
    setUploadPosterPath(item, posterPath) {
      item.posterpath = posterPath
    },
    addTextCL() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'left', content: {type: 'text', content:'', order: this.colLeftMovieDocu.length} })
    },
    addPictureCL() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'left', content: {type: 'picture', path:'', height:'150', caption:'', order: this.colLeftMovieDocu.length} })
    },
    addVideoCL() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'left', content: {type: 'video', path:'', posterpath:'', height:'150', caption:'', order: this.colLeftMovieDocu.length} })
    },
    addTextCR() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'right', content: {type: 'text', content:'', order: this.colRightMovieDocu.length} })
    },
    addPictureCR() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'right', content: {type: 'picture', path:'', height:'150', caption:'', order: this.colRightMovieDocu.length} })
    },
    addVideoCR() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'right', content: {type: 'video', path:'', posterpath:'', height:'150', caption:'', order: this.colRightMovieDocu.length} })
    },
    deleteContentCL(content) {
      this.$confirm(
        "Êtes-vous sûr de vouloir supprimer cet élément ?",
        "Confirmation",
        {
          confirmButtonText: "Confirmer",
          cancelButtonText: "Annuler"
        }
      )
        .then(() => {
          this.$store.commit('REMOVE_CONTENT_FROM_DOCUMENTED_MOVIE', { col: 'left', content })
        })
        .catch(() => {
        });
    },
    deleteContentCR(content) {
      this.$confirm(
        "Êtes-vous sûr de vouloir supprimer cet élément ?",
        "Confirmation",
        {
          confirmButtonText: "Confirmer",
          cancelButtonText: "Annuler"
        }
      )
        .then(() => {
          this.$store.commit('REMOVE_CONTENT_FROM_DOCUMENTED_MOVIE', { col: 'right', content })
        })
        .catch(() => {
        });
    },
    saveMovieDocumented() {
      const movieYear = parseInt(this.$store.state.currentMovie.release_date.split('-')[0])
      this.$db.collection("movies").doc(this.$parent.id).get()
      .then((doc) => {
          if (doc.exists) {
            this.$db.collection("movies").doc(this.$parent.id).update({ movieDocumented: this.$store.state.currentDocumentedMovie, documented: true, year: movieYear })
            .then(() => {
                console.log("movieDocumented ok");
                this.$message({
                  type: 'info',
                  message: 'le Film a bien été documenté'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          } else {
            this.$db.collection("movies").doc(this.$parent.id).set({ movie: this.$store.state.currentMovie, movieDocumented: this.$store.state.currentDocumentedMovie, documented: true, year: movieYear })
            .then(() => {
                console.log("movieDocumented ok");
                this.$message({
                  type: 'info',
                  message: 'le Film a bien été documenté'
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
    colLeftMovieDocu() {
      return f.sortedByOrder(this.movieDocumented.colLeftContent)
    },
    colRightMovieDocu() {
      return f.sortedByOrder(this.movieDocumented.colRightContent)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/styles/bp.scss';  
  @import '@/styles/color.scss';  
  @import '@/styles/shadow.scss';  

  #moviedocu {
    box-shadow: $--box-shadow-dark-5;
    position: relative;
    width: 100%;

    .btn-delete-content {
      position: absolute;
      right:0;
      top: 0;
      padding: 0.7em;
      z-index: 1;
    }

    .save-btn {
      position: absolute;
      bottom: 2.5em;
      right: 3em;
    }

    .moviedocu_border {
      position: relative;
      width: 100%;

      .moviedocu_container {
        background: url('../../../assets/img/main-pattern.jpg') repeat scroll left top;
        padding: 2%;
        padding-bottom: 12%;

        h1 {
          font-family: "Righteous";
          color: $--color-hcf-ddark-brown;
          font-size: 1.5em;
          margin: 0.7em;
          margin-bottom: .9em;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
          position: relative;
          text-transform: uppercase;

          &:before, &:after {
            content: '';
            content: '';
            position: absolute;
            top: 0.1em;
            display: block;
            width: 40%;
            height: 22px;
            background: url("../../../assets/img/box-border-patern.png") repeat 0 0;
          }

          &:before {
            left: 1.2%;
          }

          &:after {
            right: 1.2%;
          }

        }

        .moviedocu_content {
          display: flex;
          flex-direction: column;
          justify-content: center;

          div {
            flex-basis: 47%;
            margin: 0 1%;

            &.col-left {
              margin-right: 2%;
            }

            &.col-right {
              margin-left: 2%;
            }

            .content {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              border: 1px dotted $--color-hcf-dark-grey;
              border-radius: 5px;
              margin: 2em 1%;
              position: relative;

            }

            h3 {
              font-size: 1.3em;
              margin: 0;
              margin-top: 1em;
            }

            p {
              text-align: justify;
              margin: 1.5em 0;
            }

            figure {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: 0;
              box-shadow: $--box-shadow-dark-2;
              box-sizing: border-box;
              margin: 1em 0;

              &.pict {
                border: .8em solid white;
                background-color: white;
                >div {
                  margin: 0;
                  overflow: hidden;
                  width: 100%;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                figcaption {
                  padding: .3em;
                  padding-top: 1em;
                  color: $--color-hcf-black;
                  font-size: 0.95em;
                  font-style: italic;
                  line-height: 1.1;
                }

              }
              
              &.video {
                border-bottom: .8em solid $--color-hcf-black;
                background-color: $--color-hcf-black;
                >div {
                  margin: 0;
                  width: 100%;
                  .ribbon-hole {
                    margin: 0;
                    background: url("../../../assets/img/hole.svg") repeat-x 0 bottom, $--color-hcf-black;
                  }
                  iframe {
                    width: 99%;
                  }
                }
                figcaption {
                  padding: .3em;
                  padding-top: .6em;
                  color: $--color-hcf-light-beige;
                  font-size: 0.95em;
                  font-style: italic;
                  line-height: 1.1;
                }
              }

            }

          }

        }

      }

    }

  }

  @media (min-width: $--bp-md) { 

    #moviedocu {

      .moviedocu_border {

        .moviedocu_container {

          .moviedocu_content {
            flex-direction: row;
          }
        }
      }
    }
  }

  @media (min-width: $--bp-lg) { 
    
    #moviedocu {
      width: 102%;
      left: -0.9%;

      .moviedocu_border {
        background: url('../../../assets/img/content-tail-left.png') repeat-y 0 0, url('../../../assets/img/content-tail-right.png') repeat-y right 0;
        padding: 0 3px;
        width: 101%;
        left: -0.97%;
      }

    }

  }

</style>
