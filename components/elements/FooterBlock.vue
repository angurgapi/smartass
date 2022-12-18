<template>
  <div class="footer" :class="{ 'footer--landing': landing }">
    <svg
      class="footer__svg"
      width="100%"
      height="100"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
    </svg>
    <div class="footer__content f-row">
      <p class="footer__disclaimer">© smartass - Boost your brain power</p>
      <button class="footer__up f-col" @click="scrollTop">
        <svg-icon name="up" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBlock',
  props: {
    landing: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100px;
  margin-top: 50px;
  &__content {
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-gap: 18px;
    padding: 20px;
  }

  &__up {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 1px 8px 19px 1px rgba(96, 100, 103, 0.2);
    transition: 0.3s all ease-in-out;
    &:hover {
      box-shadow: 1px 8px 19px 0px rgba(96, 100, 103, 0.39);
    }
    svg {
      height: 30px;
      width: 30px;
      fill: #fffade;
    }
    background: #12002e;
  }

  &--landing {
    .footer__content {
      background: #12002e;
    }
    .footer__disclaimer {
      color: #fff;
    }
    .footer__svg {
      fill: #12002e;
    }
    .footer__up {
      background: #fffade;
      box-shadow: 1px 2px 26px 4px rgba(253, 253, 253, 0.19);
      &:hover {
        box-shadow: 1px 2px 26px 4px rgba(253, 253, 253, 0.35);
      }
      svg {
        fill: #12002e;
      }
    }
  }
  &__content {
    height: 100%;
    margin-top: -7px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__disclaimer {
    text-align: center;
    font-size: 16px;
  }
  &__svg {
    fill: #fff;
  }
}
</style>
