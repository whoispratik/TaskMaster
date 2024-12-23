<template>
  <dialog id="my_modal_3" class="modal" :class="empStore.taskSubmitmodal">
    <div class="modal-box">
      <div
        class="tex-white text-center font-bold p-4 rounded mb-4"
        v-show="reg_show_alert"
        :class="reg_alert_variant"
      >
        {{ reg_alert_msg }}
      </div>

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
            <template v-if="empStore.RenderedOngoingTaskArray.length === 0">
              <tr>
                <td colspan="5" class="text-center">No Task to Submit or Re-Submit</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="task in empStore.RenderedOngoingTaskArray" :Key="task">
                <th>{{ task.name }}</th>
                <td>{{ task.priority }}</td>
                <td>{{ task.deadline }}</td>
                <td>{{ task.status }}</td>
                <td @click.stop="empStore.ToSubmit(task.id)">
                  <a class="cursor-pointer"> Submit </a>
                </td>
              </tr>
            </template>
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
      reg_alert_variant: 'bg-blue-500',
      empStore: null,
      reg_show_alert: false
    }
  },
  methods: {
    async register(values, { resetForm }) {
      this.reg_in_submission = true
      this.reg_show_alert = true
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
        this.reg_show_alert = false
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
