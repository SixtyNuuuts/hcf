<template>
  <div id="app">
    <div class="frieze-film-deco">
      <div class="ribbon-hole"></div>
      <div class="frieze-img"></div>
      <div class="ribbon-hole"></div>
    </div>
    <div class="top-tail"></div>
    <Nav/>
    <main>
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
  import Nav from "@/components/Nav.vue";
  import Footer from "@/components/Footer.vue";

  export default {
    name: "HCF",
    components: {
      Nav,
      Footer
    }
  };
</script>

<style lang="scss">

  @import 'styles/font.scss';
  @import 'styles/bp.scss';  
  @import 'styles/color.scss';  
  @import 'styles/shadow.scss';  

  body {
    margin: 0;
    padding: 0;
    min-width: 330px;
    color: $--color-hcf-black;
    background-color: $--color-hcf-red;
    background: linear-gradient(0deg, rgba(0,0,0,.9) 5%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 70%, rgba(0,0,0,.9) 100%), url("assets/img/red-curtain-pattern.svg");
    background-size: 700px;
    min-height: 100vh;

    a {
      text-decoration: none;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ::-webkit-scrollbar-track
    {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
      border-radius: 3px;
      background-color: rgba(68, 68, 68, 0.05);
    }

    ::-webkit-scrollbar
    {
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: rgba(68, 68, 68, 0.05);
    }

    ::-webkit-scrollbar-thumb
    {
      border-radius: 3px;
      background-color: rgba(56, 52, 47, 0.699);
    }

    // ::-webkit-scrollbar-track
    // {
    //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.9);
    //   border-radius: 3px;
    //   background-color: #444444;
    // }

    // ::-webkit-scrollbar
    // {
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 3px;
    //   background-color: #444444;
    // }

    // ::-webkit-scrollbar-thumb
    // {
    //   border-radius: 3px;
    //   background-color: #a51f1e;
    //   background-image: -webkit-linear-gradient(90deg,
    //                         transparent,
    //                         rgba(0, 0, 0, 0.4) 50%,
    //                         transparent,
    //                         transparent)
    // }

    .VueCarousel-navigation-button {
      color: $--color-hcf-red !important;

      &:focus {
        outline: none !important;
      }

      &.VueCarousel-navigation-next {
        
        &::after {
          content: '';
          display: block;
          height: 24px;
          width: 24px;
          background: url("./assets/img/icon-next.svg") no-repeat center 0;;
          position: absolute;
          top: 3px;
          left: 0px;
        }

        &.VueCarousel-navigation--disabled {
          &::after {
            content: '';
            display: block;
            height: 24px;
            width: 24px;
            background: url("./assets/img/icon-next-disabled.svg") no-repeat center 0;;
            position: absolute;
            top: 3px;
            left: 0px;
          }
        }

      }

      &.VueCarousel-navigation-prev {
        
        &::after {
          content: '';
          display: block;
          height: 24px;
          width: 24px;
          background: url("./assets/img/icon-prev.svg") no-repeat center 0;;
          position: absolute;
          top: 3px;
          right: 0px;
        }

        &.VueCarousel-navigation--disabled {
          &::after {
            content: '';
            display: block;
            height: 24px;
            width: 24px;
            background: url("./assets/img/icon-prev-disabled.svg") no-repeat center 0;;
            position: absolute;
            top: 3px;
            right: 0px;
          }
        }

      }


    }

    .ql-editor {
      padding: .3em;
      max-width: 440px;
      font-size: 18px;
      line-height: 1.2;
      font-family: 'Source Sans Pro', sans-serif;
      text-align: left;
      min-height: none;
      
      h1 {
        color: #3a2104;
        line-height: 1.1;
        font-size: 1.7em!important;
        text-align: center;
        border-bottom: 1px solid #3a2104;
        border-top: 1px solid #3a2104;
        padding: 0.4em 0 !important;
      }

      .ql-align-justify {
        text-align: justify;
      }

      .ql-align-left {
        text-align: left;
      }

      .ql-align-center {
        text-align: center;
      }

      .ql-align-right {
        text-align: right;
      }

      .ql-size-small {
          font-size: .75em;
      }

      .ql-size-large {
          font-size: 1.25em;
      }

      .ql-size-huge {
          font-size: 1.5em;
      }

      a {
        font-weight: 600 !important;
        color: #946a3b !important;
        text-decoration: underline;
      }

    }

    .quillWrapper {
      margin: 0 !important;
      .ql-container {
        border: 0px solid #ccc;
      }
    }

    .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6, .ql-editor ol, .ql-editor p, .ql-editor pre, .ql-editor ul {
        margin: 0;
        padding: 0;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }

    .my-gallery {
      display: flex;
      flex-wrap: wrap;
      background-color: rgb(15, 15, 15);     
      box-shadow: inset 0px 0px 20px 1px rgba(0, 0, 0, 0.7);
      justify-content: center;
      overflow: hidden;
      padding: 1% 1%;
      figure {
        width: 10%;
        margin: 1%;
        position: relative;
        top:0;
        transition: .3s ease;
        display: flex;
        align-items: center;
        &:hover {
          top:-5px;
        }
        a {
          img {
            width: 100%;
            object-fit: contain;
            box-shadow: 0 3px 6px rgba(15, 12, 10, 1), 0 3px 6px rgba(15, 12, 10, 1);
          }
        }
      }
    }

    // @media (min-width: $--bp-md) { 
    //   .my-gallery {
    //     figure {
    //       width: 20%;
    //     }
    //   }  
    // }

    /////////////////////////////////////////

    #app {
      max-width: $--bp-lg;
      margin: 0 auto;
      background-color: $--color-hcf-beige;
      box-shadow: $--box-shadow-dark-6;
      font-family: 'Source Sans Pro', sans-serif;
      text-align: center;
      font-size: 100%;
      line-height: 1;

      .top-tail {
        background-color: #a51f1e;
        height: 30px;
      }

      .frieze-film-deco {
        position: absolute;
        z-index: -1;
        top: 50px;
        left: 0;
        width: 100%;
        box-shadow: $--box-shadow-dark-4;

        .ribbon-hole {
          background: url("assets/img/hole-frieze.svg") repeat-x 0 bottom, #000;
        }

        .frieze-img {
          height: 110px;
          background-image: url("assets/img/frieze-img.jpg");
          background-repeat: repeat-x;

        }
      }

      .ribbon-hole {
        height: 15px; //20px
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      main {
        box-shadow: inset 0 17px 61px 0 rgba(206,136,24,.24);
      }

    }

  }
  
  </style>
