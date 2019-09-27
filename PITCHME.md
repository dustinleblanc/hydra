---?image=assets/LonelyMountain.jpg&opacity=20
# There and Back Again

@css[text-blue](A Headless Tale)


---

Hi, I'm Dustin @emoji[wave]

![PIC](assets/me.jpg)

- @DustinLeblanc on Twitter
- @dustinleblanc on Drupal.org...and pretty much everywhere else

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

### Translating a path to the proper Drupal entity

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
@[2, zoom-17](Call the axios library provided by Nuxt plugin)
@[3, zoom-17](Hit the decoupled router and give it the current path to translate)
@[6-11, zoom-17](Use the router response to call the API again and get the node/etc, then prep it for display)
@snapend
