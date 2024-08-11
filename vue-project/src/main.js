import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import { useUserStore } from '@/stores/user'
import { useempStore } from './stores/emp'
import { auth, db } from '@/includes/firebase'
import { onAuthStateChanged } from 'firebase/auth'
//import { useempStore } from './stores/emp'
import { doc, getDoc } from 'firebase/firestore'

import { listenForTaskChanges, listenForEmployeeChanges } from './includes/notifications'
const app = createApp(App)
//plugin registration
app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
const userStore = useUserStore()
const empStore = useempStore()
//const empStore = useempStore()
//the event handler is excecuted upon explicit sign in ,signout,page reload etc
onAuthStateChanged(auth, async (user) => {
  /*
  if (localStorage.getItem('empRegistered')) {
    userStore.userObj = localStorage.getItem('userObj')
    return
  }
    */
  try {
    // i think i will only check if the user is admin and check against userType=="admin"
    const docRef = doc(db, 'admin', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      userStore.UserType = docSnap.data().Role
      console.log('Document data:', docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  } catch (error) {
    console.log(error)
  }
  userStore.setUser(user)
  if (user) {
    userStore.userLoggedIn = true
    console.log('User is logged in:', user)
    if (!userStore.isMounted) {
      app.mount('#app')

      listenForTaskChanges()
      listenForEmployeeChanges()
      empStore.userInfoFetch(userStore.userObj.uid)
    }
    userStore.isMounted = true
  } else {
    userStore.userLoggedIn = false
    console.log('No user is logged in')
    if (!userStore.isMounted) app.mount('#app')
    userStore.isMounted = true
  }
})
