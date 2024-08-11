<template>
  <div
    role="alert"
    class="alert alert-success absolute top-20 left-1/2 transform -translate-x-1/2"
    v-show="empStore.alertmodal"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span class="text-xl"><slot> task status changed to ongoing! </slot> </span>
  </div>
</template>

<script>
import { useempStore } from '@/stores/emp'
export default {
  name: 'AlertComp',
  data() {
    return {
      empStore: null
    }
  },
  created() {
    this.empStore = useempStore()
  }
}
</script>

<style lang="scss" scoped></style>
