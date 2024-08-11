<template>
  <!-- Login Form -->
  <div
    class="tex-white text-center font-bold p-4 rounded mb-4"
    v-if="log_show_alert"
    :class="log_alert_variant"
  >
    {{ log_alert_msg }}
  </div>
  <VeeForm @submit="login" :validation-schema="loginschema">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="log_in_submission"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
import { useUserStore } from '@/stores/user'
export default {
  name: 'LoginForm',
  data() {
    return {
      loginschema: {
        email: 'required|email',
        password: 'required|min:9|max:100'
      },
      log_in_submission: false,
      log_show_alert: false,
      log_alert_variant: 'bg-blue-500',
      log_alert_msg: 'please wait!we are loggin you in',
      UserStore: null
    }
  },
  created() {
    // Initialize the user store when the component is created
    this.UserStore = useUserStore()
  },
  methods: {
    async login(values) {
      this.log_in_submission = true
      this.log_show_alert = true
      try {
        await this.UserStore.authenticate(values)
      } catch (error) {
        this.log_alert_variant = 'bg-red-500'
        this.log_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
        this.log_in_submission = false
        return
      }
      this.log_alert_variant = 'bg-green-500'
      this.log_alert_msg = 'success!you are logged in'
      window.location.reload()
    }
  }
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>
