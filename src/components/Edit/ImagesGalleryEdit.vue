<template>
  <section class="images-gallery-edit">
    <el-button
      type="success"
      icon="el-icon-plus"
      @click="addImage"
      class="add-image"
      plain
    >Ajouter une image
    </el-button>
    <div v-for="(img, i) in images" :key="i">
      <el-button
        type="primary"
        icon="el-icon-delete"
        @click="deleteImage(img)"
        class="btn-delete-image"
      ></el-button>
      <img v-if="img.src" :src="img.src" class="image">
      <UploadFile @uploadFilePath="setUploadFilePath(img, $event)"/>
      <el-input placeholder="Url" v-model="img.src"></el-input>
      <el-input placeholder="Largeur" v-model="img.w"></el-input>
      <el-input placeholder="Hauteur" v-model="img.h"></el-input>
    </div>
    <el-button
      v-if="galleryType === 'movie'"
      type="success"
      icon="el-icon-check"
      @click="saveMovieImages"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
    <el-button
      v-if="galleryType === 'person'"
      type="success"
      icon="el-icon-check"
      @click="savePersonImages"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
  </section>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";

export default {
  name: "ImagesGalleryEdit",
  props: {
    images: Array,
    galleryType: String,
  },
  components: {
    UploadFile
  },
  methods: {
    setUploadFilePath(img, filePath) {
      img.src = filePath
      img.msrc = filePath
      
      // get img dimensions
      let uploadImg = new Image();
      uploadImg.src = filePath;
      uploadImg.addEventListener("load", function(){
        img.w = this.naturalWidth
        img.h = this.naturalHeight
      });
    },
    addImage() {
      if (this.galleryType === 'movie') {
        this.$store.commit('ADD_IMAGE_TO_MOVIE_IMAGES', { src: '', msrc: '', alt: '', title: '', w: 200, h: 200 })
      }
      if (this.galleryType === 'person') {
        this.$store.commit('ADD_IMAGE_TO_PERSON_IMAGES', { src: '', msrc: '', alt: '', title: '', w: 200, h: 200 })
      }
    },
    deleteImage(image) {
      this.$confirm(
        "Êtes-vous sûr de vouloir supprimer cette image ?",
        "Confirmation",
        {
          confirmButtonText: "Confirmer",
          cancelButtonText: "Annuler"
        }
      )
        .then(() => {
          if (this.galleryType === 'movie') {
            this.$store.commit('REMOVE_IMAGE_FROM_MOVIE_IMAGES', image)
          }
          if (this.galleryType === 'person') {
            this.$store.commit('REMOVE_IMAGE_FROM_PERSON_IMAGES', image)
          }
        })
        .catch(() => {
        });
    },
    saveMovieImages() {
      const movieYear = parseInt(this.$store.state.currentMovie.release_date.split('-')[0])
      this.$db.collection("movies").doc(this.$parent.id).get()
      .then((doc) => {
          if (doc.exists) {
            this.$db.collection("movies").doc(this.$parent.id).update({ movieImages: this.$store.state.currentMovieImages })
            .then(() =>  {
                console.log("les Images du Film ont été mises à jour");
                this.$message({
                  type: 'info',
                  message: 'les Images du Film ont été mises à jour'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          } else {
            this.$db.collection("movies").doc(this.$parent.id).set({ movie: this.$store.state.currentMovie, movieCrew: this.$store.state.currentMovieCrew, movieCast: this.$store.state.currentMovieCast, movieImages: this.$store.state.currentMovieImages, year: movieYear })
            .then(() => {
                console.log("les Images du Film ont été ajoutées");
                this.$message({
                  type: 'info',
                  message: 'les Images du Film ont été ajoutées'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    },
    savePersonImages() {
      this.$db.collection("persons").doc(this.$parent.id).get()
      .then((doc) => {
        console.log(doc)
          if (doc.exists) {
            this.$db.collection("persons").doc(this.$parent.id).update({ personImages: this.$store.state.currentPersonImages })
            .then(() => {
                console.log("les Images de la personnalité ont été mises à jour");
                this.$message({
                  type: 'info',
                  message: 'les Images de la personnalité ont été mises à jour'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          } else {
            this.$db.collection("persons").doc(this.$parent.id).set({ person: this.$store.state.currentPerson, personCredits: this.$store.state.currentPersonCredits, personImages: this.$store.state.currentPersonImages })
            .then(() => {
                console.log("les Images de la personnalité ont été ajoutées");
                this.$message({
                  type: 'info',
                  message: 'les Images de la personnalité ont été ajoutées'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    },
  },
};
</script>

<style lang="scss">
.images-gallery-edit {
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 8% 1%;
  position: relative;

  .add-image {
    position: absolute;
    top: 2em;
    right: 2.4em;
    z-index: 1;
  }
  .save-btn {
    position: absolute;
    bottom: 2.5em;
    right: 3em;
  }

  >div {
    width: 25%;
    margin: 2%;
    position: relative;

    .btn-delete-image {
        position: absolute;
        right:0;
        top: 0;
        padding: 0.7em;
        z-index: 1;
      }


  .image {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  }

}
</style>

