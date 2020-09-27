<template>
  <div>
    <div class="lava-logo"/>
    <div class="text-center">
      Welcome to Project Lava!
    </div>
    <p>This is a web control panel for DCS: Project Lava backend application.</p>
  </div>
</template>

<script>
  export default {
    name: 'Home',

    data() {
      return {
        image: "'../assets/green_bat.png'",
      }
    }
  }
</script>

<style lang="scss" scoped>
  $imageSize: 200px;

  .lava-logo {
    margin: 20px auto;
    width: $imageSize;
    height: $imageSize;
    background: url("~@/assets/lava-logo.svg") center center no-repeat;
    background-size: $imageSize auto;
  }
</style>
