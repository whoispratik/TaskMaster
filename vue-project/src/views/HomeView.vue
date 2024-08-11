<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"
    ></div>

    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Efficient Task Management WebApp</h1>
        <p class="w-full md:w-8/12 mx-auto text-2xl">
          "Formalizing Communication ,Enhancing Productivity"
        </p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      userStore: null
    }
  }
}
</script>
