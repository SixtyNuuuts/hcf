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
    name: "Movie",
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
    font-family: 'Source Sans Pro', sans-serif;
    text-align: center;
    color: $--color-hcf-black;
    background-color: $--color-hcf-red;
    font-size: 100%;
    line-height: 1;
    min-width: 330px;
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
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.9);
      border-radius: 3px;
      background-color: #444444;
    }

    ::-webkit-scrollbar
    {
      width: 6px;
      border-radius: 3px;
      background-color: #444444;
    }

    ::-webkit-scrollbar-thumb
    {
      border-radius: 3px;
      background-color: #a51f1e;
      background-image: -webkit-linear-gradient(90deg,
                            transparent,
                            rgba(0, 0, 0, 0.4) 50%,
                            transparent,
                            transparent)
    }

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

    .content {
      line-height: 1.2;

      p {
        
        h1 {
          color: #3a2104;
          font-size: 1.7em;
          text-align: center;
          line-height: .9;
          border-bottom: 1px solid #3a2104;
          border-top: 1px solid #3a2104;
          padding: 0.4em 0;
        }

        strong, q {
          color: #3a2104;

        }

        em  {
          color: #8e6319;
        }

        q {
          display: block;
          text-align: right;
          color: #946c26;
          font-weight: bold;
          font-style: italic;
          margin: 1em 0;
          font-size: 1.2em;
        }

        a {
          text-decoration: underline;
          color: #946c26;
          font-weight: bold;
        }

      }

    }

    /////////////////////////////////////////

    #app {
      max-width: $--bp-lg;
      margin: 0 auto;
      background-color: $--color-hcf-beige;
      box-shadow: $--box-shadow-dark-6;

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
