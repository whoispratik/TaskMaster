<template>
  <dialog id="my_modal_3" class="modal" :class="empStore.taskreviewmodal">
    <div class="modal-box bg-neutral text-neutral-content">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="empStore.taskreviewmodalcloser"
        >
          ✕
        </button>
      </form>
      <div class="overflow-x-auto">
        <table
          class="table"
          v-if="empStore.RenderedReviewArray.length > 0 && !empStore.taskfinalreviewclick"
        >
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
            <tr v-for="item in empStore.RenderedReviewArray" :key="item">
              <td>{{ item[1].name }}</td>
              <td>{{ item[1].priority }}</td>
              <td>{{ item[1].deadline }}</td>
              <td>{{ item[1].status }}</td>
              <td>
                <a class="cursor-pointer" @click.prevent.stop="empStore.reviewhandler(item[0])">
                  Review
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <h1 v-else-if="empStore.RenderedReviewArray.length <= 0 && !empStore.taskfinalreviewclick">
          Nothing to review
        </h1>
        <div class="p-4 max-w-full" v-show="empStore.taskfinalreviewclick">
          <!-- Responsive grid for files -->
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <li
              v-for="(file, index) in empStore.taskfile"
              :key="file[0]"
              class="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md"
            >
              <a
                :href="file[1].url"
                target="_blank"
                class="text-blue-600 hover:underline"
                rel="noopener noreferrer"
              >
                Download File {{ index }}
              </a>
            </li>
          </ul>

          <!-- Employees Remarks section -->
          <div class="mb-4">
            <h1 class="text-xl font-semibold mb-2">Employees Remarks:</h1>
            <textarea
              rows="4"
              v-model="empStore.taskRemarks"
              disabled
              class="textarea textarea-success textarea-md w-full resize-none"
              placeholder="No remarks available"
            ></textarea>
          </div>

          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="btn btn-outline btn-success w-full sm:w-auto p-3"
              @click="empStore.accept"
            >
              Accept
            </button>
            <button
              class="btn btn-outline btn-warning w-full sm:w-auto p-3"
              @click="empStore.reject"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
<script>
import { useempStore } from '@/stores/emp'
export default {
  data() {
    return {
      empStore: null
    }
  },
  methods: {},
  created() {
    this.empStore = useempStore()
  }
}
</script>
