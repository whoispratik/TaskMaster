<template>
  <!--Container-->
  <div class="container w-full mx-auto pt-20">
    <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
      <!--Console Content-->

      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 xl:w-1/3 p-3" v-if="InitialUserStore.interface">
          <!--Metric Card-->
          <div class="bg-neutral border rounded shadow p-2 text-neutral-content">
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded p-3 bg-pink-600">
                  <i class="fas fa-users fa-2x fa-fw fa-inverse"></i>
                </div>
              </div>
              <div class="flex-1 text-right md:text-center">
                <h5 class="font-bold uppercase">Employees</h5>
                <h3 class="font-bold text-3xl">
                  {{ userStore.RenderedEmpArray.length
                  }}<span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span>
                </h3>
              </div>
            </div>
          </div>
          <!--Metric Card-->

          <!--/Metric Card-->
        </div>
        <div
          class="w-full md:w-1/2 xl:w-1/3 p-3 cursor-pointer"
          v-if="InitialUserStore.interface"
          @click.stop="this.userStore.taskReviewToggle"
        >
          <!--Metric Card-->
          <div class="bg-neutral border rounded shadow p-2 text-neutral-content">
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded p-3 bg-pink-600">
                  <i class="fa-solid fa-magnifying-glass fa-2x fa-fw fa-inverse"></i>
                </div>
              </div>
              <div class="flex-1 text-right md:text-center">
                <h5 class="font-bold uppercase">To Review</h5>
              </div>
            </div>
          </div>
          <!--Metric Card-->

          <!--/Metric Card-->
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-3" v-if="InitialUserStore.interface">
          <!--Metric Card-->
          <div
            class="bg-neutral border rounded shadow p-2 text-neutral-content"
            @mouseover="manageStore.MouseOverHandler"
            @mouseout="manageStore.MouseOutHandler"
            @click="manageStore.toggle"
          >
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded p-3 bg-yellow-600">
                  <i
                    class="fas fa-user-plus fa-2x fa-fw fa-inverse"
                    :class="{ 'fa-bounce': manageStore.ishovered }"
                  ></i>
                </div>
              </div>
              <div class="flex-1 text-right md:text-center cursor-pointer">
                <h5 class="font-bold uppercase">register Users</h5>
              </div>
            </div>
          </div>
          <!--/Metric Card-->
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-3">
          <!--Metric Card-->
          <div class="bg-neutral border rounded shadow p-2 text-neutral-content">
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded p-3 bg-indigo-600">
                  <i class="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
                </div>
              </div>
              <div class="dropdown w-full">
                <div class="flex-1 text-right md:text-center cursor-pointer">
                  <h5 tabindex="0" role="button" class="font-bold uppercase">Tasks</h5>
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content menu bg-neutral rounded-box z-[1] w-52 p-2 shadow b"
                >
                  <li v-if="InitialUserStore.interface">
                    <a @click.stop.prevent="manageStore.createtasktoggle">Create tasks</a>
                  </li>
                  <li v-else @click="userStore.taskSubmittoggle"><a>Submit a Task</a></li>
                </ul>
              </div>
            </div>
          </div>
          <!--/Metric Card-->
        </div>
      </div>

      <!--Divider-->
      <hr class="border-b-2 border-gray-400 my-8 mx-4" />

      <div class="flex flex-row flex-wrap flex-grow mt-2 bg-neutral">
        <div class="w-full p-3">
          <!--Table Card-->
          <div class="border rounded shadow" v-if="InitialUserStore.UserType == 'admin'">
            <div class="border-b p-3">
              <h5 class="font-bold uppercase text-gray-600">Table</h5>
            </div>
            <div class="p-5 overflow-x-auto">
              <table
                class="table w-full p-5 bg-neutral text-neutral-content"
                v-if="userStore.RenderedEmpArray.length > 0"
              >
                <thead>
                  <tr>
                    <th class="text-left text-neutral-content">Name</th>
                    <th class="text-left text-neutral-content">Role</th>
                    <th class="text-left text-neutral-content">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in userStore.RenderedEmpArray" :key="item">
                    <td>{{ item[1].name }}</td>
                    <td>{{ item[1].JobTitle }}</td>
                    <td>
                      <div class="dropdown dropdown-left w-full">
                        <td :tabindex="index" role="button">action</td>
                        <ul
                          :tabindex="index"
                          class="dropdown-content bg-neutral menu shadow-white rounded-box z-[1] w-52 p-2 shadow"
                        >
                          <li>
                            <a @click.prevent.stop="togglemodal(index)">view tasks</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h1 v-else>Register an Employee First</h1>

              <!--
              
         <p class="py-2"><a href="#">See More issues...</a></p>
         -->
            </div>
          </div>
          <div class="bg-neutral text-neutral-content border rounded shadow" v-else>
            <div class="border-b p-3">
              <h5 class="font-bold uppercase text-neutral-content">Task Table</h5>
            </div>
            <div class="p-5 overflow-x-auto">
              <table
                class="table w-full p-5 text-neutral-content"
                v-if="userStore.RenderedTaskArray.length > 0"
              >
                <thead class="text-neutral-content">
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Priority</th>
                    <th class="text-left">Deadline</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in userStore.RenderedTaskArray" :key="item">
                    <td>{{ item[1].name }}</td>
                    <td>{{ item[1].priority }}</td>
                    <td>{{ item[1].deadline }}</td>
                    <td>{{ item[1].status }}</td>
                    <td>
                      <div class="dropdown dropdown-left w-full">
                        <div tabindex="200000" role="button" class="w-full">Action</div>
                        <ul
                          tabindex="200000"
                          class="dropdown-content bg-neutral text-neutral-content menu shadow-white rounded-box z-[1] w-52 p-2 shadow"
                          v-if="item[1].status == 'pending'"
                        >
                          <li>
                            <a @click.prevent.stop="userStore.taskTogglemodal(item[0])"
                              >start the task</a
                            >
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h1 v-else>No Task assigned yet</h1>
              <!--
              
         <p class="py-2"><a href="#">See More issues...</a></p>
         -->
            </div>
          </div>
          <!--/table Card-->
        </div>
      </div>
      <!--/ Console Content-->
    </div>
  </div>
  <employAuth></employAuth>
  <taskModels></taskModels>
  <!-- You can open the modal using ID.showModal() method -->
  <dialog id="my_modal_3" class="modal" :class="taskviewmodal">
    <div class="modal-box bg-neutral text-neutral-content">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closer">
          ✕
        </button>
      </form>
      <div class="overflow-x-auto bg-neutral text-neutral-content">
        <table class="table" v-if="userStore.RenderedTaskArray.length > 0">
          <!-- head -->
          <thead>
            <tr class="text-neutral-content">
              <th class="text-left">Name</th>
              <th class="text-left">Priority</th>
              <th class="text-left">Deadline</th>
              <th class="text-left">Status</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in userStore.RenderedTaskArray" :key="item">
              <td>{{ item[1].name }}</td>
              <td>{{ item[1].priority }}</td>
              <td>{{ item[1].deadline }}</td>
              <td>{{ item[1].status }}</td>
              <td>Action</td>
            </tr>
          </tbody>
        </table>
        <h1 v-else>No Task assigned yet</h1>
      </div>
    </div>
  </dialog>
  <dialog id="my_modal_3" class="modal" :class="userStore.taskactionmodal">
    <div class="modal-box bg-neutral text-neutral-content">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click.prevent="userStore.taskTogglemodalCloser"
        >
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">Do you want to start working on this task!</h3>
      <button
        class="btn btn-success btn-lg"
        @click="userStore.statusChange(userStore.currentAction)"
      >
        Yes
      </button>
    </div>
  </dialog>
  <ReviewRenderedModal></ReviewRenderedModal>
  <TaskSubmit></TaskSubmit>
</template>

<script>
import { useManageStore } from '@/stores/manage'
import employAuth from '@/components/employAuth.vue'
import taskModels from '@/components/taskmodels.vue'
import { useempStore } from '@/stores/emp'
import { useUserStore } from '@/stores/user'
import { collection, query, where, getDocs } from 'firebase/firestore'
import TaskSubmit from '@/components/TaskSubmit.vue'
import { db } from '../includes/firebase'
import ReviewRenderedModal from '@/components/ReviewRenderedModal.vue'

//import { listenForNotifications } from '../includes/notifications'
//import { useUserStore } from '@/stores/user'

export default {
  name: 'ManageView',
  components: { employAuth, taskModels, TaskSubmit, ReviewRenderedModal },
  data() {
    return {
      manageStore: null,
      userStore: null,
      InitialUserStore: null,
      taskviewmodal: { 'modal-open': false },
      notifications: []
    }
  },
  methods: {
    /*
    async query1() {
      const q = query(
        collection(db, 'employee'),
        where('AdminUid', '==', this.InitialUserStore.userObj.uid)
      )
      const querySnapshot = await getDocs(q)
      this.userStore.RenderedEmpArray = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, ' => ', doc.data())
        this.userStore.RenderedEmpArray.push([doc.id, doc.data()])
      })
    },
    /*,
    async query2() {
      const q = query(
        collection(db, 'Task'),
        where('assignto', '==', this.InitialUserStore.userObj.uid)
      )
      const querySnapshot = await getDocs(q)
      this.userStore.RenderedTaskArray = []
      querySnapshot.forEach((doc) => {
        this.userStore.RenderedTaskArray.push(doc.data())
      })
    }
      //will run this query from the admin interface
      */ async taskrenderquery(index) {
      const q = query(
        collection(db, 'Task'),
        where('assignto', '==', this.userStore.RenderedEmpArray[index][0])
      )
      const querySnapshot = await getDocs(q)
      this.userStore.RenderedTaskArray = []
      querySnapshot.forEach((doc) => {
        this.userStore.RenderedTaskArray.push([doc.id, doc.data()])
      })
    },

    togglemodal(index) {
      this.taskviewmodal['modal-open'] = !this.taskviewmodal['modal-open']
      this.taskrenderquery(index)
    },
    closer() {
      this.taskviewmodal['modal-open'] = false
    }
  },
  created() {
    this.manageStore = useManageStore()
    this.userStore = useempStore()
    this.InitialUserStore = useUserStore()
    /*
    const userid = this.InitialUserStore.userObj.uid
    listenForNotifications(userid, (notification) => {
      this.InitialUserStore.notifications.push(notification)
      this.InitialUserStore.notifications.sort((a, b) => b[1].timestamp - a[1].timestamp)
      let mySound = new Audio('/assets/audio/mixkit-long-pop-2358.wav')
      mySound.play()

    })
      */
    //this.query1()
    // this.query2()
  }

  //in component router guard had to comment this out because if my projects scale grew it would be a hassle to have this in every compnent
  /*
  beforeRouteEnter(to, from, next) {
    const store = useUserStore()
    if (store.userLoggedIn) next()
    else {
      next({ name: 'home' })
    }
  }
    */
}
</script>

<style scoped></style>
