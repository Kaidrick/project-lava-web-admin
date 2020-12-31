<script>
  import * as PIXI from 'pixi.js';
  import { TileMetaData } from "@/modules/atlas/TileMetaData";
  import grid from '@/assets/fill_grid_256.png';
  import AtlasMap from "../../../services/atlas/AtlasMap";

  export default {
    name: "MapBox",

    // eslint-disable-next-line no-unused-vars
    render() {
      return <div onWheel={this.zoomLevelChange} />
    },

    data() {
      return {
        viewWidth: 1280,
        viewHeight: 720,
        tileSize: 256,

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

        x: 0,
        y: 0,
        level: 100,
        theater: 'Nevada',
      }
    },

    created() {
      this.app = new PIXI.Application({
        width: this.viewWidth, height: this.viewHeight, backgroundColor: 0xffffff, transparent: true,
        // resizeTo: document.getElementById("mapbox")
      })
    },

    mounted() {
      this.$el.appendChild(this.app.view);

      this.mapInit();
    },

    methods: {
      mapInit() {
        // the leftmost and topmost tile that is in the view
        this.x = 60;
        this.y = 60;
        this.level = 20;

        // calculate how many tiles need to be added to the stage
        const rows = Math.ceil(this.viewWidth / 256);
        const cols = Math.ceil(this.viewHeight / 256);

        console.log(rows, cols);

        for (let i = -1; i <= rows; i++) {
          for (let j = -1; j <= cols; j++) {
            AtlasMap.getMapTile(this.theater, this.level, this.x + j, this.y + i).then(res => {
              const data = "data:image/png;base64," + Buffer.from(res.data, 'binary').toString('base64');
              const t = PIXI.Sprite.from(data);
              t.width = 256;
              t.height = 256;
              t.interactive = true;
              // t.anchor.set(0.5);
              t.on('pointerdown', this.onDragStart)
                  .on('pointerup', this.onDragEnd)
                  .on('pointerupoutside', this.onDragEnd)
                  .on('pointermove', this.onDragMove);

              t.x = 256 * i;
              t.y = 256 * j;
              this.tiles.push(t);

              this.app.stage.addChild(t)
            }).finally();
          }
        }

        this.tiles.forEach(t => {
          t.on('pointerdown', this.onDragStart)
              .on('pointerup', this.onDragEnd)
              .on('pointerupoutside', this.onDragEnd)
          // .on('pointermove', this.onDragMove);
        });
      },


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
          // eslint-disable-next-line no-unused-vars
          let { movementX, movementY } = any.data.originalEvent;

          this.tiles.forEach(t => t.x += movementX / 20);  // apply transition to each tile
          this.tiles.forEach(t => t.y += movementY / 20);

          const leftCheck = Math.min(...this.tiles.map(t => t.x));
          const topCheck = Math.min(...this.tiles.map(t => t.y));
          const rightCheck = Math.max(...this.tiles.map(t => t.x));
          const bottomCheck = Math.max(...this.tiles.map(t => t.y));

          const spanWidth = Math.ceil(this.viewWidth / 256) + 2;
          const spanHeight = Math.ceil(this.viewHeight / 256) + 2;

          // const memX = this.x;
          // const memY = this.y;

          if (leftCheck < -512 && topCheck < -512) {
              this.$message.warning("potential problem")
          }

          if (leftCheck < -512) {  // move the leftmost column to the right and replace texture
              // y one step to the right
              this.y++;

              // start to replace texture from the top most tile
              let track = -1;

              // tiles need to be sorted by y in ascending order
              this.app.stage.children.filter(t => t.x === leftCheck).sort((a, b) => a.y - b.y).forEach(
                  t => {
                      t.x += spanWidth * 256;  // move to right most position
                      t.texture = PIXI.Texture.from(grid);

                      // since we are moving the left most column, we need to calculate x, y for the right most one
                      AtlasMap.getMapTile(this.theater, this.level, this.x + track++, this.y + spanWidth - 2).then(res => {
                          const data = "data:image/png;base64," + Buffer.from(res.data, 'binary')
                              .toString('base64');
                          t.texture = PIXI.Texture.from(data);
                      }).finally();
                  }
              );
          }

          if (rightCheck > this.viewWidth + this.tileSize) {
              this.y--;

              let track = -1;

              this.app.stage.children.filter(t => t.x === rightCheck).sort((a, b) => a.y - b.y).forEach(
                  t => {
                      t.x -= spanWidth * 256;
                      t.texture = PIXI.Texture.from(grid);

                      AtlasMap.getMapTile(this.theater, this.level, this.x + track++, this.y - 1).then(res => {
                          const data = "data:image/png;base64," + Buffer.from(res.data, 'binary')
                              .toString('base64');
                          t.texture = PIXI.Texture.from(data);
                      })
                  }
              )
          }

          if (topCheck < - 512) {  // move the topmost row to the bottom and replace texture
            this.x++;

            let track = -1;

            this.app.stage.children.filter(t => t.y === topCheck).sort((a, b) => a.x - b.x).forEach(
                t => {
                    t.y += spanHeight * 256;
                    t.texture = PIXI.Texture.from(grid);

                    AtlasMap.getMapTile(this.theater, this.level, this.x + spanHeight - 2, this.y + track++).then(res => {
                        const data = "data:image/png;base64," + Buffer.from(res.data, 'binary')
                            .toString('base64');
                        t.texture = PIXI.Texture.from(data);
                    }).finally();
                }
            )
          }

          if (bottomCheck > this.viewHeight + this.tileSize) {
            this.x--;

              // eslint-disable-next-line no-unused-vars
            let track = -1;

            this.app.stage.children.filter(t => t.y === bottomCheck).sort((a, b) => a.x - b.x).forEach(
                t => {
                    t.y -= spanHeight * 256;
                    t.texture = PIXI.Texture.from(grid);

                    AtlasMap.getMapTile(this.theater, this.level, this.x - 1, this.y + track++).then(res => {
                        const data = "data:image/png;base64," + Buffer.from(res.data, 'binary')
                            .toString('base64');
                        t.texture = PIXI.Texture.from(data);
                    }).finally();
                }
            )
          }
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

        this.tiles.map(t => {
          t.texture = PIXI.Texture.fromBuffer(new Uint8Array(tileData), 256, 256)
        })
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

      newMapTileByLevelXY(theater, level, x, y, placementX, placementY) {
          AtlasMap.getMapTile(this.theater, this.level, x, y).then(res => {
              const data = "data:image/png;base64," + Buffer.from(res.data, 'binary').toString('base64');
              const t = PIXI.Sprite.from(data);
              t.width = 256;
              t.height = 256;
              t.interactive = true;
              // t.anchor.set(0.5);
              t.on('pointerdown', this.onDragStart)
                  .on('pointerup', this.onDragEnd)
                  .on('pointerupoutside', this.onDragEnd)
                  .on('pointermove', this.onDragMove);

              t.x = placementX;
              t.y = placementY;
              this.tiles.push(t);

              this.app.stage.addChild(t)
          }).finally();
      },

      changeSize() {
        this.viewHeight = 680;
        this.viewWidth = 450;

        this.app.view.height = 680;
        this.app.view.width = 450;

        this.tiles = [];

        this.app.stage.children.forEach(s => this.app.stage.removeChild(s));

        this.$el.appendChild(this.app.view);
        this.mapInit();

        // this.app.resize();
      }
    }
  }
</script>

<style scoped>

</style>