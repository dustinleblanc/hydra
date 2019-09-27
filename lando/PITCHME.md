---?image=https://www.needpix.com/photo/download/162909/hippos-africa-safari-animal-wildlife-wild-zoology-mammal-species&opacity=50

# LocalDev, Lando, and the Local Development Landscape Safari

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

## The Four Main Trails

@ul
- Hosting provider based solutions
- Custom portable environments
- Bespoke environments
- Minimalist environments
@ulend

---

### Hosting Provider based solutions

Pros:
@ul
- Easy Setup
- Designed for Production parity(ish)
- Maintained by orgs with a vested interest in success
@ulend

Cons:

@ul
- Limited feature set
- Rigid configuration
- Vendor lock-in
@ulend

---

### Custom Portable Environments

Pros:
@ul
- Sharable config across whole team
- Highly configurable
- Able to handle complex setups, but provide a simple interface
@ulend

Cons:
@ul
- Often open source with best effort support
- Often require config to get the most out of them
- Often have performance issues due to virtualization overhead
@ulend

---

### Bespoke Custom Setups

Pros:
@ul
- Configure just how you like it
- Able to tune it to be super performant
- Often less time overall to configure
@ulend

Cons:
@ul
- Very difficult to replicate and share
- Changes to software are hard to maintain
- Difficult to handle complex environments
@ulend

---

### Minimalist Setup

Pros:
@ul
- Easy to setup
- Often quite performant and light on resources
- Often portable
@ulend

Cons:
@ul
- Difficult to handle complex environments
- Hard to share
- May lack features you need to test on occasion
@ulend

---

## Examples

---

### Hosting Provider Based

@ul
- Pantheon LocalDev
- Acquia Dev Desktop
@ulend

---

### Custom Portable

@ul
- Lando
- DrupalVM
- DDev
- Docksal
- Laravel Homestead
@ulend

---

### Bespoke

@ul
- ...
- That thing your friend setup once that you've been copying
- Apache/MySQL available in your OS or via package managers
@ulend

---

### Minimalist

@ul
- 'drush runserver'
- Laravel Valet
@ulend

---
