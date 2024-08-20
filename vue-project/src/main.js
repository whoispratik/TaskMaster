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
import SmartTable from 'vuejs-smart-table'

import { listenForTaskChanges, listenForEmployeeChanges } from './includes/notifications'
const app = createApp(App)
//plugin registration
app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
app.use(SmartTable)
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
      
    } else {
      // docSnap.data() will be undefined in this case
      
    }
  } catch (error) {
    console.log(error)
  }
  userStore.setUser(user)
  if (user) {
    userStore.userLoggedIn = true
    
    if (!userStore.isMounted) {
      app.mount('#app')

      listenForTaskChanges()
      listenForEmployeeChanges()
      empStore.userInfoFetch(userStore.userObj.uid)
    }
    userStore.isMounted = true
  } else {
    userStore.userLoggedIn = false
    
    if (!userStore.isMounted) app.mount('#app')
    userStore.isMounted = true
  }
})
