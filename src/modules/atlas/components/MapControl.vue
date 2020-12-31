<template>
  <div class="atlas-map-control-wrapper">
    <h3>DCS Map Test Page</h3>
    <div class="map-box" id="mapbox" style="margin: 20px">
      <map-box ref="map"></map-box>
    </div>
    <el-button @click="$refs.map.refresh()">Refresh</el-button>
    <el-button @click="$refs.map.changeSize()">Change Size Test</el-button>
  </div>
</template>

<script>
// import test from '@/assets/eraser.png';

  import MapBox from "@/modules/atlas/components/MapBox";
  // import PixiRenderer from "@/modules/atlas/components/PixiRenderer";
  // import PixiContainer from "@/modules/atlas/components/PixiContainer";
  // import PixiSprite from "@/modules/atlas/components/PixiSprite";

export default {
  name: "MapControl",
  components: {
    // PixiSprite, PixiContainer, PixiRenderer,
    MapBox
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .atlas-map-control-wrapper {
    padding: 10px;
    background-color: $primary;
  }
</style>