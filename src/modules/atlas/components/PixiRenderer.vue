<template>
  <div class="pixi-renderer">
    <canvas ref="renderCanvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js';
  import Vue from 'vue';

  export default {
    name: "PixiRenderer",

    data() {
      return {
        PIXIWrapper: {
          // Expose PIXI and the created app to all descendants.
          PIXI,
          PIXIApp: null,
        },
        // Expose the event bus to all descendants so they can listen for the app-ready event.
        EventBus: new Vue()
      }
    },

    provide() {
      return {
        PIXIWrapper: this.PIXIWrapper,
        EventBus: this.EventBus
      }
    },

    mounted() {
      // Determine the width and height of the renderer wrapper element.
      const renderCanvas = this.$refs.renderCanvas;
      const w = renderCanvas.offsetWidth;
      const h = renderCanvas.offsetHeight;

      // Create a new PIXI app.
      this.PIXIWrapper.PIXIApp = new PIXI.Application(
          { width: w, height: h, antialias: true, transparent: false});

      this.EventBus.$emit('ready');
    }
  }
</script>

<style lang="scss" scoped>

</style>