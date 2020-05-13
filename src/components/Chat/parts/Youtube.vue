<template>
<v-container>
      <v-text-field
        append-icon="mdi-magnify"
        single-line
        color="red"
        @keydown.enter="ytsearch"
        v-model="search"
      ></v-text-field>
      <div style="position: relative;text-align: center;height: 100%;" v-if="!this.data">
          <v-icon style="font-size: 140px;">mdi-magnify</v-icon>
          <p style="color:#606060">Youtubeを検索...</p>
      </div>
<v-row>
    <v-col v-for="ld in data" v-bind:key="ld.etag" @click="clickitem(ld.id.videoId)" style="border-radius: 10px;">
        <v-img
              style="border-radius: 10px;"
              :src="ld.snippet.thumbnails.medium.url"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title v-text="ld.snippet.title"></v-card-title>
            </v-img>
    </v-col>
</v-row>
</v-container>
</template>
<script>
import axios from 'axios';
export default {
data(){
    return{
      search: null,
      data: null
    }
},
components: {},
props:["text"],
computed: {

},
methods:{
    ytsearch(){
        console.log(this.search);
         axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&safeSearch=none&key=AIzaSyDP4XqmXTZixszR96PcS1alvijTU2U2xZs&maxResults=25&q=${this.search}`)
      .then(response => (
          console.log(response),
          this.data = response["data"]["items"]
        ))
    },
    clickitem(id){
      console.log(id);
      this.$emit('getdata', (`youtu.be/${id}`));
      }
}
}
</script>