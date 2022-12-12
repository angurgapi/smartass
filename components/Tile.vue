<template>
  <div class="tile" :class="{ invisible: nailed }" @click="$emit('click')">
    <transition name="flip">
      <div :key="revealed" class="tile__inner">
        <template v-if="revealed">
          <div class="tile__front">
            <span class="tile__tooltip">{{ getTooltipValue }}</span>
            <img class="tile__picture" :src="`/art/${img}.webp`" />
          </div>
        </template>
        <template v-else>
          <div class="tile__back">
            <img src="/cover.png" />
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true
    },
    revealed: {
      type: Boolean,
      default: false
    },
    nailed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getTooltipValue() {
      return this.img.split('_').join(' ')
    }
  }
}
</script>

<style lang="scss">
.tile {
  display: flex;
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  will-change: transform;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;

  &:hover {
    box-shadow: 4px 4px 8px 3px rgba(0, 0, 0, 0.2);
  }

  &__inner,
  &__front,
  &__back {
    width: 100%;
    height: 100%;
  }

  &__front {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      .tile__tooltip {
        visibility: visible;
      }
    }
  }

  &__tooltip {
    visibility: hidden;
    position: absolute;
    opacity: 0.8;
    z-index: 100;
    background: #fff;
    border-radius: 6px;
    padding: 6px;
  }

  &__picture {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__back {
    background-color: #75959c;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      opacity: 0.6;
      height: auto;
      width: 60%;
    }
  }
}
.invisible {
  visibility: hidden;
}

.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter,
.flip-leave {
  transform: rotateY(180deg);
  opacity: 0;
}
</style>
