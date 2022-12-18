<template>
  <div class="landing page">
    <div class="landing__content f-col">
      <section class="landing__reasons">
        <div class="landing__inner">
          <h2>Why even bother?</h2>
          <ReasonCard
            v-for="(reason, index) in reasons"
            :key="index"
            class="landing__reason"
            :card="reason"
          />
        </div>
      </section>
      <section class="landing__offer">
        <div class="landing__inner">
          <h2>What's on the table</h2>
          <lottie-player
            src="/lottie/brain-bulb-with-gears.json"
            class="landing__animation"
            loop
            autoPlay
          />

          <p>
            Brain fitness is just like pilates or morning jogging: you succeed
            after <span class="highlighted">continious practice</span>.<br />
            If you're ready to try, we offer several kinds of exercises.<br />
            Some of them are inspired by good old children
            <span class="highlighted">games</span>. Some are borrowed from the
            system developed by Ryuta Kawashima, a japanese
            <span class="highlighted">neuroscientist</span>.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ReasonCard from '../components/elements/ReasonCard.vue'

export default {
  name: 'IndexPage',
  components: { ReasonCard },
  layout: 'index',
  data: () => ({
    reasons: [
      {
        icon: 'memory',
        content:
          'Do you often catch yourself <span class="highlighted">forgetting things</span>?<br/><span class="details">Memory training is the best pill there is.</span>'
      },
      {
        icon: 'anxiety',
        content:
          '<span class="highlighted">Fight anxiety</span><br/><span class="details">A fit mind is more likely to win over desctructive thoughts.</span>'
      },
      {
        icon: 'decision',
        content:
          'Faster <span class="highlighted">decision-making</span><br/><span class="details">Navigate through life and perform better as a professional.</span>'
      },
      {
        icon: 'brain',
        content:
          'Build more <span class="highlighted">neural pathways</span><br/><span class="details">Reduce the risk of dementia, make your future easier.</span>'
      },
      {
        icon: 'networking',
        content:
          'Improve <span class="highlighted">communication</span><br/><span class="details">Interact with people more efficiently having a well-focused mind.</span>'
      }
    ]
  }),
  head: {
    script: [
      {
        src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
        rel: 'preload'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff !important;
}
.landing {
  padding-bottom: 40px;

  section {
    width: 100%;
    justify-content: center;
    display: flex;
  }
  &__content {
    margin-top: 20px;
    color: #12002e;
    width: 100%;

    h2 {
      text-align: center;
    }
  }
  &__inner {
    max-width: 800px;
    width: 100%;
    margin: auto;
  }

  &__offer {
    padding: 24px;
    border-radius: 8px;
    margin-top: 80px;
    // background-color: #c5d3eb;
    user-select: none;
    background: linear-gradient(
      180deg,
      rgba(106, 152, 153, 1) 0%,
      rgba(255, 250, 222, 1) 100%
    );
    p {
      font-size: 1.6rem;
    }
  }
}
</style>
