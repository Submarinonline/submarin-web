<template>
  <v-container style="padding-top: 0px;" v-on:scroll="onScroll" ref="chatlistContainer">
     <div class="text-end">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          text
          style="min-height: 60px;"
          v-on="on"
          color="blue"
        >
        <v-icon>mdi-plus</v-icon>
          新規チャンネルを作成
        </v-btn>
      </template>

      <v-card>
      <create></create>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
          　キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-card style="min-width: 90%; left: 0; right: 0; margin: auto;">
<v-card-title class="headline">オープンチャット</v-card-title>
<v-card-subtitle></v-card-subtitle>
<v-card-actions>
<v-btn @click="enterChat({key:'-M68awMntZzgXQ8fhy4x',name: 'Chat',userCount: 0})" block style="color: #fff;" color="#4c8bf5" depressed>参加する</v-btn>
</v-card-actions>
  </v-card>
    <v-row no-gutters style="margin-top: 5px;">
  <v-col cols="12" sm="4" v-if="!this.chats">
    <v-skeleton-loader
      max-width="300"
      type="card"
    ></v-skeleton-loader>
    <v-skeleton-loader
      max-width="300"
      type="card"
    ></v-skeleton-loader>
    <v-skeleton-loader
      max-width="300"
      type="card"
    ></v-skeleton-loader>
        </v-col>
    </v-row>
    <v-row no-gutters style="margin-top: 5px;">
      <v-col v-for="chat in chats" :key="chat.name" v-show="chat.key !== '-M68awMntZzgXQ8fhy4x'" cols="12" sm="4">
        <v-card max-width="300" style="margin: 5px;">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{chat.name}}</v-list-item-title>
              <v-list-item-subtitle v-if="chat.userCount != null"><v-icon>mdi-account-multiple</v-icon>{{chat.userCount}} </v-list-item-subtitle>
              <v-list-item-subtitle v-else>ユーザー数を読み込み中...</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn text @click="enterChat(chat)" v-if="!chat.isAlreadyJoined && chat.userCount != null">参加する</v-btn>
            <v-btn text disabled v-if="chat.isAlreadyJoined">Joined</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as firebase from 'firebase'
import Create from './Create';
export default {
  components:{
    'create':Create
  },
  data () {
    return {
      loadedChats: [],
      loading: false,
      dialog: false
    }
  },
  mounted () {
    this.loadRecentChats()
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    chats () {
      return this.loadedChats
    }
  },
  methods: {
    loadRecentChats (lastKey) {
      let that = this
      firebase.database().ref('chats').orderByKey().limitToLast(20).once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let chat = childSnapshot.val()
          chat.key = childSnapshot.key
          that.getUserCountForChat(chat)
          that.loadedChats.unshift(chat)
        })
      })
    },
    loadRecentChatsByLastKey (lastKey) {
      let that = this
      that.loading = true
      firebase.database().ref('chats').orderByKey().endAt(lastKey).limitToLast(20).once("value", function(snapshot) {
        let tempArray = []
        snapshot.forEach(function (item) {
          if(item.key != lastKey) {
            let newChat = item.val()
            newChat.key = item.key
            tempArray.push(newChat)
          }
        })
        if (tempArray[0].key === tempArray[1].key) return
        tempArray.reverse()
        tempArray.forEach(function (child) {
          that.getUserCountForChat(child)
          that.loadedChats.push(child)
        })
        that.loading = false
      })
    },
    enterChat (chat) {
      console.log(chat);
      if(chat.isAlreadyJoined || chat.userCount == null) {
        return
      }
      let chatId = chat.key
      let time = new Date().valueOf()

      let updates = {}
      updates['/chat_members/' + chatId + '/users/' + this.user.id] = {timestamp: time}
      updates['users/' + this.user.id + '/chats/' + chatId] = {timestamp: time}

      let that = this
      firebase.database().ref().update(updates).then(() => {
        this.$router.push('/chat/' + chatId)
      })
    },
    onScroll() {
      if(window.top.scrollY + window.innerHeight >= document.body.scrollHeight - 100 && !this.loading) {
        this.loadRecentChatsByLastKey(this.loadedChats[this.loadedChats.length - 1].key)
      }
    },
    getUserCountForChat(chat) {
      let that = this
      firebase.database().ref('chat_members').child(chat.key).child("users").once("value", function(snapshot) {
        that.$set(chat, "userCount", snapshot.numChildren())
        snapshot.forEach((user) => {
          if(user.key == that.user.id) {
            that.$set(chat, "isAlreadyJoined", true)
          }
        })
      })
    }
  },
  created () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  watch: {
    loadedChats: {
      deep: true,
      handler() {
      }
    }
  }
}
</script>