<template>
  <div class="system-config-wrapper">
    <connection-port-config></connection-port-config>
    <div class="sp-10"></div>
    <script-install-config></script-install-config>
  </div>
</template>

<script>
  import ConnectionPortConfig from "../components/ConnectionPortConfig";
  import ScriptInstallConfig from "../components/ScriptInstallConfig";
  export default {
    name: "SystemConfigView",
    components: {ScriptInstallConfig, ConnectionPortConfig},
  }
</script>

<style lang="scss" scoped>
  .system-config-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>