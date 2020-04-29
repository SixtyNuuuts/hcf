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
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "Movie",
  components: {
    Nav
  }
};
</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');

    body {
      padding: 0;
      margin: 0;
      background-image: url("assets/img/rideaux-rouges-top.png"), url("assets/img/rideaux-rouges-bottom.png");
      background-position: top, bottom;
      background-repeat: repeat-x;
      background-color: #a61918;

      .ribbon-hole {
        height: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .frieze-film-deco {
        position: absolute;
        z-index: -1;
        top: 61px;
        left: 0;
        width: 100%;
        box-shadow: 0 14px 38px rgba(0,0,0,0.50), 0 10px 12px rgba(0,0,0,0.22);

        .ribbon-hole {
          background: url("assets/img/hole-frieze.svg") repeat-x 0 bottom, #000000;
        }

        .frieze-img{
          height: 100px;
          background-image: url("assets/img/frieze-img.jpg");
          background-repeat: repeat-x;
        }

      }

      #app {
        font-family: 'Source Sans Pro', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #000;
        width: 960px;
        margin: 0 auto;        

        .top-tail {
          background-color: #a51f1e;
          height: 41px;
        }

        main {
          box-shadow: inset 0 17px 61px 0 rgba(206,136,24,.24);
          background-color: #f6e5c8;

          p {
            margin: 0;
          }
        }

      }

    }

    a {
      text-decoration: none;
    }

    ul {
      list-style: none;
    }
  
  </style>
