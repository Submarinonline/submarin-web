<template>
  <div class="image">
    <youtube style="
  width: 100%;
  height: 100%;
  max-height: 400px;
  border-radius: 10px;
  max-width: 650px;" :video-id="videoId" />
<a :href="src" style="color: #fff; text-decoration: none;"><v-icon color="white">mdi-link</v-icon></a>
  </div>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
  export default {
    props: [
      'src'
    ],
    data () {
      return {
        imgSrc: 'https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif',
        videoId: null
      }
    },
    mounted () {
     this.videoId = this.src.replace('youtu.be/','')
    }
  }
</script>

<style>
  .image{
    border-radius: 10px;
    background-color: transparent;
   /* display: flex;
    justify-content: center;
    align-items: center;
    margin-right: auto;*/
  }
  .message.own .image{
    margin-right: 0;
    margin-left: auto;
  }
  .image img{
     border-radius: 10px;
     max-width: 85%;
  }
  img {
    box-shadow: 0px 0px 34px -7px rgba(0,0,0,0.75);
  }
   @media (max-width: 480px) {
    img .image{
      max-width: 95%;
    }
  }/*
  @media (max-width: 480px) {
    .image{
      width: 120px;
    }
    .image img{
      width: 90px;
    }
  }*/
</style>
