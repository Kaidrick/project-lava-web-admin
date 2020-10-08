<template>
  <div>
    <h3>DCS Map Test Page</h3>
    <map-box ref="map"></map-box>
    <el-button @click="$refs.map.refresh()">Refresh</el-button>
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

<style scoped>

</style>