<template>
  <dialog id="my_modal_3" class="modal" :class="empStore.WorkloadModal">
    <div class="modal-box bg-neutral text-neutral-content">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click.prevent="empStore.ToggleWorkloadModalCloser"
        >
          ✕
        </button>
      </form>
      <div
        class="text-black text-center font-bold p-4 rounded mb-4"
        v-if="reg_show_alert"
        :class="reg_alert_variant"
      >
        {{ reg_alert_msg }}
      </div>
      <h3 class="text-lg font-bold mb-4 text-center">Adjust WorkLoad</h3>

      <!-- Range 1 -->
      <VeeForm @submit="register">
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-neutral-content">
              High :{{ empStore.WorkloadDetails.High }}
            </span>
          </label>
          <VeeField
            type="range"
            class="range range-primary"
            min="5"
            max="20"
            v-model="empStore.WorkloadDetails.High"
            name="High"
          />
        </div>

        <!-- Range 2 -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-neutral-content"
              >Medium :{{ empStore.WorkloadDetails.Medium }}</span
            >
          </label>
          <VeeField
            name="Medium"
            type="range"
            class="range range-secondary"
            min="5"
            max="20"
            v-model="empStore.WorkloadDetails.Medium"
          />
        </div>

        <!-- Range 3 -->
        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text text-neutral-content"
              >Low :{{ empStore.WorkloadDetails.Low }}</span
            >
          </label>
          <VeeField
            name="Low"
            type="range"
            class="range range-accent"
            min="5"
            max="20"
            v-model="empStore.WorkloadDetails.Low"
          />
        </div>

        <!-- Confirm Button -->
        <div class="form-control">
          <button class="btn btn-primary w-full" type="submit" :disabled="reg_in_submission">
            Submit
          </button>
        </div>
      </VeeForm>
    </div>
  </dialog>
</template>

<script>
import { useempStore } from '@/stores/emp'
export default {
  name: 'WorkLoad',
  data() {
    return {
      empStore: null,
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'please wait!Changes are taking place'
    }
  },
  created() {
    this.empStore = useempStore()
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      try {
        //function call
        await this.empStore.WorkloadChanges(values)
      } catch (error) {
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        return
      } finally {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-green-500'
        this.reg_alert_msg = 'Success! changes made'
        setTimeout(() => {
          this.reg_show_alert = false
        }, 2000)
      }
    }
  }
}
</script>
