<template>
  <div class="navbar">
    <nuxt-link class="navbar__link" to="/">home</nuxt-link>
    <nuxt-link class="navbar__link" to="/riddle">pairs</nuxt-link>
  </div>
</template>

<style lang="scss">
.navbar {
  height: 60px;
  padding: 20px;
  &__link {
    font-size: 20px;
    color: #fff;
    letter-spacing: 0.6px;
    margin-right: 20px;
  }
}
</style>
