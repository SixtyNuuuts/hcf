<template>
<section id="person">
    <vue-headful v-if="currentPerson.name" :title="currentPerson.name + ' | Cinéma Français d\'Autrefois'" :description="currentPerson.name" />
    <LoginAdmin v-if="view === 'edit' && !isAdmin" />
    <div v-else-if="view === 'edit' && isAdmin">
        <PersonDetailsEdit :person="currentPerson" />
        <PersonFilmographyEdit :personCredits="currentPersonCredits" />
        <DocuEdit :docu="currentPersonDocumented" docuType="person" />
        <ImagesGalleryEdit v-if="currentPersonImages.length" :images="currentPersonImages" galleryType="person" />
    </div>
    <div v-else-if="isUserLogged">
        <PersonDetails :person="currentPerson" />
        <PersonFilmography :personCredits="currentPersonCredits" />
        <Docu v-if="currentPersonDocumented.colLeftContent.length || currentPersonDocumented.colRightContent.length" :docu="currentPersonDocumented" />
        <ImagesGallery v-if="currentPersonImages.length" :images="currentPersonImages" />
    </div>
    <div v-else>
        <LoginUser/>
    </div>
</section>
</template>

<script>
import PersonDetails from "@/components/Person/PersonDetails.vue";
import PersonFilmography from "@/components/Person/PersonFilmography.vue";
import Docu from "@/components/Docu.vue";
import ImagesGallery from "@/components/ImagesGallery.vue";
import LoginAdmin from "@/components/Edit/LoginAdmin.vue";
import PersonDetailsEdit from "@/components/Person/PersonEdit/PersonDetailsEdit.vue";
import PersonFilmographyEdit from "@/components/Person/PersonEdit/PersonFilmographyEdit.vue";
import DocuEdit from "@/components/Edit/DocuEdit.vue";
import ImagesGalleryEdit from "@/components/Edit/ImagesGalleryEdit.vue";
import f from "../services/func";
import LoginUser from "@/components/LoginUser.vue";

export default {
    name: "Person",
    components: {
        PersonDetails,
        PersonFilmography,
        Docu,
        ImagesGallery,
        LoginAdmin,
        LoginUser,
        PersonDetailsEdit,
        PersonFilmographyEdit,
        DocuEdit,
        ImagesGalleryEdit
    },
    created() {
        this.view = this.$route.params.view;
        this.id = this.$route.params.id;
        this.getStoreData(this.isUserLogged);
    },
    data() {
        return {
            id: null,
            view: null
        };
    },
    watch: {
        isUserLogged(newValue) {
            this.getStoreData(newValue);
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.currentUser.admin;
        },
        isUserLogged() {
            return this.$store.state.currentUser.loggedIn;
        },
        currentPerson() {
            return this.$store.state.currentPerson;
        },
        currentPersonCredits() {
            return f.sortedByDate(this.$store.state.currentPersonCredits);
        },
        currentPersonDocumented() {
            return this.$store.state.currentDocumentedPerson;
        },
        currentPersonImages() {
            return this.$store.state.currentPersonImages;
        },
    },
    methods: {
        getStoreData(isUserLogged) {
            if (isUserLogged) {
                this.$store.dispatch("getCurrentPerson", this.id);
                this.$store.dispatch("getCurrentPersonCredits", this.id);
                this.$store.dispatch("getCurrentPersonDocumented", this.id)
                this.$store.dispatch("getCurrentPersonImages", this.id);
                if (!this.$store.state.allDocumentedMovieList.length) {
                    this.$store.dispatch("getAllDocumentedMovies");
                }
            }
        }
    },
};
</script>
