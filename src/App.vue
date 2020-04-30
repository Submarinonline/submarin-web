<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');
::selection{background-color: salmon; color: white;}
.parallax > use{
animation:move-forever 12s linear infinite;
/*&:nth-child(1){animation-delay:-2s;}
&:nth-child(2){animation-delay:-2s; animation-duration:5s}
&:nth-child(3){animation-delay:-4s; animation-duration:3s}*/
}
@keyframes move-forever{
0%{transform: translate(-90px , 0%)}
100%{transform: translate(85px , 0%)} 
}
</style>
<template>
  <v-app>
    <v-navigation-drawer color="#fff" absolute temporary v-model="drawerToggle">
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            オンラインのユーザー {{onlineUsers[0]}}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list >
        <v-list-item avatar v-for="user in onlineUsers[1]" v-bind:key="user.userinfo.Name">
          <v-list-item-avatar>
            <img :src="user.userinfo.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.userinfo.Name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
       <svg style="position: absolute; width: 100%; z-index: 1;height:56px;" class="editorial"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none">
<defs>
<path id="gentle-wave"
d="M-160 44c30 0 
   58-18 88-18s
   58 18 88 18 
   58-18 88-18 
   58 18 88 18
   v44h-352z" />
 </defs>
 <g class="parallax">
  <use xlink:href="#gentle-wave" x="50" y="0" fill="#95cced"/>
  <use xlink:href="#gentle-wave" x="50" y="3" fill="#51b2ed"/>
  <use xlink:href="#gentle-wave" x="50" y="6" fill="#41ADEF"/>  
 </g>
</svg>
    <v-app-bar short flat app style="z-index: 2; background: transparent;">
      <v-app-bar-nav-icon color="#606060" @click.native.stop="drawerToggle = !drawerToggle"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/chat/0" tag="span" style="cursor: pointer"><v-img height="40" width="40" src="@/assets/512.png"></v-img></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import VueHead from 'vue-head'
  export default {
    data () {
      return {
        drawerToggle: false
      }
    },
    head:{
      link: [
        {rel: 'stylesheet',href:'https://fonts.googleapis.com/css?family=Comfortaa'}
      ]
    },
    computed: {
      menuItems () {
        let items = [
          { icon: 'mdi-face', title: '登録', route: '/register' },
          { icon: 'mdi-lock-open', title: 'ログイン', route: '/login' }
        ]
        if (this.userIsAuthenticated) {
          items = [
            {icon: 'mdi-forum', title: 'Create a Chat', route: '/create'},
            {icon: "mdi-chat", title: 'Chat List', route: '/discover'}
          ]
        }
        return items
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      onlineUsers () {
        return this.$store.getters.onlineUsers
      }
    }
  }
</script>