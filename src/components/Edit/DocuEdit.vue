<template>
  <section id="docu">
    <div class="docu_border">
      <div class="docu_container">
        <h1>EN SAVOIR +</h1>
        <div class="docu_content">
          <div class="col-left">
            <el-button-group>
              <el-button type="success" icon="el-icon-tickets" @click="addTextCL">Texte</el-button>
              <el-button type="success" icon="el-icon-picture-outline" @click="addPictureCL">Image</el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addVideoCL">Vidéo</el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addYoutubeCL">Youtube</el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addAudioCL">Audio</el-button>
            </el-button-group>
            <div v-for="(item, index) in colLeftDocu" :key="index">
              <div class="content" v-if="item.type === 'text'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCL(item)"
                  class="btn-delete-content"
                ></el-button>
                <vue-editor v-model="item.content" :editorToolbar="customToolbar" />
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
                <figure :style=" { width: item.width +'%' }" class="pict">
                  <div>
                    <img :src="item.path" :alt="item.caption?item.caption:'Image'">
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Largeur de l'image" v-model="item.width"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'video'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCL(item)"
                  class="btn-delete-content"
                ></el-button>
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <video controls="controls" :poster="item.posterpath" style="width: 100%">
                      <source :src="item.path" :alt="item.caption?item.caption:'Vidéo'">
                    </video>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <h3>Vidéo</h3>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <hr>
                <h3>Image de la vidéo</h3>
                <UploadFile @uploadFilePath="setUploadPosterPath(item, $event)"/>
                <el-input placeholder="Url Video" v-model="item.path"></el-input>
                <el-input placeholder="Url Poster" v-model="item.posterpath"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <!-- <el-input placeholder="Hauteur de la vidéo" v-model="item.height"></el-input> -->
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'youtube'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCL(item)"
                  class="btn-delete-content"
                ></el-button>
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <iframe :style=" { minHeight: item.height+'px', height: item.height+'px' }" :src="item.path" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url Youtube" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Hauteur de la vidéo" v-model="item.height"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'audio'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCL(item)"
                  class="btn-delete-content"
                ></el-button>
                <figure class="audio">
                    <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                    <audio
                        controls
                        :src="item.path">
                        Votre navigateur ne supporte pas ce fichier audio.
                    </audio>
                </figure>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <el-input placeholder="Url Audio" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
            </div>
          </div>
          <div class="col-right">
            <el-button-group>
              <el-button type="success" icon="el-icon-tickets" @click="addTextCR">Texte</el-button>
              <el-button type="success" icon="el-icon-picture-outline" @click="addPictureCR">Image</el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addVideoCR">Vidéo</el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addYoutubeCR">Youtube</el-button>
              <el-button type="success" icon="el-icon-video-play"  @click="addAudioCR">Audio</el-button>
            </el-button-group>
            <div v-for="(item, index) in colRightDocu" :key="index">
              <div class="content" v-if="item.type === 'text'">
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="deleteContentCR(item)"
                class="btn-delete-content"
              ></el-button>
                <vue-editor v-model="item.content" :editorToolbar="customToolbar" />
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
                <figure :style=" { width: item.width +'%' }" class="pict">
                  <div>
                    <img :src="item.path" :alt="item.caption?item.caption:'Image'">
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Largeur de l'image" v-model="item.width"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'video'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCR(item)"
                  class="btn-delete-content"
                ></el-button>
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <video controls="controls" :poster="item.posterpath" style="width: 100%">
                      <source :src="item.path" :alt="item.caption?item.caption:'Vidéo'">
                    </video>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <h3>Vidéo</h3>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <hr>
                <h3>Image de la vidéo</h3>
                <UploadFile @uploadFilePath="setUploadPosterPath(item, $event)"/>
                <el-input placeholder="Url Video" v-model="item.path"></el-input>
                <el-input placeholder="Url Poster" v-model="item.posterpath"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <!-- <el-input placeholder="Hauteur de la vidéo" v-model="item.height"></el-input> -->
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'youtube'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCR(item)"
                  class="btn-delete-content"
                ></el-button>
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <iframe :style=" { minHeight: item.height+'px', height: item.height+'px' }" :src="item.path" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url Youtube" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Hauteur de la vidéo" v-model="item.height"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'audio'">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteContentCR(item)"
                  class="btn-delete-content"
                ></el-button>
                <figure class="audio">
                    <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                    <audio
                        controls
                        :src="item.path">
                        Votre navigateur ne supporte pas ce fichier audio.
                    </audio>
                </figure>
                <UploadFile @uploadFilePath="setUploadFilePath(item, $event)"/>
                <el-input placeholder="Url Audio" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button
      v-if="docuType === 'movie'"
      type="success"
      icon="el-icon-check"
      @click="saveMovieDocumented"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
    <el-button
      v-if="docuType === 'person'"
      type="success"
      icon="el-icon-check"
      @click="savePersonDocumented"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
  </section>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import f from "@/services/func";

export default {
  name: "DocuEdit",
  components: {
    UploadFile
  },
  props: {
    docu: Object,
    docuType: String,
  },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        [],
        [{ color: [] }], // dropdown with defaults from theme
        ["link"],
        [],
        [],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ["clean"],
      ],
      mutationAdd : '',
      mutationRemove : ''
    };
  },
  mounted() {
    if (this.docuType === 'movie') {
      this.mutationAdd = 'ADD_CONTENT_TO_DOCUMENTED_MOVIE';
      this.mutationRemove = 'REMOVE_CONTENT_FROM_DOCUMENTED_MOVIE';
    }
    if (this.docuType === 'person') {
      this.mutationAdd = 'ADD_CONTENT_TO_DOCUMENTED_PERSON';
      this.mutationRemove = 'REMOVE_CONTENT_FROM_DOCUMENTED_PERSON';
    }
  },
  methods: {
    setUploadFilePath(item, filePath) {
      item.path = filePath
    },
    setUploadPosterPath(item, posterPath) {
      item.posterpath = posterPath
    },
    addTextCL() {
      this.$store.commit(this.mutationAdd, { col: 'left', content: {type: 'text', content:'', order: this.colLeftDocu.length} })
    },
    addPictureCL() {
      this.$store.commit(this.mutationAdd, { col: 'left', content: {type: 'picture', path:'', width:'60', caption:'', order: this.colLeftDocu.length} })
    },
    addVideoCL() {
      this.$store.commit(this.mutationAdd, { col: 'left', content: {type: 'video', path:'', posterpath:'', height:'150', caption:'', order: this.colLeftDocu.length} })
    },
    addYoutubeCL() {
      this.$store.commit(this.mutationAdd, { col: 'left', content: {type: 'youtube', path:'', posterpath:'', height:'250', caption:'', order: this.colLeftDocu.length} })
    },
    addAudioCL() {
      this.$store.commit(this.mutationAdd, { col: 'left', content: {type: 'audio', path:'', caption: '', order: this.colLeftDocu.length} })
    },
    addTextCR() {
      this.$store.commit(this.mutationAdd, { col: 'right', content: {type: 'text', content:'', order: this.colRightDocu.length} })
    },
    addPictureCR() {
      this.$store.commit(this.mutationAdd, { col: 'right', content: {type: 'picture', path:'', width:'60', caption:'', order: this.colRightDocu.length} })
    },
    addVideoCR() {
      this.$store.commit(this.mutationAdd, { col: 'right', content: {type: 'video', path:'', posterpath:'', height:'150', caption:'', order: this.colRightDocu.length} })
    },
    addYoutubeCR() {
      this.$store.commit(this.mutationAdd, { col: 'right', content: {type: 'youtube', path:'', posterpath:'', height:'250', caption:'', order: this.colRightDocu.length} })
    },
    addAudioCR() {
      this.$store.commit(this.mutationAdd, { col: 'right', content: {type: 'audio', path:'', caption: '', order: this.colRightDocu.length} })
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
          this.$store.commit(this.mutationRemove, { col: 'left', content })
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
          this.$store.commit(this.mutationRemove, { col: 'right', content })
        })
        .catch(() => {
        });
    },
    saveMovieDocumented() {
      const movieYear = parseInt(this.$store.state.currentMovie.release_date.split('-')[0])
      this.$db.collection("movies").doc(this.$parent.id).get()
      .then((doc) => {
          if (doc.exists) {
            this.$db.collection("movies").doc(this.$parent.id).update({ movieDocumented: this.$store.state.currentDocumentedMovie, documented: true })
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
            this.$db.collection("movies").doc(this.$parent.id).set({ movieDocumented: this.$store.state.currentDocumentedMovie, documented: true, movie: this.$store.state.currentMovie, movieCrew: this.$store.state.currentMovieCrew, movieCast: this.$store.state.currentMovieCast, movieImages: this.$store.state.currentMovieImages, year: movieYear })
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
    savePersonDocumented() {
      const fullName = this.$store.state.currentPerson.name.trim();
      const index = fullName.lastIndexOf(' ');
      const lastname = fullName.substring(index+1);
      const firstname = fullName.substring(0, index);
      this.$db.collection("persons").doc(this.$parent.id).get()
      .then((doc) => {
          if (doc.exists) {
            this.$db.collection("persons").doc(this.$parent.id).update({ personDocumented: this.$store.state.currentDocumentedPerson, documented: true })
            .then(() => {
                this.$message({
                  type: 'info',
                  message: 'la personnalité a bien été documenté'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          } else {
            this.$db.collection("persons").doc(this.$parent.id).set({ personDocumented: this.$store.state.currentDocumentedPerson, documented: true, person: this.$store.state.currentPerson, personCredits: this.$store.state.currentPersonCredits, personImages: this.$store.state.currentPersonImages, firstname: firstname, lastname: lastname })
            .then(() => {
                this.$message({
                  type: 'info',
                  message: 'la personnalité a bien été documenté'
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
    colLeftDocu() {
      return f.sortedByOrder(this.docu.colLeftContent)
    },
    colRightDocu() {
      return f.sortedByOrder(this.docu.colRightContent)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/styles/bp.scss';  
  @import '@/styles/color.scss';  
  @import '@/styles/shadow.scss';  

  #docu {
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

    .docu_border {
      position: relative;
      width: 100%;

      .docu_container {
        background: url('../../assets/img/main-pattern.jpg') repeat scroll left top;
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
            background: url("../../assets/img/box-border-patern.png") repeat 0 0;
          }

          &:before {
            left: 1.2%;
          }

          &:after {
            right: 1.2%;
          }

        }

        .docu_content {
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
                width: 100%;
                border-bottom: .8em solid $--color-hcf-black;
                background-color: $--color-hcf-black;
                >div {
                  margin: 0;
                  width: 100%;
                  .ribbon-hole {
                    margin: 0;
                    background: url("../../assets/img/hole.svg") repeat-x 0 bottom, $--color-hcf-black;
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
                  line-height: 1.15;
                }
              }

              &.audio {
                width: 100%;
                background-color: $--color-hcf-beige;
                padding: 1em 2em 1.1em 2em;
                border-radius: 5px;
                figcaption {
                  margin-bottom: 0.8em;
                  color: $--color-hcf-brown  ;
                  font-size: 1em;
                  font-weight: 700;
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

    #docu {

      .docu_border {

        .docu_container {

          .docu_content {
            flex-direction: row;
          }
        }
      }
    }
  }

  @media (min-width: $--bp-lg) { 
    
    #docu {
      width: 102%;
      left: -0.9%;

      .docu_border {
        background: url('../../assets/img/content-tail-left.png') repeat-y 0 0, url('../../assets/img/content-tail-right.png') repeat-y right 0;
        padding: 0 3px;
        width: 101%;
        left: -0.97%;
      }

    }

  }

</style>
