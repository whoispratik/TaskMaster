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
        placeholder="Task Name"
        name="name"
      />
      <ErrorMessage class="text-red-600" name="name"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Deadline</label>
      <VeeField
        type="date"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        name="date"
      />
      <ErrorMessage class="text-red-600" name="date"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Priority</label>
      <veeField
        name="priority"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">low</option>
      </veeField>
      <ErrorMessage class="text-red-600" name="priority"></ErrorMessage>
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2"> Assign to :</label>
      <veeField
        name="assignto"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option v-for="item in empStore.RenderedEmpArray" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </veeField>
      <ErrorMessage class="text-red-600" name="assignto"></ErrorMessage>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Create
    </button>
  </VeeForm>
</template>
<script>
import { useempStore } from '@/stores/emp'
import { sendNotification } from '@/includes/notifications'
export default {
  name: 'taskCreateForm',
  data() {
    return {
      schema: {
        name: 'required|min:4|max:75|alpha_spaces',
        date: 'required|futuredate',
        assignto: 'required',
        priority: 'required'

        // Role: 'required'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'please wait!The task is being assigned',
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
        await this.empStore.createTask(values)
      } catch (error) {
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
        return
      } finally {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-green-500'
        this.reg_alert_msg = 'Success! Task has been Assigned'
        setTimeout(() => {
          this.reg_show_alert = false
        }, 2000)
        this.sendTestNotification(values.assignto, values.name)
        resetForm()
        // window.location.reload()
      }
    },
    async sendTestNotification(userid, tName) {
      await sendNotification(userid, `A Task was assigned to you ${tName}`)
    }
  }
}
</script>
