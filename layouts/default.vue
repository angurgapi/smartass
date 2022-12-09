<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <Nuxt />
    </div>
 
  </div>
</template>

<script>


import NavBar from '@/components/NavBar.vue'


export default {
  components: { NavBar },
}
</script>

<style lang="scss">
.wrapper {
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);
  
}
</style>
