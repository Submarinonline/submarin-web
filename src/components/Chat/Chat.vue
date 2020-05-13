<template>
  <v-container fluid style="padding: 0;">
    <popup :text="type" ref="dialog" @GETdata="getdata"></popup>
    <v-bottom-sheet v-model="Panel">
      <v-list>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="clickitem(tile.title)"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <v-icon>mdi-{{tile.icon}}</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-row no-gutters>
    <!--<v-col sm="2" class="scrollable">
        <chats></chats>
      </v-col>-->
      <!--<v-col sm="10" style="position: relative;">-->
        <v-col style="width: 100%; position: relative;">
        <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer" >
          <message :messages="messages" @imageLoad="scrollToEnd"></message>
        </div>
        <div class="typer">
          <input type="text" placeholder="ここに入力..." v-on:keyup.enter="sendMessage" v-model="content">
          <v-btn icon class="blue--text" style=" margin: 5px;font-size: 26px;" @click="togglePanel">
            <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Message from './parts/Message.vue'
  import Chats from './parts/Chats.vue'
  import Gif from './parts/Gif.vue'
  import Popup from './parts/Popup.vue'
  import * as firebase from 'firebase' 
   export default {
    data () {
      return {
        type: String,
        content: '',
        chatMessages: [],
        Panel: false,
        currentRef: {},
        loading: false,
        //dialogstate: store.state,
       // dialogstate: null,
        dialog: false,
        totalChatHeight: 0,
        tiles: [
        { icon: 'gif', title: 'GIF' },
        { icon: 'youtube', title: 'Youtube' },
        { icon: 'image', title: '画像' },
      ],
      }
    },
    props: [
      'id'
    ],
    mounted () {
      this.loadChat()
      this.$store.dispatch('loadOnlineUsers')
    },
    components: {
      'message': Message,
      'chats': Chats,
      'GIF': Gif,
      'popup': Popup,      
    },
    computed: {
      messages () {
        return this.chatMessages
      },
      username () {
        console.log(this.$store.getters.user.Name)
        return this.$store.getters.user.Name
      },
      icon(){
        return this.$store.getters.user.icon
      },
      onNewMessageAdded () {
        const that = this
        let onNewMessageAdded = function (snapshot, newMessage = true) {
          let message = snapshot.val()
          message.key = snapshot.key
          /*eslint-disable */
          var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
          /*eslint-enable */
          message.content = message.content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
          message.content = message.content.replace(urlPattern, "<a href='$1'>$1</a>")
          console.log(message)
          if (!newMessage) {
            that.chatMessages.unshift(that.processMessage(message))
            that.scrollTo()
          } else {
            that.chatMessages.push(that.processMessage(message))
            that.scrollToEnd()
          }
        }
        return onNewMessageAdded
      }
    },
    watch: {
      '$route.params.id' (newId, oldId) {
        this.currentRef.off('child_added', this.onNewMessageAdded)
        this.loadChat()
      }
    },
    methods: {
      clickitem(title){
        if(title == 'GIF'){
          this.type = 'GIF';
        this.$refs.dialog.open();
        } else if(title == 'Youtube'){
        this.type = 'Youtube';
        this.$refs.dialog.open();
        }
        this.Panel = false;
      },
      getdata(url){
        console.log(url);
        this.content = url;
        this.sendMessage();
      },
      loadChat () {
        this.totalChatHeight = this.$refs.chatContainer.scrollHeight
        this.loading = false
        if (this.id !== undefined) {
          this.chatMessages = []
          let chatID = this.id
          this.currentRef = firebase.database().ref('messages').child(chatID).child('messages').limitToLast(20)
          this.currentRef.on('child_added', this.onNewMessageAdded)
        }
      },
      onScroll () {
        let scrollValue = this.$refs.chatContainer.scrollTop
        const that = this
        if (scrollValue < 100 && !this.loading) {
          this.totalChatHeight = this.$refs.chatContainer.scrollHeight
          this.loading = true
          let chatID = this.id
          let currentTopMessage = this.chatMessages[0]
          if (currentTopMessage === undefined) {
            this.loading = false
            return
          }
          firebase.database().ref('messages').child(chatID).child('messages').orderByKey().endAt(currentTopMessage.key).limitToLast(20).once('value').then(
            function (snapshot) {
              let tempArray = []
              snapshot.forEach(function (item) {
                tempArray.push(item)
              })
              if (tempArray[0].key === tempArray[1].key) return
              tempArray.reverse()
              tempArray.forEach(function (child) { that.onNewMessageAdded(child, false) })
              that.loading = false
            }
          )
        }
      },
      processMessage (message) {
        var imageRegex = /([^\s\']+).(?:jpg|jpeg|gif|png)/i
        if (imageRegex.test(message.content)) {
          message.image = imageRegex.exec(message.content)[0]
        }
        if (message.content.match(/youtu.be/)) {
          message.youtube =message.content;
          console.log('chat.vue yt');
          console.log(message.youtube);
        }
        var emojiRegex = /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{2934}-\u{1f18e}])/gu
        if (emojiRegex.test(message.content)) {
          message.content = message.content.replace(emojiRegex, '<span class="emoji">$1</span>')
        }
        return message
      },
      sendMessage () {
        if (this.content !== '') {
          this.$store.dispatch('sendMessage', { username: this.username, content: this.content, date: new Date().toString(), chatID: this.id,icon:this.icon })
          this.content = ''
        }
      },
      scrollToEnd () {
        this.$nextTick(() => {
          var container = this.$el.querySelector('.chat-container')
          container.scrollTop = container.scrollHeight
        })
      },
      scrollTo () {
        this.$nextTick(() => {
          let currentHeight = this.$refs.chatContainer.scrollHeight
          let difference = currentHeight - this.totalChatHeight
          var container = this.$el.querySelector('.chat-container')
          container.scrollTop = difference
        })
      },
      addEmojiToMessage (emoji) {
        this.content += emoji.value
      },
      togglePanel () {
        this.Panel = !this.Panel
      }
    }
  }
</script>

<style>
  .scrollable {
    overflow-y: auto;
    height: 90vh;
  }
  .typer{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
  }
  .typer input[type=text]{
    position: absolute;
    left: 2.5rem;
    padding: 1rem;
    width: 80%;
    height: 1.2rem;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.25rem;
  }
  .chat-container{
    box-sizing: border-box;
    height: calc(100vh - 6.8rem);
    overflow-y: auto;
    padding: 10px;
    background-color: #f2f2f2;
  }
  .message{
    margin-bottom: 3px;
  }
  .message.own{
    text-align: right;
  }
  .message.own .content{
    background-color: lightskyblue;
  }
  .chat-container .username{
    font-size: 18px;
    font-weight: bold;
  }
  a {
    color : #fff;
  }
  .usericon{
    display:inline-block;
    margin-right: 10px;
  }
  .chat-container .content{
    padding: 0px 8px;
    background-color:  #387EF6;
    border-radius: 0px 10px 10px 5px;
    display:inline-block;
    color: #fff;
    max-width: 50%;
    word-wrap: break-word;
    }
  @media (max-width: 480px) {
    .chat-container .content{
      max-width: 60%;
    }
  }

</style>
