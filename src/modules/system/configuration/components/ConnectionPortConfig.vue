<template>
  <div class="config-options-wrapper common-wrapper" v-loading="isLoading">
    <div class="title-wrapper">
      <span class="title">Backend Connection Port Mapping</span>
    </div>
    <div class="form-wrapper">
      <el-form class="port-config-form" ref="portConfigForm" inline v-model="dcsPort">
        <el-form-item label="Server Main Port">
          <el-input size="small" v-model="dcsPort.serverMainPort"></el-input>
        </el-form-item>
        <el-form-item label="Server Poll Port">
          <el-input size="small" v-model="dcsPort.serverPollPort"></el-input>
        </el-form-item>
        <el-form-item label="Export Main Port">
          <el-input size="small" v-model="dcsPort.exportMainPort"></el-input>
        </el-form-item>
        <el-form-item label="Export Poll Port">
          <el-input size="small" v-model="dcsPort.exportPollPort"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="mapping-operation">
      <div class="script-inject-hint" v-show="showHint">
        <span><i class="el-icon-warning"></i>
          Remember to re-install Lua dependency script
          and restart DCS World for the port configuration to take effect.</span>
      </div>
      <div class="port-config-button-wrapper">
        <el-button size="small" @click="handleSetDcsPort">Confirm</el-button>
        <el-button size="small" @click="handleResetDefaultDcsPort">Default</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConnectionPortConfig",

  data() {
    return {
      // portConfig: new PortConfig()
      isLoading: false,

      showHint: false,
    }
  },

  computed: {
    ...mapGetters('configuration', ["dcsPort"])
  },

  mounted() {
    this.isLoading = true;
    this.getDcsPortConfiguration().finally(() => this.isLoading = false);
  },

  methods: {
    ...mapActions('configuration',
        ["getDcsPortConfiguration", "setDcsPortConfiguration", "resetDefaultPortConfiguration"]),

    handleSetDcsPort() {
      this.setDcsPortConfiguration().then(res => {
        if (res.data.success) {
          this.$message.info("Port mapping configured successfully")
        } else {
          this.$message.error(res.data.message);
        }
      })
    },

    handleResetDefaultDcsPort() {
      this.resetDefaultPortConfiguration().then(res => {
        if (res.data.success) {
          this.$message.info("Port mapping revert to default settings");
          this.showHint = true;
        } else {
          this.$message.error(res.data.message);
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .config-options-wrapper {
    padding: 20px;
    background-color: $primary;

    .form-wrapper {
      .port-config-form {

      }
    }

    .mapping-operation {
      display: flex;
      flex-direction: row;

      .script-inject-hint {
        font-size: 12px;
      }

      .port-config-button-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>