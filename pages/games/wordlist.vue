<template>
  <div class="page">
    <h2 class="page__title">Word list</h2>

    <template v-if="isListVisible">
      <p class="page__description">
        Memorise as many words as possible <br />
        and right them down after 2 minutes pass
      </p>
    </template>
    <template v-else>
      <p class="page__description">
        Time's out!<br />Let's check what you remember
      </p>
      <span class="word-list__hint"
        >Fill in inputs regardless of word order</span
      >
    </template>
    <div class="word-list">
      <div
        v-for="(word, index) in wordList"
        :key="index"
        class="word-list__card card"
      >
        <template v-if="isListVisible"> {{ word }}</template>
        <template v-else>
          <input type="text" class="word-list__input" @blur="checkWord" />
        </template>
      </div>
    </div>
    <Timer stopAt="20" :on="isTimerOn" @timeout="isListVisible = false" />
  </div>
</template>

<script>
import Timer from '@/components/elements/Timer'

export default {
  name: 'WordList',
  components: { Timer },
  data: () => ({
    isListVisible: true,
    isTimerOn: false,
    wordList: [
      'sand',
      'hope',
      'degree',
      'farm',
      'tennis',
      'iron',
      'mountain',
      'view',
      'room',
      'plain',
      'blood',
      'chance',
      'dream',
      'subject',
      'laughter',
      'crystal',
      'figure',
      'week',
      'noise',
      'space',
      'tea',
      'voice',
      'goat',
      'card',
      'carrot',
      'age',
      'engine',
      'example',
      'ring',
      'boot'
    ]
  }),
  methods: {
    checkWord(e) {
      console.log(e.target.value)
      if (this.wordList.includes(e.target.value)) {
        e.target.classList.add('correct')
      }
    }
  },
  mounted() {
    this.isTimerOn = true
  }
}
</script>

<style lang="scss" scoped>
.word-list {
  margin: 40px auto;
  display: grid;
  width: 100%;
  max-width: 1000px;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 16px;
  justify-content: center;
  &__card {
    padding: 16px;
  }
  &__hint {
    font-size: 18px;
    margin-top: 6px;
    opacity: 0.8;
    color: #fff;
    text-align: center;
  }

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
  }
}

.correct {
  color: #07782f;
}
</style>
