<template>
  <section id="person">
    <LoginAdmin v-if="view === 'edit' && !isAdmin"/>
    <div v-else-if="view === 'edit' && isAdmin" >
      <PersonDetailsEdit :person="currentPerson"/>
      <PersonFilmographyEdit :personCredits="currentPersonCredits"/>
      <ImagesGalleryEdit v-if="currentPersonImages.length" :images="currentPersonImages" galleryType="person"/>
    </div>
    <div v-else>
      <PersonDetails :person="currentPerson"/>
      <PersonFilmography :personCredits="currentPersonCredits"/>
      <ImagesGallery v-if="currentPersonImages.length" :images="currentPersonImages" galleryType="person"/>
    </div>
  </section>
</template>

<script>
  import PersonDetails from "@/components/Person/PersonDetails.vue";
  import PersonFilmography from "@/components/Person/PersonFilmography.vue";
  import ImagesGallery from "@/components/ImagesGallery.vue";
  import LoginAdmin from "@/components/Edit/LoginAdmin.vue";
  import PersonDetailsEdit from "@/components/Person/PersonEdit/PersonDetailsEdit.vue";
  import PersonFilmographyEdit from "@/components/Person/PersonEdit/PersonFilmographyEdit.vue";
  import ImagesGalleryEdit from "@/components/Edit/ImagesGalleryEdit.vue";
  import f from "../services/func";

  export default {
    name: "Person",
    components: {
      PersonDetails,
      PersonFilmography,
      ImagesGallery,
      LoginAdmin,
      PersonDetailsEdit,
      PersonFilmographyEdit,
      ImagesGalleryEdit
    },
    created() {
      this.view = this.$route.params.view;
      this.id = this.$route.params.id;
      this.$store.dispatch("getCurrentPerson", this.id);
      this.$store.dispatch("getCurrentPersonCredits", this.id);
      this.$store.dispatch("getCurrentPersonImages", this.id);
    },
    data() {
      return {
        id: null,
        view: null
      };
    },
    computed: {
      isAdmin() {
        return this.$store.state.currentUser.admin;
      },
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
