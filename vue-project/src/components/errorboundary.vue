<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="error" class="error">
    <p>An error occurred: {{ error.message }}</p>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: null
    }
  },
  errorCaptured(err, vm, info) {
    console.error('Error captured in component:', err, info)
    this.error = err
    // Return false to stop the error from propagating to parent components
    return false
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
