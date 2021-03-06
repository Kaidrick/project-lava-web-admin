<template>
  <div class="lua-debug-sidebar-control">
    <el-button class="lua-debug-sidebar-control__send-button"
               size="small"
               @click="sendDebugCommand">RUN</el-button>
    <el-button class="lua-debug-sidebar-control__clear-button"
               size="small"
               @click="clearDebugCommand">CLEAR</el-button>
    <el-radio-group class="lua-debug-sidebar-control__radio-group"
                    v-model="debugEnvType">
      <div class="lua-debug-sidebar-control__radio-group__radio-button-wrapper">
        <div v-for="(env, index) in envList" :key="index">
          <el-tooltip class="item" effect="dark" :content="env.desc" placement="right">
            <el-radio :label="env.type" border>{{ env.name }}</el-radio>
          </el-tooltip>
        </div>
      </div>
    </el-radio-group>
    <el-button style="width: 100%; overflow: hidden; text-overflow: ellipsis" size="small" @click="handlePanelCollapse">{{ isCollapsed ? 'EXPAND' : 'COMPACT' }}</el-button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "SideBarControl",

    data() {
      const envList = [
        {
          name: 'Mission',
          type: 0,
          desc: 'Execute in Mission Scripting Engine'
        },
        {
          name: 'Hook',
          type: 1,
          desc: 'Execute in Server Control Environment'
        },
        {
          name: 'Export',
          type: 2,
          desc: 'Execute in Data Export Environment'
        },
        {
          name: 'Mission Trigger',
          type: 3,
          desc: 'Execute in Mission Editor Wrapper Environment'
        },
      ];

      return {
        debugType: 0,
        envList,

        isCollapsed: false
      }
    },

    computed: {
      debugEnvType: {
        get () {
          return this.$store.state['debugger'].debugEnvType;
        },
        set (value) {
          this.$store.dispatch('debugger/changeDebugEnvType', value);
        }
      }
    },

    methods: {
      sendDebugCommand() {
        this.$emit('send-command', this.debugType);
      },

      clearDebugCommand() {
        this.$emit('clear-command');
      },

      handlePanelCollapse() {
        this.isCollapsed = !this.isCollapsed;
        this.$emit('panel-collapsed', this.isCollapsed)
      },

      ...mapActions('debugger', ['changeDebugEnvType'])
    }
  }
</script>

<style lang="scss" scoped>
  .lua-debug-sidebar-control {
    ::v-deep .lua-debug-sidebar-control__send-button, .lua-debug-sidebar-control__clear-button {
      width: 64px;
      height: 64px;

      &.el-button--default {
        background-color: #f7b500;
      }

      &.el-button--default:hover {
        background-color: lighten(#f7b500, 5);
      }

      &.el-button--default:active {
        background-color: lighten(#f7b500, 15);
      }
    }

    .lua-debug-sidebar-control__send-button {
      background: url("~@/assets/lua_102040.png") center center no-repeat;
      background-size: 48px auto;
    }
    .lua-debug-sidebar-control__clear-button {
      background: url("~@/assets/eraser.png") center center no-repeat;
      background-size: 48px auto;
    }

    .lua-debug-sidebar-control__radio-group {
      margin-top: 5px;

      div {
        margin-bottom: 5px;

        .el-radio {
          width: 100%;
        }
      }
    }
  }
</style>