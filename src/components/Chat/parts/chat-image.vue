<template>
<div class="image">
    <img :src="this.imgSrc">
</div>
</template>

<script>
  export default {
    props: [
      'src'
    ],
    data () {
      return {
        imgSrc: 'https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif'
      }
    },
    mounted () {
      this.imgSrc = this.src
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
