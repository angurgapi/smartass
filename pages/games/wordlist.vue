<template>
  <div class="page">
    <h2 class="page__title">Word list</h2>

    <template v-if="isListVisible">
      <p class="page__description">
        Memorize as many words as possible <br />
        and write them down after 2 minutes pass
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
      <WordItem
        v-for="(word, index) in wordList"
        :key="index"
        :ref="`word-${index}`"
        :wordValue="word"
        :visible="isListVisible"
        @word="checkWord"
      />
    </div>
    <div class="game__controls">
      <Timer
        ref="timer"
        stopAt="120"
        :on="isTimerOn"
        @timeout="isListVisible = false"
      />
      <button class="btn btn--primary" @click="changeStage">
        {{ getBtnText }}
      </button>
    </div>
  </div>
</template>

<script>
import WordItem from '@/components/memo/WordItem'

export default {
  name: 'WordList',
  components: { WordItem },
  layout: 'game',
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
    ],
    userWords: []
  }),
  computed: {
    getBtnText() {
      return this.isListVisible ? 'I memorized' : 'Restart'
    }
  },
  methods: {
    checkWord(word, key) {
      if (
        this.wordList.includes(word.toLowerCase()) &&
        !this.userWords.includes(word.toLowerCase())
      ) {
        this.userWords.push(word.toLowerCase())
        this.$refs[`word-${key}`][0].isCorrect = true
      }
    },
    changeStage() {
      this.isListVisible = !this.isListVisible
      this.isTimerOn = !this.isTimerOn
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
  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, 110px);
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 90px);
    grid-gap: 6px;
    font-size: 18px;
    .word-item {
      padding: 6px;
    }
  }

  &__hint {
    font-size: 18px;
    margin-top: 6px;
    opacity: 0.8;
    color: #fff;
    text-align: center;
  }
}
</style>
