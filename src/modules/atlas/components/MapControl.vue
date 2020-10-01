<template>
  <div>
    <h3>DCS Map Test Page</h3>
    <div></div>
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js'

  export default {
    name: "MapControl",

    mounted() {
      const app = new PIXI.Application({width: 512, height: 512});
      this.$el.appendChild(app.view);

      let message = new PIXI.Text("Banana Pixi!");
      app.stage.addChild(message);

      const bunny = PIXI.Sprite.from('cat.png');
      bunny.anchor.set(0.5);
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;

      app.stage.addChild(bunny);

      let rectangle = new PIXI.Graphics();
      rectangle.lineStyle(4, 0xFF3300, 1);
      rectangle.beginFill(0x66CCFF);
      rectangle.drawRect(0, 0, 64, 64);
      rectangle.endFill();
      rectangle.x = 170;
      rectangle.y = 170;
      app.stage.addChild(rectangle);

      app.renderer.backgroundColor = 0xd8d8d8;
    }
  }
</script>

<style scoped>

</style>