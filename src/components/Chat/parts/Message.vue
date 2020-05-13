<template>
  <div>
    <div class="message" v-for="(message,index) in messages" v-bind:key="index" :class="{own: message.user == username}">
    <v-avatar v-if="index>0 && messages[index-1].user != message.user" class="usericon">
      <img :src="message.icon" :alt="message.user">
    </v-avatar>
    <v-avatar v-if="index == 0" class="usericon">
      <img :src="message.icon" :alt="message.user">
    </v-avatar>
      <div style="display:inline-block; vertical-align: middle;" class="username" v-if="index>0 && messages[index-1].user != message.user">{{message.user}}</div>
      <div style="display:inline-block; vertical-align: middle;" class="username" v-if="index == 0">{{message.user}}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <p style="margin: 0px; padding: 0px;color: #fff;" v-if="!message.image && !message.youtube" v-html="message.content"></p>
        <chat-youtube style="margin-top: 0.3em" v-if="message.youtube" :src="message.youtube" @imageLoad="imageLoad"></chat-youtube>
        <chat-image style="margin-top: 0.3em" v-if="message.image" :src="message.image" @imageLoad="imageLoad"></chat-image>
      </div>
    </div>
  </div>
</template>

<script>
  import Chat_image from './chat-image.vue'
  import Chat_youtube from './chat-youtube.vue'
  export default {
    data () {
      return {}
    },
    props: [
      'messages'
    ],
    components: {
      'chat-image': Chat_image,
      'chat-youtube': Chat_youtube
    },
    computed: {
      username () {
        return this.$store.getters.user.username
      }
    },
    methods: {
      imageLoad () {
        // this.$emit('imageLoad')
      }
    }
  }
</script>

<style>
  span.emoji {
    font-size: 20px;
    vertical-align: middle;
    line-height: 2;
  }
</style>
