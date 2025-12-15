<script lang="ts">
  let { children, ...props } = $props();
</script>

<button {...props}>{@render children()}</button>

<style>
  a {
    display: block;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  .btn {
    padding: 12px 24px;
    min-width: 230px;
    text-align: center;
    background-color: black;
    border-radius: 12px;
    color: white;
    border: 1px solid white;
    font-weight: normal;
    font-size: 22px;
  }

  .btn-secondary {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  .btn-danger {
    background-color: rgb(136, 4, 4);
  }

  .btn-menu {
    min-width: 150px;
    padding: 8px 20px;
  }
  button {
    background-color: black;
    color: white;
    padding: 12px 24px;
    font-size: 22px;
    text-transform: uppercase;
    transition: all 0.5s;
    border: 1px solid white;
  }

  button:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }
</style>
