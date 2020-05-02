<template>
<v-container>
        <v-row
          class="grey lighten-5"
        >
        <v-col style="max-width: 300px; min-height: 80px;" v-for="tags in top" v-bind:key="tags.name">
        <v-card @click="openlist(tags.path)">
            <v-img
              :src="tags.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title v-text="tags.name"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
</v-row>
        <v-row
          class="grey lighten-5"
        >
        <v-col style="max-width: 300px; min-height: 80px;" v-for="img in list" v-bind:key="img.media[0].gif.url">
        <v-card>
            <v-img :src="img.media[0].gif.url">
            </v-img>
          </v-card>
        </v-col>
</v-row>
</v-container>
</template>
<script>
import axios from 'axios';
 export default {
  data () {
    return {
      top: null,
      list: null
    }
  },
  mounted () {
    axios.get('https://api.tenor.com/v1/categories?key=M133D29NLBX0&locale=ja')
      .then(response => (
          this.top = response["data"]["tags"],
          console.log(this.top),
          console.log(this.top["locale"])
          
        ))
  },
  methods:{
      openlist(url){
          console.log(url);
          this.top = null;
        axios.get(url)
      .then(response => (
          this.list = response["data"]["results"],
          console.log(response["data"]["results"][0]["media"][0]["gif"]["url"])
          
        ))
      }
  }
}
</script>