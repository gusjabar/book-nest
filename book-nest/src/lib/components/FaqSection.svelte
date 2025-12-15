<script lang="ts">
  import { Button, FaqItem } from "$components";
  import Icon from "@iconify/svelte";
  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Suspendisse molestie lorem vel ligula ornare, sit amet iaculis neque scelerisque.",
    },
    {
      question: "Cras viverra mauris at eleifend suscipit.",
      answer:
        "Aenean at turpis aliquet, luctus ipsum hendrerit, efficitur arcu.",
    },
    {
      question: "Proin ornare erat nec dolor egestas sagittis.",
      answer:
        "Nam ornare orci non dolor tincidunt, ullamcorper consequat eros maximus.",
    },
    {
      question:
        "Aenean molestie lorem venenatis, luctus nisl sit amet, condimentum ipsum.",
      answer: "Morbi non urna gravida, fermentum mauris nec, tincidunt odio.",
    },
    {
      question: "Cras mattis dolor at velit sodales, at egestas ex tincidunt.",
      answer:
        "Proin vel nunc nec tellus porta ultrices sit amet malesuada odio.",
    },
  ];
  let questionCurrentlyExpanded = $state<Number>(-1);

  function toggle(index: number) {
    questionCurrentlyExpanded =
      questionCurrentlyExpanded === index ? -1 : index;
  }
</script>

<section class="landing-page-section">
  <h2 class="mb-l">Frequently asked questions</h2>
  <div class="faq-container">
    {#each faqs as faq, index}
      <FaqItem
        {faq}
        isExpanded={index === questionCurrentlyExpanded}
        onclick={() => toggle(index)}
      />
    {/each}
  </div>
  <div class="additional-info mt-m">
    <Button class="mt-s">BUY NOW</Button>
    <p class="mt-m">Any other questions?</p>
    <a href="#">
      <p>
        Hit me up on <Icon
          icon="streamline-logos:macos-osx-logo-block"
          width="16"
          height="16"
          style="color: #a20f0f"
        />
      </p>
    </a>
  </div>
</section>

<style>
  .additional-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: gray;
  }
  a {
    text-decoration: underline;
  }
</style>
