<template>
  <section class="person-info" :style="{ backgroundImage: backgroundImage }">
    <div class="content" :class="{'is-loading' : isLoading}">
      <div class="poster" :class="{'is-loading' : isLoading}">
        <img v-if="person.profile_path" :src="person.profile_path">
        <div v-else class="no-picture">
          <img v-if="person.gender == 1" src="@/assets/img/p-female.svg" />
          <img v-else src="@/assets/img/p-male.svg" />
        </div>
        <UploadFile @uploadFilePath="setUploadProfilePath(person, $event)"/>
        <el-input type="text" name="profile_path" v-model="person.profile_path"></el-input>
      </div>
      <div class="form-details-edit">
        <div class="person-name">
          <label for="person-name">Prénom et Nom</label>
          <el-input
            type="text"
            name="person-name"
            id="person-name"
            v-model="person.name"
          ></el-input>
        </div>
        <div class="person-job">
          <label for="person-job">Métier principal</label>
          <el-input
            type="text"
            name="person-job"
            id="person-job"
            v-model="person.known_for_department"
          ></el-input>
        </div>
        <div class="facts">
          <div class="person-birthday">
            <label for="person-birthday">Date de naissance</label>
            <el-date-picker
              format="dd-MM-yyyy"
              value-format="yyyy-MM-dd"
              type="date"
              name="person-birthday"
              id="person-birthday"
              v-model="person.birthday"
            ></el-date-picker>
          </div>
          <div class="person-deathday">
            <label for="person-deathday">Date de décès</label>
            <el-date-picker
              format="dd-MM-yyyy"
              value-format="yyyy-MM-dd"
              type="date"
              name="person-deathday"
              id="person-deathday"
              v-model="person.deathday"
            ></el-date-picker>
          </div>
        </div>
        <div class="place-of-birth">
          <label for="place-of-birth">Lieu de naissance</label>
          <el-input
            type="text"
            name="place-of-birth"
            id="place-of-birth"
            v-model="person.place_of_birth"
          ></el-input>
        </div>
        <div class="person-biography">
          <label for="person-biography">Biographie</label>
          <vue-editor v-model="person.biography" :editorToolbar="customToolbar" />
        </div>
      </div>
    </div>
    <el-button
      type="success"
      icon="el-icon-check"
      @click="savePerson"
      class="save-btn"
    >Enregistrer les modifications
    </el-button>
  </section>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";

export default {
  name: "PersonDetails",
  props: {
    person: Object,
  },
  components: {
    UploadFile
  },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [],
        ["link"],
        [],
        ["clean"],
      ]
    };
  },
  computed: {
    backgroundImage() {
      let backgroundImg = 'url(' +  require("@/assets/img/backdrop_default.jpg") + ')';
      if(this.person.profile_path) {
        backgroundImg = 'url(' +  this.person.profile_path + ')';
      }
      return backgroundImg;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    setUploadProfilePath(person, profilePath) {
      person.profile_path = profilePath
    },
    savePerson() {
      const fullName = this.$store.state.currentPerson.name.trim();
      const index = fullName.lastIndexOf(' ');
      const lastname = fullName.substring(index+1);
      const firstname = fullName.substring(0, index);
      this.$db.collection("persons").doc(this.$parent.id).get()
      .then((doc) => {
        console.log(doc)
          if (doc.exists) {
            this.$db.collection("persons").doc(this.$parent.id).update({ person: this.$store.state.currentPerson, firstname: firstname, lastname: lastname})
            .then(() => {
                console.log("la personnalité a été mise à jour");
                this.$message({
                  type: 'info',
                  message: 'la personnalité a bien été mise à jour'
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la sauvegarde : ", error);
            });
          } else {
            this.$db.collection("persons").doc(this.$parent.id).set({ person: this.$store.state.currentPerson, personCredits: this.$store.state.currentPersonCredits, personImages: this.$store.state.currentPersonImages, firstname: firstname, lastname: lastname })
            .then(() => {
                console.log("la personnalité a été créée");
                this.$message({
                  type: 'info',
                  message: 'la personnalité a bien été créée'
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
  }
}
</script>

<style scoped lang="scss">

  @import '@/styles/bp.scss';  
  @import '@/styles/color.scss';  
  @import '@/styles/shadow.scss';  

  section.person-info {
    background-size: cover;
    background-repeat: no-repeat;   
    background-position: center;
    position: relative;

    .save-btn {
      position: absolute;
      bottom: 2.5em;
      right: 3em;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 4.5em 3em 5em 3em;
      position: relative;
      background: linear-gradient(to right, #0e0e0ede 150px, rgba(2, 2, 0, 0.88) 100%);

      &.is-loading {
        background: url('../../../assets/img/loader-Bars-1s-108px.gif') no-repeat 64%, linear-gradient(to right, #0e0e0ede 150px, rgba(2, 2, 0, 0.88) 100%);
      }

      .poster {
        width: 100%;
        max-width: 310px;
        margin-bottom: 2em;

        &.is-loading {
          .no-picture {
            background: url('../../../assets/img/loader-Spin-1s-81px.gif') no-repeat center, black;
            img {
              display: none;;
            }
          }
        }

        img {
          width: 100%;
          box-shadow: $--box-shadow-dark-3;
        }
        
        .no-picture {
          background-color: $--color-hcf-light-grey;
          background: linear-gradient(0deg, rgba(181,181,181,1) 0%, rgba(181,181,181,1) 15%, rgba(214,212,209,1) 20%, rgba(214,212,209,1) 100%);
          width: 283px;
          height: 424px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: $--box-shadow-dark-3;

          img {
            width: 110%;
            position: relative;
            bottom: -0.9em;
            box-shadow: none;
          }

        }

      }

      .form-details-edit {
        color: #f6e5c8;
        flex-basis: 100%;

        label {
          text-transform: uppercase;
          font-size: 1em;
          font-weight: 800;
          color: #f8f0e0;
          margin-bottom: 0.3em;
        }

        .place-of-birth,
        .person-deathday,
        .person-biography,
        .person-birthday,
        .person-name,
        .person-job {
          display: flex;
          flex-direction: column;
          > div {
            margin-bottom: 0.8em;
          }
        }

        > div {
          margin-bottom: 1em;
        }

        .facts {
          display: flex;
          justify-content: space-between;
        }

      }

    }

  }

  @media (min-width: $--bp-md) { 
    section.person-info {
      .content {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;

        .poster {
          width: 50%;
          margin-right: 3em;
          margin-bottom: 0;
        }

      }
    }
  }

</style>
