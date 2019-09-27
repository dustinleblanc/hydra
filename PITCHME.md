---?image=assets/LonelyMountain.jpg&opacity=20
# There and Back Again

@css[text-blue](A Headless Tale)


---

Hi, I'm Dustin @emoji[wave]

![PIC](assets/me.jpg)

@ul
- @DustinLeblanc on Twitter
- @dustinleblanc on Drupal.org...and pretty much everywhere else
- Senior Software Engineer @ Tandem
- Co-Maintainer of Lando
@ulend

---

## Overview

- Architecture / Setup
- Handling Common Gotchas
- Alternatives

---

## The Setup

- ContentaCMS Backend
- NuxtJS Frontend

---

### Why Contenta?

@ul
- Has a majority of the useful modules for decoupled pre-installed
- Pre-configured for Headless Drupal
@ulend

---

### Why NuxtJS?

@ul
- Vue is Awesome!
- Routing, Axios, and other common stuff already figured out.
@ulend

---

## Local Development

We're using Lando to set this up

```yaml
name: hydra
recipe: drupal8
config:
  webroot: drupal/web
```

@snap[south span-100 text-08]
@[1, zoom-17](The name of the app)
@[2, zoom-17](Using the D8 recipe as the default)
@[3-4, zoom-17](Set the webroot to the nested Drupal directory)
@snapend

---

### Getting Nuxt Running in the Same App

```yaml
services:
  frontend:
    type: node
    command: cd /app/frontend && yarn dev --hostname=0.0.0.0 --port=80
    overrides:
      environment:
        API_URL: hydra.lndo.site
    build:
      - cd /app/frontend && yarn
```
@snap[south span-100 text-08]
@[1-3, zoom-17](Add a container to run the JS frontend)
@[4, zoom-17](Boot Nuxt in dev mode, expose to any host on port 80)
@[5-7, zoom-17](Tell Nuxt where to find our API site)
@[8-9, zoom-17](Get dependencies on startup to make the experience smooth for devs)
@snapend

---

## 99 Problems
@ul
- Routing
- Image Styles
- SEO
- Authentication / Authorization
@ulend

---

### Routing

TL;DR - Install the Decoupled Router module (included with contenta)

---

#### Translating a path to the proper Drupal entity

```javascript
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
```

@snap[south span-100 text-08]
@[2, zoom-7](Call the axios library provided by Nuxt plugin)
@[3, zoom-7](Hit the decoupled router and give it the current path to translate)
@[6-11, zoom-7](Use the router response to call the API again and get the node/etc, then prep it for display)
@snapend

---

##### Fallback Path: _.vue

@ul
- Wildcard loads for any routes you haven't explicitly defined
- Warning: You lose some error handling tools from Nuxt
@ulend

---

### Image Styles

TL;DR - Use the Consumer Image Styles module.

---

```javascript
asyncData({ app }) {
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
```
@snap[south span-100 text-08]
@[4](Make sure to call &include=media_field_name.file_field_name)
@[9-14](Custom function in custom plugin to do the ugly work)
@snapend

---

Blech. A bit ugly, but we do what we must...

```javascript
// ~/plugins/drupal-api/lib/media.js
buildImg(
  topLevelResponse = {},
  entity = null,
  relationship = 'field_image',
  imageStyle = 'thumbnail',
  fallback = {}
) {
  const media = find(
    get(topLevelResponse, 'included'),
    (include) =>
      get(include, 'id') ===
      get(entity, `relationships.${relationship}.data.id`)
  )
  const file = find(
    get(topLevelResponse, 'included'),
    (include) =>
      get(include, 'id') === get(media, `relationships.imageFile.data.id`)
  )
  return {
    src: get(file, `links.${imageStyle}.href`),
    // @todo: Replace this with real alt meta if available.
    alt: get(file, 'attributes.filename')
  }
}
```
@snap[south span-100 text-08]
@[9-14](Retrieve the 'media' entity that is referenced on the node)
@[15-19](Retrieve the 'file' entity that is referenced on the media item)
@[20-24](Return an object that can be consumed by Vue using the image style data)
@snapend

---

### SEO - Metatags

@ul
- Use the vue meta stuff built into Nuxt
- Use metatags in Drupal and fetch that info in Nuxt
@ulend

---

### Authentication / Authorization

@ul
- Good luck
- Hope you don't need it
@ulend

---
