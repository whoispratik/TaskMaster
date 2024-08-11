<template>
  <dialog id="my_modal_3" class="modal" :class="empStore.taskreviewmodal">
    <div class="modal-box">
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
            <tr>
              <th class="text-left text-blue-900">Name</th>
              <th class="text-left text-blue-900">Priority</th>
              <th class="text-left text-blue-900">Deadline</th>
              <th class="text-left text-blue-900">Status</th>
              <th class="text-left text-blue-900">Action</th>
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

        <div class="p-4 max-w-full" v-show="empStore.taskfinalreviewclick">
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <li
              v-for="file in empStore.taskfile"
              :key="file[0]"
              class="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md"
            >
              <a :href="file[1].url" target="_blank" class="text-blue-600 hover:underline">
                {{ file[1].name }}
              </a>
            </li>
          </ul>
          <h1>Employees Remarks:</h1>

          <textarea
            rows="4"
            cols="50"
            v-model="empStore.taskRemarks"
            disabled
            class="textarea textarea-success textarea-md"
          ></textarea>

          <button class="btn btn-success btn-lg" @click="empStore.accept">Accept</button>
          <button class="btn btn-error btn-lg" @click="empStore.reject">Reject</button>
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
