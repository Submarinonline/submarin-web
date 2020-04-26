import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import AlertComponent from './components/Shared/Alert.vue'

Vue.config.productionTip = false
Vue.component('app-alert', AlertComponent)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDP4XqmXTZixszR96PcS1alvijTU2U2xZs",
      authDomain: "submarin-web.firebaseapp.com",
      databaseURL: "https://submarin-web.firebaseio.com",
      projectId: "submarin-web",
      storageBucket: "submarin-web.appspot.com",
      messagingSenderId: "1080856965224",
      appId: "1:1080856965224:web:3a55046f12d554f7eb0bdd",
      measurementId: "G-CNMYGBEF91"
    })
  }
}).$mount('#app')
