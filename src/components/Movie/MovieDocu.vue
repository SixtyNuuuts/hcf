<template>
  <section id="moviedocu">
    <div class="moviedocu_border">
      <div class="moviedocu_container">
        <h1>EN SAVOIR +</h1>
        <div class="moviedocu_content">
          <div class="col-left">
            <div v-for="(item, index) in colLeftMovieDocu" :key="index">
              <div class="content" v-if="item.type === 'text'">
                <div class="ql-editor" v-html="item.content"></div>
              </div>
              <div class="content" v-if="item.type === 'picture'">
                <figure class="pict">
                  <div :style=" { minHeight: item.height+'px', height: item.height+'px' }">
                    <img :src="item.path" :alt="item.caption?item.caption:'Image'">
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
              </div>
              <div class="content" v-if="item.type === 'video'">
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
              </div>
              <div class="content" v-if="item.type === 'youtube'">
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <iframe :style=" { minHeight: item.height+'px', height: item.height+'px' }" :src="item.path" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
              </div>
              <div class="content" v-if="item.type === 'audio'">
                <figure class="audio">
                    <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                    <audio
                        controls
                        :src="item.path">
                        Votre navigateur ne supporte pas ce fichier audio.
                    </audio>
                </figure>
              </div>
            </div> 
          </div>
          <div class="col-right">
            <div v-for="(item, index) in colRightMovieDocu" :key="index">
              <div class="content" v-if="item.type === 'text'">
                <div class="ql-editor" v-html="item.content"></div>
              </div>
              <div class="content" v-if="item.type === 'picture'">
                <figure class="pict">
                  <div :style=" { minHeight: item.height+'px', height: item.height+'px' }">
                    <img :src="item.path" :alt="item.caption?item.caption:'Image'">
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
              </div>
              <div class="content" v-if="item.type === 'video'">
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
              </div>
              <div class="content" v-if="item.type === 'youtube'">
                <figure class="video">
                  <div>
                    <div class="ribbon-hole"></div>
                    <iframe :style=" { minHeight: item.height+'px', height: item.height+'px' }" :src="item.path" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="ribbon-hole"></div>
                  </div>
                  <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                </figure>
              </div>
              <div class="content" v-if="item.type === 'audio'">
                <figure class="audio">
                    <figcaption v-if="item.caption">{{item.caption}}</figcaption>
                    <audio
                        controls
                        :src="item.path">
                        Votre navigateur ne supporte pas ce fichier audio.
                    </audio>
                </figure>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import f from "@/services/func";

export default {
  name: "MovieDocu.",
  props: {
    movieDocumented: Object,
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
  @import '../../styles/bp.scss';  
  @import '../../styles/color.scss';  
  @import '../../styles/shadow.scss';  

  #moviedocu {
    box-shadow: $--box-shadow-dark-5;
    position: relative;
    width: 100%;
    z-index: 100;

    .moviedocu_border {
      position: relative;
      width: 100%;

      .moviedocu_container {
        background: url('../../assets/img/main-pattern.jpg') repeat scroll left top;
        padding: 2%;
        padding-bottom: 4%;

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
            left: 0;
          }

          &:after {
            right: 0;
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
              margin: 2em 1%;
            }

            p {
              text-align: justify;
              margin: 1em 0;
              
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
                  line-height: 1.1;
                }
              }

              &.audio {
                background-color: $--color-hcf-beige;
                padding: 1em 2em 1.1em 2em;
                border-radius: 5px;
                figcaption {
                  margin-bottom: 0.8em;
                  color: $--color-hcf-brown  ;
                  font-size: 1em;
                  font-weight: 700;
                  line-height: 1.15;
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
        background: url('../../assets/img/content-tail-left.png') repeat-y 0 0, url('../../assets/img/content-tail-right.png') repeat-y right 0;
        padding: 0 3px;
        width: 101%;
        left: -0.97%;
      }

    }

  }

</style>
