<template>
  <nav>
    <div class="ribbon-hole"></div>
    <!-- <router-link to="/">Liste des années</router-link> -->
    <div class="nav-content">
      <ul class="left-part">
        <li class="nav-item">
          <router-link to="/films/1930">
            <div>FILMS</div>
            <span>documentés</span>
          </router-link>
        </li>
        <li class="nav-item">
          <span>Recherchez un film</span>
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="Titre du film"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </li>
      </ul>
      <a class="logo" href="/">
          <img src="../assets/img/logo-h-c-f.svg" alt="Logo Histoire du cinema français" />
      </a>
      <ul class="right-part">
        <li class="nav-item mw">
          <span>Recherchez une personnalité</span>
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="Nom d'un(e) réal. / act."
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </li>
        <li class="nav-item">
          <a class="real" href="">
            <div>RÉALISATEURS</div>
            <span>documentés</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="ribbon-hole"></div>
  </nav>
</template>

<script>
// import tmdbApi from "../services/tmdb-api";

export default {
  name: "Nav",
  // created() {
  //   tmdbApi.getMovieCredits(this.id).then(res => {
  //     this.movieCast = res.data.cast;
  //   });
  // },
  // data() {
  //   return {
  //     movieCast: []
  //   };
  // },
  data() {
    return {
      startYear: 1930,
      // value: "",
      links: [],
      state1: '',
      state2: ''
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" }
        ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.links = this.loadAll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  background-color: #f7f0e1;
  width: 1000px;
  position: relative;
  z-index: 9;
  margin: 0 -20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3), 0 10px 12px rgba(0, 0, 0, 0.22);
  position: relative;

  .ribbon-hole {
    background: url("../assets/img/hole.svg") repeat-x 0 bottom, #000000;
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;

    ul {
      margin: 0;
      display: flex;

      .nav-item {
        font-family: 'Bazar';
        font-size: 1.6rem;
        display: flex;
        flex-direction: column;
        margin-right: 35px;
        justify-content: center;
        &.mw {
          max-width: 177px;
          margin-right: 25px;
        }

        >span {
          font-size: 0.85rem;
          line-height: 1;
          text-align: left;
          color: #a51f1e;
          font-family: 'Baskerville';
          font-weight: bold;
          margin-bottom: 4px;
        }

        a {
          font-size: 1.8rem;
          margin-top: 15px;
          text-shadow: 3px 3px 0 rgba(0,0,0,0.12);
          color: #a51f1e;
          &.real {
            font-size: 1.55rem;
          }

          span {
            font-size: 0.9rem;
            position: relative;
            top: -8px;
            color: #000;
            font-family: 'Baskerville';

            &:before, &:after {
              content: '';
              display: inline-block;
              height: 1px;
              position: relative;
              top: -3px;
              width: 7px;
              z-index: 2;
              background-color: #000;
            }

            &:before {
              margin-right: 5px;;
            }

            &:after {
              margin-left: 5px;;
            }

          }

        }

      }

    }

    .right-part {
      margin-right: -5px;
    }

    .logo {
      position: absolute;
      width: 19.5%;
      left: 40.15%;
      top: -28px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      width: 200px;
      box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3), 0 10px 12px rgba(0, 0, 0, 0.22);
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
      }

    }

  }

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
    background: url("../assets/img/left-ribbon.png");
  }
  &:after {
    right: 0px;
    background: url("../assets/img/right-ribbon.png");
  }
}
</style>
