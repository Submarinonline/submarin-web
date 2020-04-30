<template>
  <v-container>
    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template>
      </template>
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
        エラーが発生しました。アカウントが無効になっていないか確認し、再度お試しください。
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>

              <v-btn :loading="loader" block color="#fff" style="position: relative; left:0; right: 0; bottom: 0; margin: auto;margin-bottom: 2px; color: #1DA1F2; min-height: 50px; width: 80%;" @click="Twitter"><v-icon color="#1DA1F2">mdi-twitter</v-icon>でログイン</v-btn>
              <b style="font-weight: 100; color: #fff;">または</b>
               <v-btn block color="#28292b" style="position: relative; left:0; right: 0; bottom: 0; margin: auto;margin-bottom: 2px; color: #fff; min-height: 50px; width: 80%;" href="https://play.google.com/store/apps/details?id=com.shenyusoftware.submarin"><v-icon color="#fff">mdi-google-play</v-icon>からダウンロード</v-btn>
               <!--<v-btn block color="#DB4437" outlined style="margin-bottom: 2px;"><v-icon color="#DB4437">mdi-google</v-icon>でログイン</v-btn>
                <v-btn block outlined style="margin-bottom: 2px;"><v-icon >mdi-phone</v-icon>でログイン</v-btn>-->
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
        password: '',
        loader: false,
        dialog: false
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
         this.loader = true;
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          result => {
            var token;
            var secret;
            var user;
            try{
            token = result.credential.token;
            secret = result.credential.secret;
            user = result.user;
            } catch {
              this.dialog = true;
              this.loader = false;
            }
            if (user) {
              console.log(user);
              this.$store.commit("setUserTW", user)// currentUserをstore.
              this.$router.push('/discover').catch((err) => {
              this.loader = false;
              throw new Error(`Problem handling something: ${err}.`);
              this.dialog = true;
    });
            } else {
              this.dialog = true;
              this.loader = false;
            }
          },
          err => {
            this.dialog = true;
            this.loader = false;
            alert(err.message);
          }
        );
    }
    }
  }
</script>
