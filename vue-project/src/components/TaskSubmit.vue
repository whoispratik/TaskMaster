<template>
  <dialog id="my_modal_3" class="modal" :class="empStore.taskSubmitmodal">
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="empStore.taskSubmitCloser"
        >
          ✕
        </button>
      </form>
      <div class="overflow-x-auto">
        <table class="table" v-if="!empStore.submitClicked">
          <!-- head -->
          <thead>
            <tr>
              <th>Name</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="task in empStore.RenderedOngoingTaskArray" :Key="task">
              <th>{{ task[1].name }}</th>
              <td>{{ task[1].priority }}</td>
              <td>{{ task[1].deadline }}</td>
              <td>{{ task[1].status }}</td>
              <td @click.stop="empStore.ToSubmit(task[0])">
                <a class="cursor-pointer"> Submit </a>
              </td>
            </tr>
          </tbody>
        </table>

        <VeeForm :validation-schema="schema" @submit="register" v-if="empStore.submitClicked">
          <!-- Name -->
          <div class="mb-3">
            <VeeField
              type="file"
              class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
              multiple
              name="Files"
            />
            <ErrorMessage class="text-red-600" name="Files"></ErrorMessage>
          </div>
          <!-- Name -->
          <div class="mb-3">
            <label class="inline-block mb-2">Remarks/Comment</label>
            <VeeField
              as="textarea"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Remarks?"
              name="remarks"
            />
            <ErrorMessage class="text-red-600" name="remarks"></ErrorMessage>
          </div>
          <button
            type="submit"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            :disabled="reg_in_submission"
          >
            Submit
          </button>
        </VeeForm>
      </div>
    </div>
  </dialog>
</template>
<script>
import { useempStore } from '@/stores/emp'
import { sendNotification } from '@/includes/notifications'

export default {
  name: 'TaskSubmit',
  data() {
    return {
      empstore: null,

      schema: {
        Files: 'required',
        remarks: 'required'
        // Role: 'required'
      },
      reg_in_submission: false,
      reg_alert_msg: 'please wait!The task is being submitted',
      empStore: null
    }
  },
  methods: {
    async register(values, { resetForm }) {
      this.reg_in_submission = true
      try {
        //function call
        await this.empStore.SubmitTask(values)
      } catch (error) {
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
        return
      } finally {
        this.reg_in_submission = false
        //this.reg_alert_msg = 'Success! Task has been Assigned'
        // this.sendTestNotification(values.assignto, values.name)
        sendNotification(
          this.empStore.employeInfo.AdminUid,
          `${this.empStore.employeInfo.name} has submitted a task'`
        )
        this.empStore.alert_msg = 'success the task has been submitted'
        this.empStore.taskSubmitmodal['modal-open'] = false
        this.empStore.submitClicked = false
        this.empStore.alertmodal = true
        setTimeout(() => {
          this.empStore.alertmodal = false
        }, 2000)
        resetForm()
        // window.location.reload()
      }
    },
    async sendTestNotification(userid, tName) {
      await sendNotification(userid, `task submitted ${tName}`)
    }
  },
  created() {
    this.empStore = useempStore()
  }
}
</script>
