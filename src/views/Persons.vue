<template>
  <section id="persons">
    <div class="title">
      <div>
        <h1>LES PERSONNALITÉS DOCUMENTÉES <span v-if="isAdmin">({{ personsListByAlphabet.length }})</span></h1>
          <h2>par ordre alphabétique</h2>
          <ul class="alphabet">
            <li @click="handleLetterSelected()" :class="{ 'active': !selectedLetter }">TOUS</li>
            <li v-for="letter in letters" :key="letter" @click="handleLetterSelected(letter)" :class="{ 'active': letter === selectedLetter }">
              {{ letter }}
            </li>
          </ul>
      </div>
    </div>
    <PersonsList :persons="personsListByAlphabet" />
  </section>
</template>

<script>
  import PersonsList from "@/components/Persons/PersonsList.vue"
  import f from "../services/func";

  export default {
    created() {
      this.$store.dispatch("getPersons");
    },
    data() {
      return {
        letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        selectedLetter: "",
      }
    },
    methods: {
      handleLetterSelected(letter) {
        this.selectedLetter = letter;
      }
    },
    computed: {
      personsListByAlphabet() {
        if(!this.selectedLetter) {
          return this.$store.state.currentPersonsList;
        }
        return f.sortedByAlphabetPerson(this.$store.state.currentPersonsList.filter(p => p.lastname.charAt(0) === this.selectedLetter));
      },
      isAdmin() {
        return this.$store.state.currentUser.admin;
      },
    },
    name: "Persons",
    components: {
      PersonsList,
    }
  }
</script>

<style scoped lang="scss">

@import '@/styles/color.scss';  
@import '@/styles/shadow.scss';  
@import '@/styles/bp.scss';

  #persons {
    padding: 4em 1.45em 2em 1.5em;

    .title {
      padding: 3.2em 3.6em;
      position: relative;
      text-align: center;
      z-index: 2;
      background: url("../assets/img/box-border-patern.png") repeat 0 0 $--color-hcf-beige;
      font-family: "Righteous";
      line-height: 1.2;

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
        color: $--color-hcf-ddark-brown;
        margin: 0.5em; 
        margin-top: 0.2em;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
        font-size: 1.9rem;
      }

      h2 {
          font-weight: 500;
          color: #d7c6af;
          font-size: 1.3rem;
          margin: 0;
          margin-bottom: 0.4rem;
      }

      ul.alphabet {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        li {
          &:first-child {
            margin: .4rem 50%!important;
            min-width: 4rem;
          }
          color: $--color-hcf-red;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.1rem 0.45rem;
          border-radius: 3px;
          background-color: $--color-hcf-light-beige;
          font-size: 1.45rem;
          // margin: .2rem .05rem;
          margin-left: .05rem;
          margin-right: .05rem;
          margin-top: .2rem;
          margin-bottom: .2rem;
          transition: background-color .3s, color .3s, margin-left .3s, margin-right .3s;
          cursor: pointer;

          &:hover, &.active {
            color: $--color-hcf-light-beige;
            background-color: $--color-hcf-red;
            box-shadow: $--box-shadow-brown-2;
          }
          &.active {
            // margin: .3rem .3rem .3rem .43rem;
            margin-left: .43rem;
            margin-right: .3rem;
            margin-top: .3rem;
            margin-bottom: .3rem;
          }
        }
      }

    }

  }

@media (max-width: 400px) {
    #persons {
      .title {
        padding: 2.5em;
        h1 {
          font-size: 1.7rem;
        }
      }
   }
}

</style>
