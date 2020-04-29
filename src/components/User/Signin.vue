<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-btn block color="#1DA1F2" outlined style="margin-bottom: 2px;" @click="Twitter"><v-icon color="#1DA1F2">mdi-twitter</v-icon>でログイン</v-btn>
               <v-btn block color="#DB4437" outlined style="margin-bottom: 2px;"><v-icon color="#DB4437">mdi-google</v-icon>でログイン</v-btn>
                <v-btn block outlined style="margin-bottom: 2px;"><v-icon >mdi-phone</v-icon>でログイン</v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import router from "vue-router";
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
       Twitter: function() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          result => {
            var token = result.credential.token;
            var secret = result.credential.secret;
            var user = result.user;
            if (user) {
              console.log(user);
              this.$store.commit("setUserTW", user)// currentUserをstore.
              this.$router.push('/discover').catch((err) => {
        throw new Error(`Problem handling something: ${err}.`);
    });
            } else {
              alert("有効なアカウントではありません");
            }
          },
          err => {
            alert(err.message);
          }
        );
    }
    }
  }
</script>
