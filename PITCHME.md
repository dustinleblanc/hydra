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

- Has a majority of the useful modules for decoupled pre-installed
- Pre-configured for Headless Drupal

---

### Why NuxtJS?

- Vue is Awesome!
- Routing, Axios, and other common stuff already figured out.

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

