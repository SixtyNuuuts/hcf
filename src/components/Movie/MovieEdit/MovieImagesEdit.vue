<template>
  <section class="movie-images-edit">
      <el-button
        type="success"
        icon="el-icon-plus"
        @click="addImage"
        class="add-image"
        plain
      >Ajouter une image
      </el-button>
    <div v-for="(img, i) in movieImages" :key="i">
      <el-button
        type="primary"
        icon="el-icon-delete"
        @click="deleteImage(img)"
        class="btn-delete-image"
      ></el-button>
      <img v-if="img.src" :src="img.src" class="image">
      <UploadFile @uploadFilePath="setUploadFilePath(img, $event)"/>
      <el-input placeholder="Url" v-model="img.src"></el-input>
      <el-input placeholder="Url minia" v-model="img.msrc"></el-input>
      <el-input placeholder="Largeur" v-model="img.w"></el-input>
      <el-input placeholder="Hauteur" v-model="img.h"></el-input>
    </div>
    <el-button
      type="success"
      icon="el-icon-check"
      @click="saveMovieImages"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
  </section>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";

export default {
  name: "MovieImages",
  props: {
    movieImages: Array
  },
  components: {
    UploadFile
  },
  methods: {
    setUploadFilePath(img, filePath) {
      img.src = filePath
      img.msrc = filePath
    },
    addImage() {
      this.$store.commit('ADD_IMAGES_TO_MOVIE_IMAGES', { src: '', msrc: '', alt: '', title: '', w: 200, h: 200 })
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
          this.$store.commit('REMOVE_IMAGES_FROM_MOVIE_IMAGES', image)
        })
        .catch(() => {
        });
    },
    saveMovieImages() {
      const movieYear = parseInt(this.$store.state.currentMovie.release_date.split('-')[0])
      this.$db.collection("movies").doc(this.$parent.id).get()
      .then((doc) => {
          if (doc.exists) {
            this.$db.collection("movies").doc(this.$parent.id).update({ movieImages: this.$store.state.currentMovieImages, year: movieYear })
            .then(() =>  {
                console.log("les Images du Film ont été mises à jour");
                console.log("movieImages bien modifié");
                this.$message({
                  type: 'info',
                  message: 'les Images du Film ont été mises à jour'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          } else {
            this.$db.collection("movies").doc(this.$parent.id).set({ movieImages: this.$store.state.currentMovieImages, year: movieYear })
            .then(() => {
                console.log("les Images du Film ont été ajoutées");
                console.log("movieImages bien enregistré");
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
  },
};
</script>

<style lang="scss">
.movie-images-edit {
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

