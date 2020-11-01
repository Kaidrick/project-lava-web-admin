<template>
  <div class="script-install-config-wrapper common-wrapper">
    <div class="title-wrapper">
      <span class="title">Dependency Lua Script Installation</span>
    </div>
    <div class="path-selector-wrapper">
      <div class="selector">
        <el-select popper-class="path-empty-select-hint" placeholder="Choose DCS World write path" size="small" v-model="branchName" @change="handleBranchSelectionChange">
          <el-option v-for="(branchName, index) in dcsBranches"
                     :key="index"
                     :value="branchName"
                     :label="branchName">{{ branchName }}</el-option>
          <template slot="empty">
            <div class="path-empty-select-hint">No DCS World write path found</div>
          </template>
        </el-select>
      </div>
      <div class="install-button-wrapper">
        <el-button size="small" @click="isInstall ? installScripts() : uninstallScripts()" :disabled="branchName === ''">
          {{ installButtonLabel }}
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import ScriptInjection from "../../../../services/config/ScriptInjection";
  export default {
    name: "ScriptInstallConfig",

    data() {
      return {
        branchName: '',
        dcsBranches: [],
        isInstall: true,
      }
    },

    computed: {
      installButtonLabel() {
        return this.isInstall ? 'Install' : 'Uninstall';
      }
    },

    mounted() {
      ScriptInjection.getDcsWritePathBranches().then(res => {
        this.dcsBranches = res.data.data;
      })
    },

    methods: {
      handleBranchSelectionChange(change) {
        ScriptInjection.isBranchConfigured(change).then(res => {
          this.isInstall = !res.data.data;
        })
      },

      installScripts() {
        ScriptInjection.installDcsScriptToBranch(this.branchName).then(res => {
          console.log(res);

          this.handleBranchSelectionChange(this.branchName);
        })
      },

      uninstallScripts() {
        ScriptInjection.uninstallDcsScriptFromBranch(this.branchName).then(res => {
          console.log(res);

          this.handleBranchSelectionChange(this.branchName);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";
  .script-install-config-wrapper {
    padding: 20px;
    background-color: $primary;

    .path-selector-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .path-empty-select-hint {
    padding: 10px;
  }
</style>