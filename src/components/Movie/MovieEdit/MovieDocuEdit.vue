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
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5}"
                  placeholder="Entrez quelque chose"
                  v-model="item.content">
                </el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div class="content" v-if="item.type === 'picture'">
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
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <iframe :style=" { minHeight: item.height+'px', height: item.height+'px' }" :src="item.path" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
                <el-input placeholder="Url" v-model="item.path"></el-input>
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
              <div v-if="item.type === 'text'">
                <h1>Texte</h1>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Entrez quelque chose"
                  v-model="item.content">
                </el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div v-if="item.type === 'picture'">
                <h1>Photo</h1>
                <el-input placeholder="Url" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
                <el-input placeholder="Position" v-model="item.order"></el-input>
              </div>
              <div v-if="item.type === 'video'">
                <h1>Vidéo</h1>
                <el-input placeholder="Url" v-model="item.path"></el-input>
                <el-input placeholder="Légende" v-model="item.caption"></el-input>
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
    addTextCL() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'left', content: {type: 'text', content:'', order: this.colLeftMovieDocu.length} })
    },
    addPictureCL() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'left', content: {type: 'picture', path:'', height:'150', caption:'', order: this.colLeftMovieDocu.length} })
    },
    addVideoCL() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'left', content: {type: 'video', path:'', height:'150', caption:'', order: this.colLeftMovieDocu.length} })
    },
    addTextCR() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'right', content: {type: 'text', content:'', order: this.colRightMovieDocu.length} })
    },
    addPictureCR() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'right', content: {type: 'picture', path:'', height:'150', caption:'', order: this.colRightMovieDocu.length} })
    },
    addVideoCR() {
      this.$store.commit('ADD_CONTENT_TO_DOCUMENTED_MOVIE', { col: 'right', content: {type: 'video', path:'', height:'150', caption:'', order: this.colRightMovieDocu.length} })
    },
    saveMovieDocumented() {
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
            this.$db.collection("movies").doc(this.$parent.id).set({ movieDocumented: this.$store.state.currentDocumentedMovie, documented: true })
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
