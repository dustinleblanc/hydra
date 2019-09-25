<template>
  <div class="mx-auto p-12 container">
    <h1 class="text-3xl font-bold">Hey This is the fallback page!</h1>
    <p class="mb-4">Here is the request info from Drupal:</p>
    <pre class="overflow-auto rounded bg-gray-900 text-pink-400 p-6">{{
      data
    }}</pre>
  </div>
</template>

<script>
export default {
  asyncData({ app, route }) {
    return app.$axios
      .get(`/router/translate-path?path=${route.path}`)
      .then((response) => ({ data: response.data }))
  }
}
</script>
