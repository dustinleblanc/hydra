<template>
  <div class="lg:w-1/3 md:w-1/2 sm:w-full p-4 flex flex-grow justify-center">
    <div
      class="rounded overflow-hidden shadow-lg flex flex-grow flex-col
      bg-gray-100"
    >
      <img class="w-full" :src="recipe.image.src" :alt="recipe.image.alt" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ recipe.attributes.title }}</div>
        <div
          class="text-gray-700 text-base"
          v-html="recipe.attributes.summary.value"
        />
      </div>
      <div class="px-6 py-4">
        <p class="font-bold">Cooking Time</p>
        <p>{{ recipe.attributes.cookingTime }} min</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRecipeCardVue',
  props: {
    recipe: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
