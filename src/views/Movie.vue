<template>
<section id="movie">
    <vue-headful v-if="currentMovie.original_title" :title="currentMovie.original_title + ' | Cinéma Français d\'Autrefois'" :description="currentMovie.original_title" />
    <LoginAdmin v-if="view === 'edit' && !isAdmin" />
    <div v-else-if="view === 'edit' && isAdmin">
        <MovieDetailsEdit :movie="currentMovie" :movieCrew="currentMovieCrew" />
        <MovieCastEdit :movieCast="currentMovieCast" />
        <DocuEdit :docu="currentMovieDocumented" docuType="movie" />
        <ImagesGalleryEdit :images="currentMovieImages" galleryType="movie" />
    </div>
    <div v-else-if="isUserLogged">
        <MovieDetails :movie="currentMovie" :movieCrew="currentMovieCrew" />
        <MovieCast :movieCast="currentMovieCast" />
        <Docu v-if="currentMovieDocumented.colLeftContent.length || currentMovieDocumented.colRightContent.length" :docu="currentMovieDocumented" />
        <ImagesGallery v-if="currentMovieImages.length" :images="currentMovieImages" />
    </div>
    <div v-else>
        <LoginUser/>
    </div>
</section>
</template>

<script>
import MovieDetails from "@/components/Movie/MovieDetails.vue";
import MovieCast from "@/components/Movie/MovieCast.vue";
import Docu from "@/components/Docu.vue";
import ImagesGallery from "@/components/ImagesGallery.vue";
import LoginAdmin from "@/components/Edit/LoginAdmin.vue";
import LoginUser from "@/components/LoginUser.vue";
import MovieDetailsEdit from "@/components/Movie/MovieEdit/MovieDetailsEdit.vue";
import MovieCastEdit from "@/components/Movie/MovieEdit/MovieCastEdit.vue";
import DocuEdit from "@/components/Edit/DocuEdit.vue";
import ImagesGalleryEdit from "@/components/Edit/ImagesGalleryEdit.vue";
import f from "../services/func";

export default {
    name: "Movie",
    components: {
        MovieDetails,
        MovieCast,
        Docu,
        ImagesGallery,
        LoginAdmin,
        LoginUser,
        MovieDetailsEdit,
        MovieCastEdit,
        DocuEdit,
        ImagesGalleryEdit,
    },
    created() {
        this.view = this.$route.params.view
        this.id = this.$route.params.id
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
        currentMovie() {
            return this.$store.state.currentMovie
        },
        currentMovieCrew() {
            return f.sortedByOrder(this.$store.state.currentMovieCrew)
        },
        currentMovieCast() {
            return f.sortedByOrder(this.$store.state.currentMovieCast)
        },
        currentMovieDocumented() {
            return this.$store.state.currentDocumentedMovie
        },
        currentMovieImages() {
            return this.$store.state.currentMovieImages
        }
    },
    methods: {
        getStoreData(isUserLogged) {
            if (isUserLogged) {
                this.$store.dispatch("getCurrentMovie", this.id)
                this.$store.dispatch("getCurrentMovieCrew", this.id)
                this.$store.dispatch("getCurrentMovieCast", this.id)
                this.$store.dispatch("getCurrentMovieDocumented", this.id)
                this.$store.dispatch("getCurrentMovieImages", this.id)
            }
        }
    },
};
</script>
