<template>
  <div class="wrapper">
    <NavBar transparent />
    <div class="wrapper__content">
      <Nuxt />
    </div>
    <FooterBlock straight />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBlock from '@/components/elements/FooterBlock'

export default {
  components: { NavBar, FooterBlock }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  min-height: 100vh;
  background: #fffade;
  background: linear-gradient(
    153deg,
    rgba(255, 250, 222, 0.969625350140056) 0%,
    rgba(255, 250, 222, 0.6951155462184874) 43%,
    rgba(64, 6, 105, 0.6110819327731092) 100%
  );
  .navbar {
    background: none;
  }
  .page {
    min-height: calc(100vh - 200px);
  }
}
</style>
