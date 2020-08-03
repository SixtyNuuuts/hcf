<template>
  <section id="persons">
    <div class="title">
      <div>
        <h1>
          LES PERSONNALITÉS DOCUMENTÉS
          <el-select v-model="selectedLetter" filterable @change="handleLetterSelected">
            <el-option
              v-for="letter in letters"
              :key="letter"
              :label="letter"
              :value="letter"
            ></el-option>
          </el-select>
        </h1>
      </div>
    </div>
    <!-- <PersonsDocuList :persons="documentedMovieListByYear" />
    <PersonsList :persons="movieListByYear" :year="selectedLetter" /> -->
  </section>
</template>

<script>
  // import PersonsDocuList from "@/components/Persons/PersonsDocuList.vue"
  // import PersonsList from "@/components/Persons/PersonsList.vue"
  // import f from "../services/func";

  export default {
    created() {
      // this.$store.dispatch("getPersonsByYear", this.selectedLetter)
      // this.$store.dispatch("getDocumentedPersonsByYear", this.selectedLetter)
    },
    data() {
      return {
        letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        selectedLetter: "A",
      }
    },
    methods: {
      handleLetterSelected(letter) {
        console.log(letter);
        // this.$store.commit('SET_CURRENT_YEAR_SELECTED', year)
        // this.$store.dispatch("getPersonsByYear", year)
        // this.$store.dispatch("getDocumentedPersonsByYear", year)
      }
    },
    computed: {
      // movieListByYear() {
      //   return f.sortedByAlphabet(this.$store.state.currentMovieListByYear)
      // },
      // documentedMovieListByYear() {
      //   return f.sortedByAlphabet(this.$store.state.currentDocumentedMovieListByYear)
      // },
    },
    name: "Persons",
    // components: {
    //   PersonsList,
    //   PersonsDocuList
    // }
  }
</script>

<style scoped lang="scss">

@import '../styles/color.scss';  

  #persons {
    padding: 3em 1.45em 0 1.5em;

    .title {
      margin: 0 0 2em;
      padding: 1.5em;
      position: relative;
      text-align: center;
      z-index: 2;
      background: url("../assets/img/box-border-patern.png") repeat 0 0 $--color-hcf-beige;

      &:before {
        background: $--color-hcf-light-beige;
        bottom: 0;
        content: "";
        display: block;
        left: 0;
        margin: 1.5em;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
      }

      h1 {
        font-family: "Righteous";
        color: $--color-hcf-ddark-brown;
        font-size: 1.9em;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
        line-height: 1.2;
        margin: 0.8em 1em 1em 1em; 

        .el-select {
          margin-top: 0.25em;
        }

      }

    }

  }
</style>
