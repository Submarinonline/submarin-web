import * as firebase from 'firebase'

const AuthModule = {
  state: {
    user: null
  },
  mutations: {
    setUserTW(state,user) { // commitされるとmutationsのsetUserが実行される
      const userListRef = firebase.database().ref('presence')
      const myUserRef = userListRef.push()
      let Setobj = {
        'Name': user["displayName"],
        'icon': user["photoURL"],
        'mail': user["email"],
        'uid':user["uid"]
      }
      state.user = Setobj
      firebase.database().ref('.info/connected')
        .on(
          'value', function (snap) {
            if (snap.val()) {
              // if we lose network then remove this user from the list
              myUserRef.onDisconnect()
                .remove()
              // set user's online status
              let presenceObject = { userinfo:Setobj, status: 'online' }
              console.log(presenceObject);
              myUserRef.set(presenceObject)
            } else {
              // client has lost network
              let presenceObject = { userinfo: Setobj, status: 'offline' }
              console.log(presenceObject);
              myUserRef.set(presenceObject)
            }
          }
        )
    }
  },
  actions: {
  
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}

export default AuthModule
