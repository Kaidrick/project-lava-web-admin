<template>
  <div class="side-dock-panel-wrapper">
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
  .side-panel-right {
    background-color: #42b983;
    position: absolute;

    right: -400px;
    z-index: 255;
    height: 100%;
    width: 400px;

    transition: all .2s ease-in-out;

    .el-button {
      background-color: #00bb00;
    }

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
      }
    }

    &.pop {
      transform: translateX(-400px);
    }
  }
</style>