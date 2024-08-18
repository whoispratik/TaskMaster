<template>
  <div class="toast toast-top toast-center" v-show="empStore.alertmodal">
    <div role="alert" class="alert alert-success">
      <span class="text-"><slot></slot></span>
    </div>
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
