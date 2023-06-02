<template>
  <section id="login-user">
    <div class="title">
      <div>
        <h1>Identification</h1>
        <p>
          Cher visiteur, pour garantir la sécurité des données et réduire les coûts d'hébergement du site, 
          l'accès aux pages du site sur le cinéma français d'autrefois nécessite désormais une identification.</p>
         <p>Veuillez créer un compte pour profiter du contenu et maintenir l'intégrité de notre communauté cinéphile.
        <br>Vous n'avez à le faire qu'une seule fois, car nous nous souviendrons de vous lors de vos prochaines visites.</p>
        <p>Merci pour votre compréhension.</p>
        <p>Clément</p>
        <div>
            <h2>Inscription</h2>
            <div class="erreur" v-if="error.register">{{error.register}}</div>
            <form @submit.prevent="register">
              <el-input placeholder="Identifiant" v-model="formRegister.email"></el-input>
              <el-input placeholder="Mot de passe" v-model="formRegister.password" show-password></el-input>
              <el-input placeholder="Confirmer le mot de passe" v-model="formRegister.confirmPassword" show-password></el-input>
              <el-button type="primary" native-type="submit">S'inscrire</el-button>
            </form>
        </div>
        <div>
            <h2>Vous avez déjà un compte ?</h2>
            <div class="erreur" v-if="error.login">{{error.login}}</div>
            <form @submit.prevent="login">
              <el-input placeholder="Identifiant" v-model="formLogin.email"></el-input>
              <el-input placeholder="Mot de passe" v-model="formLogin.password" show-password></el-input>
              <el-button type="primary" native-type="submit">Se connecter</el-button>
              <!-- <el-button type="primary" native-type="button" @click.prevent="logout" plain >Se déconnecter</el-button> -->
            </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: ""
      },
      formRegister: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      error: {
        login : null,
        register: null
      } 
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formLogin.email, this.formLogin.password)
        .then()
        .catch(err => {
          this.error.login = err.message;
        });
    },
    register() {
      if (this.formRegister.password !== this.formRegister.confirmPassword) {
        this.error.register = "Les mots de passe ne correspondent pas.";
        return false;
      }

      firebase.auth().createUserWithEmailAndPassword(this.formRegister.email, this.formRegister.password)
        .then(() => {
          // L'inscription est réussie, vous pouvez effectuer des actions supplémentaires ou rediriger l'utilisateur
        })
        .catch(err => {
          this.error.register = err.message;
        });
      }
    ,
    logout() {
      firebase
        .auth()
        .signOut()
        .catch(err => {
          this.error.login = err.message;
        });
    }
  },
  name: "LoginUser"
};
</script>

<style scoped lang="scss">
@import "@/styles/color.scss";

#login-user {
  padding: 1em 0 1em 0;
    
  .title {
    padding: 1.5em;
    position: relative;
    text-align: center;
    z-index: 2;
    background: url("../assets/img/box-border-patern.png") repeat 0 0
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
        width: 90%;
        margin: auto;
        margin-bottom: 1.7rem;
        max-width: 25rem;

        p {
          line-height: 1.2;
          font-size: 0.9rem;
        }

        .erreur
        {
          color: #a51f1e;
          font-size: 0.8rem;
          margin: 0.5rem 0;
          margin-bottom: 0.2rem;
        }

        > div 
        {
          max-width: 20rem;
          margin: auto;
          margin-top: 2.9rem;
          padding: 1.7rem 0;
          padding-bottom: 0;
          border-top: 1px dotted #baa88c;

          &:last-child {
            margin-bottom: 3.1rem;
          }
        }

        h1, h2 {
            font-family: "Righteous";
            color: $--color-hcf-ddark-brown;
            font-size: 1.6em;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            line-height: 1.2;
            margin: 0.8em 1em .5em 1em;
            letter-spacing: 0.05rem;
        }

        h2 {
          font-size: 1.4em;
          color: $--color-hcf-red;
          text-shadow: 3px 3px 0 rgba(216, 188, 188, 0.2)
        }

        .el-input, .el-button {
            margin: 0.5em 0;
            width: 100%;
        }
    }
  }
}
</style>