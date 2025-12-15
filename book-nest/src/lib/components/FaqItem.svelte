<script lang="ts">
  import Icon from "@iconify/svelte";

  let { faq, isExpanded = false, ...props } = $props();
</script>

<button
  class="container"
  class:expanded={isExpanded}
  aria-expanded={isExpanded}
  type="button"
  {...props}
>
  <div class="qa">
    <p class="question">{faq.question}</p>
    <p class="answer" class:open={isExpanded}>
      {faq.answer}
    </p>
  </div>

  <span class="arrow" class:open={isExpanded}>
    <Icon icon="ic:baseline-keyboard-arrow-down" />
  </span>
</button>

<style>
  .container {
    width: 100%; /* ✅ equal width */
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid gray;
    text-align: left;
  }

  .qa {
    flex: 1; /* ✅ take remaining space */
    min-width: 0; /* ✅ allows wrapping instead of overflow */
  }

  .question {
    font-weight: 600;
    margin: 0;
  }

  .answer {
    margin: 0;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition:
      max-height 300ms ease-out,
      opacity 200ms ease-out;
  }

  .answer.open {
    max-height: 500px;
    opacity: 1;
  }

  .arrow {
    width: 32px;
    height: 32px;
    flex: 0 0 32px; /* ✅ fixed arrow column */
    display: inline-flex;
    transition: transform 250ms ease;
    transform-origin: center;
  }

  .arrow.open {
    transform: rotate(180deg); /* ✅ up when open */
  }

  .arrow :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
