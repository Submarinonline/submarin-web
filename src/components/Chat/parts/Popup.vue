<template>
    <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialog" scrollable>
      <v-card>
      <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>GIF</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      <div v-if="text === 'GIF'">
     <GIF></GIF>
      </div>
      </v-card>
    </v-dialog>
</template>

<script>
import Gif from './Gif.vue'
export default {
data(){
    return{
        dialog: false
    }
},
components: {
      'GIF': Gif,  
    },
props:["text"],
computed: {

},methods:{
   open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
}
}
</script>

<style>

</style>