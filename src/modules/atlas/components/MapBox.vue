<script>
  import * as PIXI from 'pixi.js';
  import { TileMetaData } from "@/modules/atlas/TileMetaData";
  import test from './cat.png';

  export default {
    name: "MapBox",

    // eslint-disable-next-line no-unused-vars
    render() {
      return <div onWheel={this.zoomLevelChange} />
    },

    data() {
      return {
        viewWidth: 1500,
        viewHeight: 900,

        app: '',
        testTile: new PIXI.Sprite(),
        manager: '',

        metaData: new TileMetaData(),

        zoom: 1,
        zoomMax: 16,
        zoomMin: 1,

        dragging: false,

        data: '',
        alpha: 1,

        tiles: [],

        timeout: '',
      }
    },

    created() {
      this.app = new PIXI.Application({
        width: this.viewWidth, height: this.viewHeight, backgroundColor: 0x1099bb, transparent: true
      })
    },

    mounted() {
      this.$el.appendChild(this.app.view);

      let tileData = [
        // 255, 0, 0, 255,      0, 255, 0, 255,      0, 0, 255, 255,      255, 255, 255, 255,
      ];

      for (let i = 0; i < 256 * 256; i++) {
        tileData.push(Math.floor(Math.random() * 255));
        tileData.push(Math.floor(Math.random() * 255));
        tileData.push(Math.floor(Math.random() * 255));
        tileData.push(100);
      }

      let texture = PIXI.Texture.fromBuffer(new Float32Array(tileData), 256, 256);

      this.testTile = new PIXI.Sprite(texture);

      // calculate how many tiles need to be added to the stage
      const rows = Math.ceil(this.viewWidth / 256);
      const cols = Math.ceil(this.viewHeight / 256);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const t = // new PIXI.Sprite(texture);
          PIXI.Sprite.from(test)
          t.width = 256;
          t.height = 256;
          t.interactive = true;
          // t.anchor.set(0.5);
          t.x = 256 * i;
          t.y = 256 * j;
          this.tiles.push(t);
        }
      }




      this.testTile.interactive = true;
      this.testTile.anchor.set(0.5);

      this.testTile.on('pointerdown', this.onDragStart)
          .on('pointerup', this.onDragEnd)
          .on('pointerupoutside', this.onDragEnd)
          .on('pointermove', this.onDragMove);


      // this.testTile.on('pointerdown', event => {
      //   this.$message.info(event.data.originalEvent.layerX + ', ' + event.data.originalEvent.layerY);
      //
      //   console.log(
      //       this.app.renderer.plugins.interaction.mouse.originalEvent.layerX + ', ' +
      //       this.app.renderer.plugins.interaction.mouse.originalEvent.layerY);
      // })

      this.app.stage.addChild(this.testTile);

      this.tiles.forEach(t => {
        t.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            // .on('pointermove', this.onDragMove);
      })

      this.tiles.forEach(t => this.app.stage.addChild(t));


      this.testTile.x = 128;
      this.testTile.y = 128;
    },

    methods: {
      debounce(func, wait, immediate) {
        let timeout;
        return function() {
          let context = this, args = arguments;
          let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          let callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      },


      onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
      },

      onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
      },

      /**
       * When moving the map, it is necessary to check whether new tiles needs to be loaded.
       *
       * Check for map border
       *
       * @param any
       */
      onDragMove(any) {
        if (this.dragging) {
          // console.log(any.data.originalEvent);
          let { movementX, movementY } = any.data.originalEvent;

          this.testTile.x += movementX * 1;
          this.testTile.y += movementY * 1;

          this.tiles.forEach(t => t.x += movementX);  // apply transition to each tile
          this.tiles.forEach(t => t.y += movementY);

          const leftCheck = Math.min(...this.tiles.map(t => t.x));
          const topCheck = Math.min(...this.tiles.map(t => t.y));

          this.tiles.filter(t => !this.checkInView(t)).forEach(t => {

            // move the sprites not in view to the other side of the view instead of removing them
            t.x +=
            this.app.stage.removeChild(t);
          });  // remove sprites that are not in the view

          this.tiles = this.tiles.filter(this.checkInView);  // update tiles to only keep what is in view


          if (leftCheck > 0) {
            // this.$message.info("add new tile to the left starting at " + leftCheck + ',' + topCheck);
            for (let i = 0; i < Math.ceil(this.viewHeight / 256); i++) {
              const t = PIXI.Sprite.from(test)
              t.width = 256;
              t.height = 256;
              t.interactive = true;
              t.on('pointerdown', this.onDragStart)
                  .on('pointerup', this.onDragEnd)
                  .on('pointerupoutside', this.onDragEnd)
              // t.anchor.set(0.5);
              t.x = leftCheck - t.width;
              t.y = topCheck + 256 * i;
              this.tiles.push(t);
              this.app.stage.addChild(t);
            }
          }

          if (topCheck > 0) {
            // this.$message.info("add new tile to the top");
            for (let i = 0; i < Math.ceil(this.viewWidth / 256); i++) {
              const t = PIXI.Sprite.from(test)
              t.width = 256;
              t.height = 256;
              t.interactive = true;
              t.on('pointerdown', this.onDragStart)
                  .on('pointerup', this.onDragEnd)
                  .on('pointerupoutside', this.onDragEnd)
              // t.anchor.set(0.5);
              t.x = leftCheck + 256 * i;
              t.y = topCheck - t.height;
              this.tiles.push(t);
              this.app.stage.addChild(t);
            }
          }

          // check the tile with smallest y value
          // if y > 0, add new tile



          // const newPosition = this.data.getLocalPosition(this.testTile.parent);
          // this.testTile.x = newPosition.x;
          // this.testTile.y = newPosition.y;
        }
      },

      getLayerMousePosition() {
        const mouse = this.app.renderer.plugins.interaction.mouse.originalEvent;
        return { x: mouse.layerX, y: mouse.layerY }
      },

      refresh() {
        let tileData = [
          // 255, 0, 0, 255,      0, 255, 0, 255,      0, 0, 255, 255,      255, 255, 255, 255,
        ];

        for (let i = 0; i < 256 * 256; i++) {
          tileData.push(Math.floor(Math.random() * 255));
          tileData.push(Math.floor(Math.random() * 255));
          tileData.push(Math.floor(Math.random() * 255));
          tileData.push(255);
        }

        this.testTile.texture = PIXI.Texture.fromBuffer(new Uint8Array(tileData), 256, 256);

        this.tiles.map(t => {
          t.texture = PIXI.Texture.fromBuffer(new Uint8Array(tileData), 256, 256)
        })


        // // create a new Sprite from an image path
        // const bunny = PIXI.Sprite.from(test);
        //
        // // center the sprite's anchor point
        // bunny.anchor.set(0.5);
        //
        // // move the sprite to the center of the screen
        // bunny.x = this.app.screen.width / 2;
        // bunny.y = this.app.screen.height / 2;
        //
        // this.app.stage.addChild(bunny);
        //
        // // Listen for animate update
        // this.app.ticker.add((delta) => {
        //   // just for fun, let's rotate mr rabbit a little
        //   // delta is 1 if running at 100% performance
        //   // creates frame-independent transformation
        //   bunny.rotation += 1 * delta;
        //   bunny.scale.x = 0.999 * delta;
        // });
        //
        // this.app.renderer.backgroundColor = 0xd8d8d8;
      },

      // eslint-disable-next-line no-unused-vars
      zoomLevelChange({layerX, layerY, wheelDelta}) {
        // eslint-disable-next-line no-unused-vars
        let {x, y} = this.getLayerMousePosition();
        // this.$message.info(x + ', ' + y);

        if (wheelDelta < 0 && this.zoom < this.zoomMax) {
          this.testTile.scale.x *= 2;
          this.testTile.scale.y *= 2;

          this.zoom += 1;

        } else if (wheelDelta > 0 && this.zoom > this.zoomMin) {

          this.testTile.scale.x *= 1 / 2;
          this.testTile.scale.y *= 1 / 2;

          this.zoom -= 1

        }
      },

      checkInView(sprite) {
        const {x, y} = sprite;

        const leftLimit = -256;
        const rightLimit = this.viewWidth;
        const topLimit = -256;
        const bottomLimit = this.viewHeight;

        return x >= leftLimit && x <= rightLimit && y >= topLimit && y <= bottomLimit;
      },
    }
  }
</script>

<style scoped>

</style>