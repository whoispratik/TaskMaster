// src/services/notifications.js
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../includes/firebase'
import { useUserStore } from '@/stores/user'
import { useempStore } from '@/stores/emp'
const notificationsRef = collection(db, 'notifications')

const sendNotification = async (toUserId, message) => {
  await addDoc(notificationsRef, {
    toUserId,
    message,
    timestamp: new Date()
    // read: false
  })
}

const listenForNotifications = (userId, callback) => {
  let UserStore = useUserStore()
  const q = query(notificationsRef, where('toUserId', '==', userId))
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        callback([change.doc.id, change.doc.data()])
      }
      if (change.type === 'removed') {
        UserStore.notifications = UserStore.notifications.filter(
          (notification) => notification[0] !== change.doc.id
        )
      }
    })
  })
}

const listenForTaskChanges = () => {
  let empStore = useempStore()
  let userStore = useUserStore()
  const q = query(collection(db, 'Task'), where('assignto', '==', userStore.userObj.uid))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        empStore.RenderedTaskArray.push([change.doc.id, change.doc.data()])
      }
      if (change.type == 'modified') {
        empStore.RenderedTaskArray.forEach((d) => {
          if (d[0] == change.doc.id) d[1].status = change.doc.data().status
        })
      }
    })
  })
}
const listenForEmployeeChanges = () => {
  let empStore = useempStore()
  let userStore = useUserStore()
  console.log('executing')
  const q = query(collection(db, 'employee'), where('AdminUid', '==', userStore.userObj.uid))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        empStore.RenderedEmpArray.push([change.doc.id, change.doc.data()])
      }
    })
  })
}

export { sendNotification, listenForNotifications, listenForTaskChanges, listenForEmployeeChanges }
