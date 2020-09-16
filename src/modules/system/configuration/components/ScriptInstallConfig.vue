<template>
  <div class="script-install-config-wrapper">
    <el-select v-model="dcsWritePath">
      <el-option v-for="index in 3" :key="index" :value="index" label="index">{{ index }}</el-option>
    </el-select>
    <el-button>{{ installButtonLabel }}</el-button>
  </div>
</template>

<script>
  export default {
    name: "ScriptInstallConfig",

    data() {
      return {
        dcsWritePath: '',
        installButtonLabel: 'Install',
      }
    }
  }
</script>

<style lang="scss" scoped>
  .script-install-config-wrapper {
    
  }
</style>