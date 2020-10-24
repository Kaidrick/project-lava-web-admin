<template>
  <div class="side-dock-panel-wrapper">
    <div class="side-dock-panel-mask"
         v-show="show"
         @click="show = !show" />
    <div v-if="visible" class="side-panel-right" :class="{'pop': show}">
      <slot></slot>
      <operation></operation>
      <el-button class="side-panel__show-hide-button" @click="show = !show">
        <i class="el-icon-d-arrow-left" v-if="!show"></i>
        <i class="el-icon-d-arrow-right" v-else></i>
      </el-button>
    </div>
  </div>
</template>

<script>
  import Operation from "@/modules/dashboard/components/Operation";

  export default {
    name: "SideDockPanel",
    components: {Operation},
    props: {
      visible: Boolean
    },

    data() {
      return {
        show: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .side-dock-panel-wrapper {
    height: 100%;
    width: 100%;

    position: absolute;

    .side-dock-panel-mask {
      //background-color: $primary_dark;
      background: transparent;
      height: 100%;
      width: 100%;
      z-index: 254;
      position: absolute;
      opacity: 0.4;
    }
  }

  .side-panel-right {
    background-color: #42b983;
    position: absolute;

    right: -400px;
    z-index: 255;
    height: 100%;
    width: 400px;

    transition: all .2s ease-in-out;

    .side-panel__show-hide-button {
      height: 100%;
      padding-left: 0;
      padding-right: 0;
      position: absolute;
      left: -30px;

      top: 0;
      width: 30px;

      &.side-panel__show-hide-button.el-button--default {
        background-color: #42b983;

        &:hover {
          background-color: lighten(#42b983, 5);
        }

        &:active {
          background-color: lighten(#42b983, 15);
        }
      }
    }

    &.pop {
      transform: translateX(-400px);

      div, section {
        padding-right: 30px;
      }
    }
  }
</style>