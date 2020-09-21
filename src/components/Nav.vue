<template>
  <nav>
    <div class="ribbon-hole"></div>
    <div id="content" :class="{ 'menu-is-open': isMenuOpen }">
      <a href="/" class="logo">
          <img src="../assets/img/logo-h-c-f.svg" alt="Logo Histoire du cinema français" />
      </a>
      <div id="menu">
        <ul class="left-part">
          <li @click="toggleMenu">
            <router-link to="/films" :class="[currentPage.includes('film') ? 'is-active' : '']">
              Films
            </router-link>
          </li>
          <!-- <li class="search" :class="{ 'search-movie-is-open': idSearchMovieOpen }">
            <div class="search-title" @click="toggleSearchMovie"><i class="el-icon-search"></i>Recherchez un film</div>
            <el-autocomplete
              ref="searchm"
              class="inline-input"
              placeholder="Titre du film"
              :trigger-on-focus="false"
              @blur="toggleSearchMovie"
            ></el-autocomplete>
          </li> -->
        </ul>
        <ul class="right-part">
          <li @click="toggleMenu">
            <router-link to="/persons" :class="[currentPage.includes('person') ? 'is-active' : '']" class="personnalites">
              Personnalités
            </router-link>
          </li>
          <!-- <li class="search" :class="{ 'search-person-is-open': idSearchPersonOpen }">
            <div class="search-title" @click="toggleSearchPerson"><i class="el-icon-search"></i>Recherchez une personnalité</div>
            <el-autocomplete
              ref="searchp"
              class="inline-input"
              placeholder="Nom d'un(e) réal. / act."
              :trigger-on-focus="false"
              @blur="toggleSearchPerson"
            ></el-autocomplete>
          </li> -->
        </ul>
      </div>
      <div id="menu-icon" @click="toggleMenu">
        <span></span>
        <span></span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="ribbon-hole"></div>
  </nav>
</template>

<script>

export default {
  name: "Nav",
        data() {
    return {
      isMenuOpen: false,
      idSearchMovieOpen: false,
      idSearchPersonOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleSearchMovie() {
      this.idSearchMovieOpen = !this.idSearchMovieOpen;
      this.$nextTick(() => this.$refs.searchm.focus());
    },
    toggleSearchPerson() {
      this.idSearchPersonOpen = !this.idSearchPersonOpen;
      this.$nextTick(() => this.$refs.searchp.focus());
    },
  },
  computed: {
    currentPage() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang="scss">
  @import '../styles/bp.scss';  
  @import '../styles/color.scss';  
  @import '../styles/shadow.scss';  

  nav {
    background-color: $--color-hcf-llight-beige;
    box-shadow: $--box-shadow-dark-5;
    position: relative;
    z-index: 100;

    .ribbon-hole {
      background: url("../assets/img/hole.svg") repeat-x 0 bottom, $--color-hcf-black;
    }

    #content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.5em 5%;
      position: relative;

      .logo {
        position: absolute;
        left: 5%;
        top: -2em;
        z-index: 3;
        width: 9em;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $--color-hcf-black;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: $--box-shadow-5;
        transition: .4s ease-in-out;

        img {
          width: 100%;
          height: 100%;
        }

      }
      
      #menu {
        display: flex;
        flex-direction: column;
        height: 0;
        opacity: 0;
        overflow: hidden;
        transition: .4s ease-in-out;
        margin-top: 0em;
        align-items: center;
        width: 100%;
        max-width: 350px;

        ul {
          //margin: 1em 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          min-height: 90px;
          transition: .5s ease-in-out;
          width: 100%;

          /* &.left-part {
            margin-bottom: 3.5em;

            &::after {
              content: '';
              display: block;
              height: 10px;
              width: 100%;
              position: absolute;
              bottom: -2.6em;
              background: url("../assets/img/sep-1-star-black.svg") no-repeat center 0;
            }
            
          } */

          li {
            font-family: 'Righteous', sans-serif;
            position: relative;

            a {
              color: $--color-hcf-black;
              transition: .15s ease-in-out;
              position: relative;
              font-size: 1.95em;
              text-transform: uppercase;
              text-shadow: $--text-shadow-1;
              margin-bottom: .6em;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              &.is-active {
                color: $--color-hcf-red;
                text-shadow: $--text-shadow-2;
                font-size: 2.09em;

                &::after {
                  content: '';
                  display: block;
                  height: 10px;
                  width: 70%;
                  position: absolute;
                  bottom: -0.7em;
                  background: url("../assets/img/sep-3-stars.svg") no-repeat center 0;
                }

                &.personnalites {
                  font-size: 2.02em;
                }

              }

              &::after {
                content: '';
                display: block;
                height: 10px;
                width: 60%;
                position: absolute;
                bottom: -0.7em;
                background: url("../assets/img/sep-3-stars.svg") no-repeat center 0;
              }

              &.personnalites {
                font-size: 1.90em;
              }

            }        

            &:hover {
                a {
                  color: $--color-hcf-red;
                  text-shadow: $--text-shadow-1;
                }
              }    
          
            &.search {
              order: 1;
              margin-top: .9em;
              position: relative;

              i {
                color: $--color-hcf-red;
                margin-right: 5px;
              }

              &.search-movie-is-open, &.search-person-is-open {
                .search-title {
                  display: none;
                }
                .el-autocomplete {
                  display: block;
                }
              }

              .search-title {
                cursor: pointer;
                display: block;
                transition: .2s ease-in-out;

                &:hover {
                  color: $--color-hcf-red;
                }
                
              }

              .el-autocomplete {
                display: none;
              }

            }

          }
          
        }

      }

      //// BURGER ICON ////////////////
      $--val-burger-icon: 5px;
      #menu-icon {
        position: absolute;
        right: 2%;
        top: 1em;
        z-index: 3;
        width: 35px;
        height: $--val-burger-icon * 5;
        margin: .8em;
        transform: rotate(0deg);
        transition: .5s ease-in-out;
        cursor: pointer;

        &::before {
          content: "MENU";
          display: block;
          position: absolute;
          left: -72px;
          top: 2px;
          font-family: "Righteous";
          color: $--color-hcf-grey;
          font-size: 1.4em;
          opacity: 1;
          transition: .5s ease-in-out;
        }

        span {
          display: block;
          position: absolute;
          height: $--val-burger-icon;
          width: 100%;
          background: $--color-hcf-black;
          border-radius: $--val-burger-icon;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;

          &:nth-child(1) {
            top: 0px;
          }

          &:nth-child(2), &:nth-child(3) {
            top: $--val-burger-icon * 2;
          }

          &:nth-child(4) {
            top: $--val-burger-icon * 4;
          }
          
        }

      }

      @media (max-width: $--bp-md - 1) { 
        &.menu-is-open {

          .logo {
            width: 12em;
            left: calc(50% - 6em);
            top: 1.5em;
          }
          
          #menu {
            /*height: 19.5em;
            opacity: 1;
            margin-top: 12em;
            */
              height: 10.5em;
              opacity: 1;
              margin-top: 13em;
          }
          

          //// BURGER ICON ////////////////
          #menu-icon {

            &::before {
              opacity: 0;
            }

            span {

              &:nth-child(1), &:nth-child(4) {
                top: $--val-burger-icon * 2;
                width: 0%;
                left: 50%;
              }

              &:nth-child(2) {
                transform: rotate(45deg);
              }

              &:nth-child(3) {
                transform: rotate(-45deg);
              }

            }

          }

        }
      }
    }

  }

  @media (min-width: $--bp-md) { 
    nav {

      #content {
        padding: .8em 2%;

        .logo {
          width: 12.5em;
          left: calc(50% - 6.15em);
          top: -2.6em;
        }

        #menu {
          height: initial;
          opacity: 1;
          flex-direction: row;
          max-width: none;

          ul {
            margin: 0;

            &.left-part {
              margin-bottom: 0;
              margin-right: 15%;
              
              &::after {
                content: none;
              }
            
            }

            &.right-part {
              margin-left: 15%;
            }

          }

        }

        #menu-icon {
          display: none;
        } 

      }

    }

  }

  @media (min-width: $--bp-lg) { 
    nav {
      width: $--bp-lg + 40;
      left: -20px;    
      
      &:before,
      &:after {
        content: "";
        position: absolute;
        bottom: -15px;
        display: block;
        width: 20px;
        height: 15px;
      }
      &:before {
        left: 0px;
        background: url("../assets/img/left-ribbon.svg");
      }
      &:after {
        right: 0px;
        background: url("../assets/img/right-ribbon.svg");
      }

      #content {
        padding: .8em 5%;

      }
    }
  }

</style>
