<template>
  <div class="word-item card">
    <template v-if="visible">
      <span class="word-item__value">{{ wordValue }}</span>
    </template>
    <template v-else>
      <input
        v-model="userWord"
        type="text"
        maxlength="30"
        class="word-item__input"
        :class="{ 'word-item__input--correct': isCorrect }"
        @blur="saveUserGuess"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'WordItem',
  props: {
    wordValue: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    userWord: '',
    isCorrect: false
  }),
  methods: {
    saveUserGuess() {
      this.$emit('word', this.userWord, this.$vnode.key)
    }
  }
}
</script>

<style lang="scss" scoped>
.word-item {
  padding: 16px;
  &__input {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    font-family: 'Josefin';
    &:focus {
      border: none;
      outline: none;
    }
    &--correct {
      color: #00ab41;
    }
  }
}
</style>
