<template>
  <div>
    <connection-port-config></connection-port-config>
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

</style>