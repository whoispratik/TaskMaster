// user.js
import { auth, db, storage } from '@/includes/firebase'
import { secoauth } from '@/includes/firebasedup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
//import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc
} from 'firebase/firestore'
import { sendNotification } from '@/includes/notifications'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export const useempStore = defineStore('emp', {
  state: () => ({
    RenderedEmpArray: [],
    alert_msg: 'it is done',
    RenderedTaskArray: [],
    RenderedReviewArray: [],
    employeInfo: null,
    currentAction: null,
    taskactionmodal: { 'modal-open': false },
    taskSubmitmodal: { 'modal-open': false },
    taskfile: [],
    taskreviewmodal: { 'modal-open': false },
    taskfinalreviewclick: false,
    alertmodal: false,
    submitClicked: false,
    taskRemarks: '',
    acceptrejectdid: null
  }),

  actions: {
    async accept() {
      const docRef = doc(db, 'Task', this.acceptrejectdid)
      const toWho = (await getDoc(docRef)).data().assignto

      await updateDoc(doc(db, 'Task', this.acceptrejectdid), {
        status: 'Completed'
      })
      await setDoc(
        doc(db, 'Task', this.acceptrejectdid),
        {
          Adminremarks: ''
        },
        { merge: true }
      )
      this.taskfile.forEach(async (item) => {
        await deleteDoc(doc(db, 'files', item[0]))
        await deleteObject(ref(storage, `uploads/${item[1].uniqueName}`)).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
        })
      })
      this.taskreviewmodal['modal-open'] = false
      this.taskfinalreviewclick = false
      this.taskRemarks = ''
      this.acceptrejectdid = null
      this.alert_msg = 'Task Approved'
      this.alertmodal = true
      setTimeout(this.alertModalClose, 2000)
      sendNotification(toWho, 'Hey one of your task has been approved ! congrats')
    },
    async reject() {
      const docRef = doc(db, 'Task', this.acceptrejectdid)
      const toWho = (await getDoc(docRef)).data().assignto
      await updateDoc(doc(db, 'Task', this.acceptrejectdid), {
        status: 'Rejected'
      })
      await setDoc(
        doc(db, 'Task', this.acceptrejectdid),
        {
          Adminremarks: ''
        },
        { merge: true }
      )
      this.taskfile.forEach(async (item) => {
        await deleteDoc(doc(db, 'files', item[0]))
        await deleteObject(ref(storage, `uploads/${item[1].uniqueName}`)).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
        })
      })
      this.taskreviewmodal['modal-open'] = false
      this.taskfinalreviewclick = false
      this.taskRemarks = ''
      this.acceptrejectdid = null
      this.alert_msg = 'Task Rejected'
      this.alertmodal = true
      setTimeout(this.alertModalClose, 2000)

      sendNotification(toWho, 'Hey one of your task has been rejected ! submit again please')
    },
    async taskReviewToggle() {
      let UserStore = useUserStore()
      const q = query(
        collection(db, 'Task'),
        where('AdminUid', '==', UserStore.userObj.uid),
        where('status', '==', 'in review')
      )
      const querySnapshot = await getDocs(q)
      this.RenderedReviewArray = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, ' => ', doc.data())
        this.RenderedReviewArray.push([doc.id, doc.data()])
      })
      this.taskreviewmodal['modal-open'] = true
    },
    taskreviewmodalcloser() {
      this.taskreviewmodal['modal-open'] = false
      this.taskfinalreviewclick = false
      this.taskRemarks = ''
      this.acceptrejectdid = null
    },
    async reviewhandler(dId) {
      const docRef = doc(db, 'Task', dId)
      const docSnap = await getDoc(docRef)
      this.taskRemarks = docSnap.data().remarks

      const q = query(collection(db, 'files'), where('taskid', '==', dId))
      const querySnapshot = await getDocs(q)
      this.taskfile = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, ' => ', doc.data())
        this.taskfile.push([doc.id, doc.data()])
      })
      //this.taskRemarks = this.taskfile[0].remarks
      this.taskfinalreviewclick = true
      this.acceptrejectdid = dId
    },
    ToSubmit(docid) {
      this.submitClicked = docid
    },

    taskSubmittoggle() {
      this.taskSubmitmodal['modal-open'] = true
    },
    taskSubmitCloser() {
      this.taskSubmitmodal['modal-open'] = false
      this.submitClicked = false
    },
    async createEmployee(values) {
      const userStore = useUserStore()
      try {
        // Create user with email and password
        //localStorage.setItem('empRegistered', true)
        // localStorage.setItem('userObj', userStore.userObj)
        const adminAuthState = auth.currentUser
        const usercred = await createUserWithEmailAndPassword(
          secoauth,
          values.email,
          values.password
        )
        // Create user document in Firestore
        const userDocRef = doc(db, 'employee', usercred.user.uid)
        //const adminDocRef = doc(db, 'admin', userStore.userObj.uid)
        await setDoc(userDocRef, {
          name: values.name,

          age: values.age,
          country: values.country,
          JobTitle: values.JobTitle,
          email: values.email,
          createdAt: new Date(),
          Role: 'employee',
          AdminUid: userStore.userObj.uid,
          AdminmMail: userStore.userObj.email
        })

        // Update user profile display name
        await updateProfile(usercred.user, {
          displayName: values.name
        })

        await auth.updateCurrentUser(adminAuthState)
        sendNotification(usercred.user.uid, 'Hey welcome to the team')
        // console.log('user cred')
        console.log(usercred)

        console.log('user details after loging in' + this.userLoggedIn) // Verify user is logged in

        console.log('user details after registration' + this.userLoggedIn) // Verify user is logged in
      } catch (error) {
        // Handle any errors
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
      }
    },
    async createTask(values) {
      try {
        let userStore = useUserStore()
        await addDoc(collection(db, 'Task'), {
          name: values.name,
          deadline: values.date,
          assignto: values.assignto,
          priority: values.priority,
          status: 'pending',
          AdminUid: userStore.userObj.uid
        })
      } catch (error) {
        // Handle any errors
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
      }
    },
    async userInfoFetch(docid) {
      const DocRef = doc(db, 'employee', docid)
      const docSnap = await getDoc(DocRef)
      if (docSnap.exists()) {
        this.employeInfo = docSnap.data()
      }
    },
    async statusChange(docid) {
      const DocRef = doc(db, 'Task', docid)
      const docSnap = await getDoc(DocRef)
      // const userStore = useUserStore()
      // Set the "capital" field of the city 'DC'
      await updateDoc(DocRef, {
        status: 'ongoing'
      })
      sendNotification(
        this.employeInfo.AdminUid,
        `${this.employeInfo.name} has started working on the Task: ${docSnap.data().name}`
      )
      this.taskactionmodal['modal-open'] = false
      this.alert_msg = 'Task Status Changed to ongoing'
      this.alertmodal = true

      setTimeout(this.alertModalClose, 2000)
    },
    taskTogglemodal(docid) {
      this.taskactionmodal['modal-open'] = true
      this.currentAction = docid
    },
    taskTogglemodalCloser() {
      this.taskactionmodal['modal-open'] = false
      this.currentAction = null
    },
    alertModalClose() {
      this.alertmodal = false
    },
    async SubmitTask(values) {
      for (const file of values.Files) {
        const uniqueFileName = file.name
        const storageRef = ref(storage, 'uploads/' + uniqueFileName)

        try {
          // Upload the file
          const snapshot = await uploadBytes(storageRef, file)
          console.log('Uploaded a blob or file!', snapshot)

          // Get the file's download URL
          const downloadURL = await getDownloadURL(storageRef)
          console.log('File available at', downloadURL)

          // Add a document with file metadata to Firestore
          await addDoc(collection(db, 'files'), {
            name: file.name,
            taskid: this.submitClicked,
            uniqueName: uniqueFileName,
            url: downloadURL,
            createdAt: new Date()

            // remarks: values.remarks
          })
          await updateDoc(doc(db, 'Task', this.submitClicked), {
            status: 'in review'
          })
          await setDoc(
            doc(db, 'Task', this.submitClicked),
            {
              remarks: values.remarks
            },
            { merge: true }
          )

          console.log('File uploaded and metadata saved.')
        } catch (error) {
          console.error('Error uploading file:', error)
        }
      }
    }
  },
  getters: {
    RenderedOngoingTaskArray() {
      return this.RenderedTaskArray.filter(
        (item) => item.status == 'ongoing' || item.status == 'Rejected'
      )
    }
  }
})
