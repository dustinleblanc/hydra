<template>
  <div class="mx-auto p-12 container">
    <h1 class="text-3xl font-bold">Hey This is the fallback page!</h1>
    <p>
      The file is located at
      <code class="font-mono text-pink-600 p-1 bg-gray-400 rounded"
        >~/pages/_.vue</code
      >
      and is used as a wildcard route loader. If another route in your app
      doesn't serve, Nuxt will try this one as a fallback. In Drupal land, its
      great for handling random path aliases and trying to load a page for them.
      Be careful though! You will also need to do you own error handling if you
      use this tool.
    </p>
    <p class="mb-4">Here is the request info from Drupal:</p>
    <pre class="overflow-auto rounded bg-gray-900 text-pink-400 p-6">{{
      responseData
    }}</pre>
    <p class="my-4">And here is the entity that was resolved:</p>

    <pre class="overflow-auto rounded bg-gray-900 text-pink-400 p-6">{{
      entity
    }}</pre>
  </div>
</template>

<script>
export default {
  asyncData({ app, route }) {
    return app.$axios
      .get(`/router/translate-path?path=${route.path}`)
      .then((response) => {
        const responseData = response.data
        return app.$axios.get(response.data.jsonapi.individual).then((data) => {
          return {
            responseData,
            entity: data.data
          }
        })
      })
  }
}
</script>
