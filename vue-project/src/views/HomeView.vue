<template>
  <div class="hero min-h-screen" style="background-image: url(/assets/img/backg4.jpg)">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Task Master</h1>
        <p class="mb-5 text-2xl">An Efficient Task Management Web App</p>

        <RouterLink :to="{ name: 'Manage' }" class="px-2 btn btn-primary">Get Started</RouterLink>
      </div>
    </div>
  </div>

  <footer class="footer bg-neutral text-neutral-content items-center p-4">
    <aside class="grid-flow-col items-center">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        class="fill-current"
      >
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
        ></path>
      </svg>
      <p>Copyright © (2024) - All right reserved</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a
        href="https://github.com/whoispratik"
        target="_blank"
        class="cursor-pointer"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path
            d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.579v-2.173c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.109-.774.419-1.304.762-1.604-2.665-.303-5.467-1.332-5.467-5.933 0-1.31.469-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.48 11.48 0 013.003-.404c1.019.005 2.047.138 3.003.404 2.291-1.552 3.299-1.23 3.299-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.913 1.235 3.222 0 4.61-2.806 5.625-5.478 5.921.43.372.824 1.103.824 2.222v3.293c0 .32.192.694.801.576C20.565 21.797 24 17.303 24 12c0-6.627-5.373-12-12-12z"
          ></path>
        </svg>
      </a>

      <a
        href="https://www.linkedin.com/in/pratik-bahadur-thapa-b9964919a/"
        target="_blank"
        class="cursor-pointer"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path
            d="M19.616 3H4.385C3.056 3 2 4.055 2 5.384v13.232C2 19.944 3.056 21 4.385 21h15.231C20.944 21 22 19.944 22 18.616V5.384C22 4.055 20.944 3 19.616 3zM8.338 17.338H5.794V10.88h2.544v6.458zM7.066 9.821c-.815 0-1.325-.606-1.325-1.365 0-.77.52-1.365 1.35-1.365.83 0 1.325.595 1.335 1.365-.01.759-.505 1.365-1.36 1.365zm9.936 7.517h-2.544v-3.518c0-.887-.316-1.492-1.109-1.492-.604 0-.964.407-1.121.8-.058.143-.073.342-.073.541v3.669h-2.544s.033-5.955 0-6.458h2.544v.914c.338-.52.938-1.263 2.286-1.263 1.667 0 2.918 1.086 2.918 3.428v3.379z"
          ></path>
        </svg>
      </a>
    </nav>
  </footer>
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
