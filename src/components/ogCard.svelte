<script lang="ts">
  export let title = 'Hello, world!';
  export let description = 'This is a description';
</script>

<div class="container">
  <h2 class="title">
    {title}
  </h2>
  <div class="website">
    {description}
  </div>
</div>

<style>
  @font-face {
    font-family: 'InterMedium';
    src: url('/fonts/InterDisplay-Medium.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  .container {
    font-family: 'InterMedium', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    padding: 25px;
    background-color: #121212;
    color: #f9f9f9;
  }

  .title {
    font-size: 19px;
    font-weight: 600;
    opacity: 0.5;
  }

</style>
