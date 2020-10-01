<template>
  <div>
    <h3>DCS Map Test Page</h3>
    <div></div>
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js';
  import test from '@/assets/eraser.png';

  export default {
    name: "MapControl",

    mounted() {
      const app = new PIXI.Application({ backgroundColor: 0x1099bb });
      this.$el.appendChild(app.view);

      // create a new Sprite from an image path
      const bunny = PIXI.Sprite.from(test);

      // center the sprite's anchor point
      bunny.anchor.set(0.5);

      // move the sprite to the center of the screen
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;

      app.stage.addChild(bunny);

      // Listen for animate update
      app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        bunny.rotation += 1 * delta;
      });

      app.renderer.backgroundColor = 0xd8d8d8;
    }
  }
</script>

<style scoped>

</style>