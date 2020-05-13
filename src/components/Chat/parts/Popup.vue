<template>
    <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialog" scrollable>
      <v-card>
      <v-toolbar style="position: relative; max-height: 60px;" dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{text}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      <div v-if="text === 'GIF'">
     <GIF @getdata="GETGIF"></GIF>
      </div>
      <div v-if="text === 'Youtube'">
     <YT @getdata="GETYT"></YT>
      </div>
      </v-card>
    </v-dialog>
</template>

<script>
import Gif from './Gif.vue'
import Youtube from './Youtube.vue'
export default {
data(){
    return{
        dialog: false,
        url: false

    }
},
components: {
      'GIF': Gif,
      'YT': Youtube,  
    },
props:["text"],
computed: {

},
methods:{
   open() {
      this.dialog = true;
      console.log('dialogstate:',this.dialogstate);
    },
    close() {
      this.dialog = false;
      dialogstate: store.state;
    },
    GETGIF(url){
      console.log('GETGIF');
      console.log(url);
      this.$emit('GETdata', url);
      this.dialog = false;
},
    GETYT(url){
      console.log(url);
      this.$emit('GETdata', url);
      this.dialog = false;
}
}
}
</script>

<style>

</style>