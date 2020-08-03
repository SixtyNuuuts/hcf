<template>
  <section id="person">
    <!-- <LoginAdmin v-if="type === 'edit' && !isAdmin" />
    <div v-else-if="type === 'edit' && isAdmin" >
      <PersonDetailsEdit :person="currentPerson" :personCrew="currentPersonCrew"/>
      <PersonCastEdit :personCast="currentPersonCast" />
      <PersonDocuEdit :personDocumented="currentPersonDocumented" />
      <PersonImagesEdit :personImages="currentPersonImages" />
    </div> -->
    <!-- <div v-else> -->
      <PersonDetails :person="currentPerson"/>
      <PersonFilmography :personCredits="currentPersonCredits"/>
      <PersonImages v-if="currentPersonImages.length" :personImages="currentPersonImages"/>
    <!-- </div> -->
  </section>
</template>

<script>
  import PersonDetails from "@/components/Person/PersonDetails.vue";
  import PersonFilmography from "@/components/Person/PersonFilmography.vue";
  import PersonImages from "@/components/Person/PersonImages.vue";
  //import LoginAdmin from "@/components/Person/PersonEdit/LoginAdmin.vue";
  import f from "../services/func";

  export default {
    name: "Person",
    components: {
      PersonDetails,
      PersonFilmography,
      PersonImages,
    },
    created() {
      this.type = this.$route.params.type;
      this.id = this.$route.params.id;
      this.$store.dispatch("getCurrentPerson", this.id);
      this.$store.dispatch("getCurrentPersonCredits", this.id);
      this.$store.dispatch("getCurrentPersonImages", this.id);
    },
    data() {
      return {
        id: null,
        type: null
      };
    },
    computed: {
      // isAdmin() {
      //   return this.$store.state.currentUser.admin;
      // },
      currentPerson() {
        return this.$store.state.currentPerson;
      },
      currentPersonCredits() {
        return f.sortedByDate(this.$store.state.currentPersonCredits);
      },
      currentPersonImages() {
        return this.$store.state.currentPersonImages;
      },
    },
  };
</script>
