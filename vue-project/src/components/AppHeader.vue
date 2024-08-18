<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="45000" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="45000"
          class="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 bg-neutral text-neutral-content"
        >
          <template v-if="!userStore.userLoggedIn">
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="modalStore.toggle"
                >Login / Register</a
              >
            </li>
          </template>
          <template v-else>
            <li>
              <span
                >Welcome
                {{
                  (userStore.UserType || 'User') + ':' + userStore.userObj.displayName.toUpperCase()
                }}
              </span>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'home' }"
                class="px-2 text-white"
                href="#"
                @click.prevent="userStore.logout"
                exactActiveClass="none"
                >logout</RouterLink
              >
              <RouterLink :to="{ name: 'Manage' }" class="px-2">Manage</RouterLink>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <RouterLink
        :to="{ name: 'home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        href="#"
        exactActiveClass="none"
        >Task Master</RouterLink
      >
    </div>
    <div class="navbar-end" v-if="userStore.userLoggedIn">
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost btn-circle" tabindex="20000" role="button">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="badge badge-xs badge-primary indicator-item"
              v-if="userStore.notifications.length != 0"
            ></span>
          </div>
        </button>
        <template v-if="userStore.notifications.length != 0">
          <ul
            tabindex="20000"
            class="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-neutral text-neutral-content"
          >
            <li v-for="(notification, index) in userStore.notifications" :key="index">
              <span class="mr-0.5">{{ notification[1].message }}</span>
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-0 top-0"
                @click.stop="userStore.deleteNotification(notification[0])"
              >
                ✕
              </button>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
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
