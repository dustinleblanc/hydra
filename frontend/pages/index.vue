<template>
  <div class="container mx-auto flex flex-wrap align-center justify-center">
    <app-recipe-card
      v-for="(recipe, index) in recipes"
      :key="index"
      :recipe="recipe"
    ></app-recipe-card>
  </div>
</template>

<script>
import { map } from 'lodash'
import AppRecipeCard from '~/components/AppRecipeCard'
export default {
  components: { AppRecipeCard },
  asyncData({ app }) {
    // test.
    return app.$axios
      .get(
        '/api/recipes?fields[recipes]=title,summary,cookingTime,image&include=image.imageFile'
      )
      .then((response) => {
        const recipes = map(response.data.data, (recipe) => ({
          attributes: recipe.attributes,
          image: app.$buildImg(
            response.data,
            recipe,
            'image',
            'recipe_list_350_300'
          )
        }))
        return { response: response.data, recipes }
      })
  }
}
</script>

<style></style>
