<template v-slot:activator="{ on }">
<div style="text-align: center; position: fixed; background-color: #4BADEF; height: 100%; width: 100%;">
  <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline lighten-2"
          primary-title
        >
        Submarinとは
        </v-card-title>

        <v-card-text>
         Submarinは不特定多数とのコミニケーションに特化したチャットアプリケーションです。オープンチャットや各チャンネルに参加しているユーザーとのコミニケーションを楽しめます。Twitterでログインするだけで使用できるので、面倒な登録は必要ありません。
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
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
    <img src="@/assets/submarin.png" style="text-align: center; width: 60%; max-width: 500px; box-shadow:none;">
    <div style="color: #fff; margin-top: 0px; font-weight: bold; font-size: 20px; font-family: Comfortaa;">By HiSubway</div>
    <div style="color: #fff; font-weight: bold; margin-bottom: 0px;"><v-icon color="white">mdi-package-variant</v-icon>10.0</div>
<v-btn text @click="dialog = true" v-on="on" style="text-transform: none; display: inline-block; color: #fff; vertical-align: middle;"><v-icon color="#fff" style="display: inline-block;">mdi-help-circle-outline</v-icon> <p style="margin-bottom: 0px; display: inline-block; color: #fff; vertical-align: middle;">Submarinとは</p></v-btn>

<!--<v-tabs
  centered
     style="text-align: center; width: 80%; left: 0; right: 0; margin:auto; border-radius: 10px 10px 0px 0px;"
      icons-and-text
>
<v-tab ripple>
    <v-icon>mdi-account</v-icon>
          ログイン
  </v-tab>
  <v-tab ripple>
   <v-icon>mdi-account-plus</v-icon>
          登録
  </v-tab>
  <v-tab-item>
    <v-card flat>
      <signin></signin>
    </v-card>
  </v-tab-item>
  <v-tab-item>
    <v-card flat>
       <signup></signup>
    </v-card>
  </v-tab-item>  
</v-tabs>-->
<div style="position: absolute; bottom: 10%; width: 80%; left: 0; right: 0; margin: auto;">
    <signin></signin>
</div>
</div>
</template>

<script>
  //import Signup from './User/Signup'
  import Signin from './User/Signin'
  export default {
      data(){
          return {
      dialog: false
        }
      },
    components: {
    //  'signup': Signup,
      'signin':Signin
    }
  }
</script>