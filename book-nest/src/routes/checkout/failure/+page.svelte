<script lang="ts">
  import { HeroSection } from "$components";
  import Button from "$components/Button.svelte";
</script>

<HeroSection>
  <div class="content">
    <h1>Error while processing your payment</h1>
    <p>Please try again or contact support if the issue persists.</p>
  </div>
  <Button>Try Again!</Button>
</HeroSection>
