<template>
  <div
    class="tex-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <VeeForm :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
        name="name"
      />
      <ErrorMessage class="text-red-600" name="name"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Job Title</label>
      <VeeField
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter job title "
        name="JobTitle"
      />
      <ErrorMessage class="text-red-600" name="JobTitle"></ErrorMessage>
    </div>

    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <veeField
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        name="email"
      />
      <ErrorMessage class="text-red-600" name="email"></ErrorMessage>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <veeField
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age"></ErrorMessage>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <veeField
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
        :bails="false"
        v-slot="{ field, errors }"
      >
        <input
          type="password"
          name="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </veeField>
    </div>

    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <veeField
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
        name="confirmPassword"
      />
      <ErrorMessage class="text-red-600" name="confirmPassword"></ErrorMessage>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <veeField
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="USA">Nepal</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="india">India</option>
      </veeField>
      <ErrorMessage class="text-red-600" name="country"></ErrorMessage>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <veeField
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        value="1"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos"></ErrorMessage>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </VeeForm>
</template>
<script>
import { useempStore } from '@/stores/emp'
export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:4|max:75|alpha_spaces',
        email: 'required|email',
        age: 'required|min_value:18|max_value:200',
        password: 'required|min:9|max:100|invalidpass:password',
        confirmPassword: 'confirmed:@password',
        country: 'required|invalidcountry:india',
        JobTitle: 'required',
        tos: 'tos'
        // Role: 'required'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'please wait!your account is being created',
      empStore: null
    }
  },
  created() {
    // Initialize the user store when the component is created
    this.empStore = useempStore()
  },
  methods: {
    async register(values, { resetForm }) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      try {
        //function call
        await this.empStore.createEmployee(values)
      } catch (error) {
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
        return
      } finally {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-green-500'
        this.reg_alert_msg = 'Success! an employee account has been created'
        setTimeout(() => {
          this.reg_show_alert = false
        }, 2000)
        resetForm()
      }
    }
  }
}
</script>
