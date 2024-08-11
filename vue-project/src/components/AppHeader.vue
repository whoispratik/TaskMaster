<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        :to="{ name: 'home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        href="#"
        exactActiveClass="none"
        >Task Master</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->

          <template v-if="!userStore.userLoggedIn">
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="modalStore.toggle"
                >Login / Register</a
              >
            </li>
          </template>
          <template v-else>
            <li>
              <RouterLink
                :to="{ name: 'home' }"
                class="px-2 text-white"
                href="#"
                @click.prevent="userStore.logout"
                exactActiveClass="none"
                >logout</RouterLink
              >
              <RouterLink :to="{ name: 'Manage' }" class="px-2 text-white">Manage</RouterLink>
            </li>
          </template>
        </ul>
        <!-- User Welcome Message -->
        <template v-if="userStore.userLoggedIn">
          <div class="ml-auto">
            <span class="px-2 text-white">
              Welcome
              {{
                (userStore.UserType || 'User') + ':' + userStore.userObj.displayName.toUpperCase()
              }}
            </span>

            <div class="dropdown dropdown-end">
              <div tabindex="20000" role="button" class="m-1">
                <i class="fa-sharp fa-solid fa-bell fa-2xl" style="color: #b197fc"></i>
                <span class="text-red-800 text-2xl font-extrabold">{{
                  userStore.notifications.length > 0 ? userStore.notifications.length : ''
                }}</span>
              </div>
              <template v-if="userStore.notifications.length != 0">
                <ul
                  tabindex="20000"
                  class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li v-for="(notification, index) in userStore.notifications" :key="index">
                    <span>{{ notification[1].message }}</span>
                    <button
                      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      @click.stop="userStore.deleteNotification(notification[0])"
                    >
                      ✕
                    </button>
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'

import { listenForNotifications } from '../includes/notifications'
export default {
  name: 'AppHeader',
  data() {
    return {
      initialUserStore: null
    }
  },
  computed: {
    modalStore() {
      return useModalStore()
    },
    userStore() {
      return useUserStore()
    }
  },
  created() {
    const userid = this.userStore.userObj?.uid ?? ''
    listenForNotifications(userid, (notification) => {
      this.userStore.notifications.push(notification)
      this.userStore.notifications.sort((a, b) => b[1].timestamp - a[1].timestamp)
      let mySound = new Audio('/assets/audio/mixkit-long-pop-2358.wav')
      mySound.play()
    })
  }
}
</script>
