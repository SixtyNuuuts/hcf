<template>
  <section id="login-admin">
    <div class="title">
      <div>
        <h1>Espace Édition</h1>
        <div v-if="error">{{error}}</div>
        <form action="#" @submit.prevent="submit">
          <el-input placeholder="Identifiant" v-model="form.email"></el-input>
          <el-input placeholder="Mot de passe" v-model="form.password" show-password></el-input>
          <el-button type="primary" native-type="submit">Se connecter</el-button>
          <!-- <el-button type="primary" native-type="button" @click.prevent="logout" plain >Se déconnecter</el-button> -->
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then()
        .catch(err => {
          this.error = err.message;
        });
    },
    // logout() {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .catch(err => {
    //       this.error = err.message;
    //     });
    // }
  },
  name: "LoginAdmin"
};
</script>

<style scoped lang="scss">
@import "@/styles/color.scss";

#login-admin {
  padding: 3em 1.45em 0 1.5em;

  .title {
    margin: 0 0 2em;
    padding: 1.5em;
    position: relative;
    text-align: center;
    z-index: 2;
    background: url("../../assets/img/box-border-patern.png") repeat 0 0
      $--color-hcf-beige;

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
    > div {
        width: 80%;
        margin: auto;
        margin-bottom: 1.7rem;
        max-width: 20rem;

        h1 {
            font-family: "Righteous";
            color: $--color-hcf-ddark-brown;
            font-size: 1.9em;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            line-height: 1.2;
            margin: 0.8em 1em .5em 1em;
            letter-spacing: 0.05rem;
        }

        .el-input, .el-button {
            margin: 0.5em 0;
            width: 100%;
        }
    }
  }
}
</style>