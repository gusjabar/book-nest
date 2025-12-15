<script lang="ts">
  import authPic from "$assets/profile-pic.jpeg";
</script>

<section class="landing-page-section">
  <h2 class="mb-l">About the author</h2>
  <div class="author-container">
    <div class="author-text">
      <p class="mb-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan
        tincidunt ligula sed posuere. Ut non lacus blandit odio laoreet
        efficitur vitae non urna. Nunc efficitur viverra libero. Proin eu porta
        tortor.
      </p>
      <p>
        Aliquam elementum luctus purus, eu mollis lorem iaculis dapibus. Fusce
        bibendum tempus nibh, vitae condimentum orci molestie eget. Sed at orci
        at justo mattis scelerisque. Ut a enim pretium, vestibulum odio quis,
        lobortis sem. Nunc eget sem ante. Etiam ut libero sed odio fermentum
        tempor ut vitae dolor. Suspendisse vulputate nisl massa, a varius ante
        rutrum ut. Suspendisse nec magna lacus. Pellentesque in sem ultricies,
        interdum diam vel, mollis odio. Cras ac justo cursus, rutrum ligula nec,
        viverra risus. Quisque tortor odio, imperdiet at interdum in, bibendum
        in risus. Ut convallis dolor et tellus commodo dignissim. Duis a dictum
        enim. Donec vitae risus elementum, efficitur erat eu, efficitur orci.
      </p>
    </div>
    <img src={authPic} alt="Adri" />
  </div>
</section>

<style>
  .author-container {
    display: flex;
    justify-content: space-between;
  }
  .author-container img {
    width: 40%;
    border: 6px solid black;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  }
  .author-text {
    width: 55%;
  }
</style>
