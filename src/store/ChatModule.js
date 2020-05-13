import * as firebase from 'firebase'
const socket = "wss://aws1.xn--d-8o2b.com"
const ws = new WebSocket(socket);
const ChatModule = {
  state: {
    chats: {}
  },
  mutations: {
    setChats (state, payload) {
      payload["0"] = {name: "Default"}
      state.chats = payload
    }
  },
  actions: {
    sendMessage (context, payload) {
      let chatID = payload.chatID
      const message = {
        user: payload.username,
        content: payload.content,
        date: payload.date,
        icon: payload.icon
      }
      let WebSocketmessage = {
        type: "msg",
        user: payload.username,
        body: payload.content,
      };
      if (ws.readyState === 1) {
        ws.send(JSON.stringify(WebSocketmessage));
      } else {
        console.log(ws.readyState);
        console.log('WebSocketに接続を試行中か接続されていません');
      }
      firebase.database().ref('messages').child(chatID).child('messages').push(message)
        .then(
          (data) => {
          }
        )
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    loadUserChats (context) {
      let user = context.getters.user
      firebase.database().ref('users').child(user.id).child('chats').orderByChild("timestamp").once("value", function(snapshot) {
        let chats = snapshot.val()
        if(chats == null) {
          chats = {}
        }

        for(let chatId in chats) {
          chats[chatId].name = "Loading..."
          firebase.database().ref('chats').child(chatId).once('value', function (snapshot) {
            chats[chatId].name = snapshot.val().name
            context.commit('setChats', chats)
          })
        }
      })
    }
  },
  getters: {
    chats (state) {
      return state.chats
    }
  }
}

export default ChatModule
