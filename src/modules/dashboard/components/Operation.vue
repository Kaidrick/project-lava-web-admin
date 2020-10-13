<template>
  <div class="operation-wrapper">
    <span>Operation</span>
    <div class="operation-container">
      <div class="block">
        <el-dropdown>
          <span class="title">
            <el-image :src="require('@/assets/broadcast.png')" fit="contain"></el-image>
            <span>Broadcast Message</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>ALL</el-dropdown-item>
            <el-dropdown-item>BLUE</el-dropdown-item>
            <el-dropdown-item>RED</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="block">
        <el-dropdown @command="handleControlServer">
          <span class="title">
            <el-image :src="require('@/assets/server_control.png')" fit="contain"></el-image>
            <span>Control Server</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0">RESTART</el-dropdown-item>
            <el-dropdown-item :command="1">SHUTDOWN</el-dropdown-item>
            <el-dropdown-item :command="2">SCHEDULE</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="block">
        <el-dropdown>
          <span class="title">
            <el-image :src="require('@/assets/slot_block.png')" fit="contain"></el-image>
            <span>Manage Playable Slot</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>BLOCK</el-dropdown-item>
            <el-dropdown-item>RELEASE</el-dropdown-item>
            <el-dropdown-item>BLOCK ALL</el-dropdown-item>
            <el-dropdown-item>RELEASE ALL</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import {mapGetters, mapActions} from 'vuex';
  import Control from "../mixins";
  export default {
    name: "Operation",

    computed: {
      ...mapGetters('dashboard', ['ok'])
    },

    data() {
      return {

      }
    },

    mixins: [Control],

    methods: {
      handleControlServer(command) {
        switch (command) {
          case 0:
            this.restartServer("ok good");
            break;
          case 1:
            break;
          case 2:
            break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .operation-wrapper {
    .operation-container {
      display: flex;
      justify-content: space-between;

      .block {
        width: 140px;
        height: 60px;

        ::v-deep .el-dropdown {
          height: 100%;
          width: 100%;

          .title {
            height: 100%;
            display: flex;

            span {
              width: 80px;
              margin: auto auto;
              text-align: center;
            }

            .el-image {
              height: 48px;
              width: 48px;
              padding: 5px;
              margin: auto auto;
            }

            &:last-of-type {
              padding-right: 0;
            }
          }
        }

        &:hover {
          background-color: $primary_light;
        }


      }
    }
  }
</style>