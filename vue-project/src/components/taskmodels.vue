<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" :class="manageStore.hiddentaskClass" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Create A Task</p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              @click.prevent="manageStore.taskfalseassigner"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- tasl creation form -->

          <taskCreateForm></taskCreateForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useManageStore } from '@/stores/manage'

import taskCreateForm from '@/components/TaskCreate.vue'
export default {
  name: 'TaskModels',
  components: {
    taskCreateForm
  },
  data() {
    return {
      manageStore: null
    }
  },
  created() {
    this.manageStore = useManageStore()
  }
}
</script>
