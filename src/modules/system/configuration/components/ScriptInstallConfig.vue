<template>
  <div class="script-install-config-wrapper">
    <el-select v-model="branchName" @change="handleBranchSelectionChange">
      <el-option v-for="(branchName, index) in dcsBranches"
                 :key="index"
                 :value="branchName"
                 :label="branchName">{{ branchName }}</el-option>
    </el-select>
    <el-button @click="isInstall ? installScripts() : uninstallScripts()" :disabled="branchName === ''">{{ installButtonLabel }}</el-button>
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
  .script-install-config-wrapper {
    
  }
</style>