<template>
<div style="text-align: center; position: fixed; background-color: #4BADEF; height: 100%; width: 100%;">
    <img src="@/assets/submarin.png" style="text-align: center; width: 60%;">
    <div style="color: #fff; margin-top: 0px; font-weight: bold; font-size: 20px; font-family: Comfortaa;">By Hisubway</div>
    <div style="color: #fff; font-weight: bold; margin-bottom: 10px;"><v-icon color="white">mdi-package-variant</v-icon>10.0</div>
<v-tabs
  centered
     style="text-align: center; width: 80%; left: 0; right: 0; margin: auto; border-radius: 10px 10px 0px 0px;"
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
</v-tabs>
</div>
</template>

<script>
  import Signup from './User/Signup'
  import Signin from './User/Signin'
  export default {
      data(){
          return {
            
        }
      },
    components: {
      'signup': Signup,
      'signin':Signin
    }
  }
</script>