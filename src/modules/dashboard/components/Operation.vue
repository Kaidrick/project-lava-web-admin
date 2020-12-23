<template>
  <div class="operation-wrapper">
    <div class="operation-header" style="height: 20px">OPERATION</div>
    <div class="operation-container">
      <div class="block">
        <el-dropdown placement="top" @command="handleBroadcastMessage">
          <span class="title">
            <el-image :src="require('@/assets/broadcast.png')" fit="contain"></el-image>
            <span>Broadcast Message</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0">ALL</el-dropdown-item>
            <el-dropdown-item :command="1">BLUE</el-dropdown-item>
            <el-dropdown-item :command="2">RED</el-dropdown-item>
            <el-dropdown-item :command="3">NEUTRAL</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="block">
        <el-dropdown placement="top" @command="handleControlServer">
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
        <el-dropdown placement="top">
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
      <div class="block">
        <el-dropdown placement="top">
          <span class="title">
            <el-image :src="require('@/assets/slot_block.png')" fit="contain"></el-image>
            <span>Server Gateway</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>PUBLIC</el-dropdown-item>
            <el-dropdown-item>RESTRICTED</el-dropdown-item>
            <el-dropdown-item>MAINTENANCE</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <server-control-dialog ref="serverControlDialog"></server-control-dialog>
      <server-trigger-message-dialog ref="serverMessageDialog"></server-trigger-message-dialog>
    </div>

  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import {mapGetters, mapActions} from 'vuex';
  import {Control} from "../mixins";
  import ServerControlDialog from "@/modules/dashboard/components/ServerControlDialog";
  import ServerTriggerMessageDialog from "@/modules/dashboard/components/ServerTriggerMessageDialog";
  export default {
    name: "Operation",
    components: {ServerTriggerMessageDialog, ServerControlDialog},
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
        this.$refs.serverControlDialog.show(command);
      },

      handleBroadcastMessage(type) {
        this.$refs.serverMessageDialog.show(type);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .operation-wrapper {
    //display: flex;
    padding: 20px;

    .operation-header {
      font-weight: 900;
    }

    .operation-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .block {
        //width: 140px;
        //height: 60px;
        display: inline-block;

        ::v-deep .el-dropdown {
          height: 100%;
          width: 100%;

          .title {
            height: 100%;
            display: flex;

            span {
              //width: 80px;
              margin: auto auto;
              text-align: center;
            }

            .el-image {
              height: 36px;
              width: 36px;
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