<template>
  <div>
    <AppHeader></AppHeader>
    <RouterView></RouterView>

    <!-- Auth Modal -->
    <AppAuth></AppAuth>
    <alert>{{ this.empStore.alert_msg }}</alert>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import { useempStore } from './stores/emp'
import alert from './components/alert.vue'
export default {
  name: 'App',
  data() {
    return {
      empStore: null
    }
  },
  components: {
    AppHeader,
    AppAuth,
    alert
  },
  mounted() {
    const initialLoader = document.getElementById('initial-loader')
    if (initialLoader) {
      initialLoader.style.display = 'none'
    }
  },
  created() {
    this.empStore = useempStore()
  }
}
</script>
