// user.js
import { auth, db } from '@/includes/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, deleteDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    userObj: null,
    UserType: null,
    isMounted: false,
    notifications: []
  }),

  actions: {
    async createUser(values) {
      try {
        // Create user with email and password
        const usercred = await createUserWithEmailAndPassword(auth, values.email, values.password)

        // Create user document in Firestore
        const userDocRef = doc(db, 'admin', usercred.user.uid)
        await setDoc(userDocRef, {
          name: values.name,
          age: values.age,
          country: values.country,
          email: values.email,
          createdAt: new Date(),
          Role: 'admin'
        })

        // Update user profile display name
        await updateProfile(usercred.user, {
          displayName: values.name
        })
        // console.log('user cred')

        this.userLoggedIn = true
        // Verify user is logged in
        // Verify user is logged in
      } catch (error) {
        // Handle any errors
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
      }
    },

    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      this.userLoggedIn = true
    },
    setUser(user) {
      this.userObj = user
    },
    async logout() {
      await signOut(auth)
      this.setUser(null)
      this.notifications = []
    },
    async deleteNotification(docRef) {
      await deleteDoc(doc(db, 'notifications', docRef))
    }
  },
  getters: {
    interface(state) {
      return state.UserType == 'admin' ? true : false
    }
  }
})
