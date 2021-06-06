<template>
  <el-container>
    <el-header class="server-info-header" height="20px">
      <div>
        <span>{{ $t('server_info') }}</span>
      </div>
    </el-header>
    <el-main class="server-info-detail">
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('panel_connection') }}</span>
        <span class="detail-value">{{ status.webGuiStatus }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('lava_backend_connection') }}</span>
        <span class="detail-value">{{ status.connectionStatus }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('lava_backend_phase') }}</span>
        <span class="detail-value">{{ status.phaseCode }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('player_count') }}</span>
        <span class="detail-value">{{ status.playerCount  }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ 'In Game Objects' }}</span>
        <span class="detail-value">{{ status.objectCount  }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('mission_time') }}</span>
        <span class="detail-value">Missile Name Here</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('local_time') }}</span>
        <span class="detail-value">{{ status.timestamp  }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('mission_map_theater') }}</span>
        <span class="detail-value">{{ status.theater }}</span>
      </div>
    </el-main>
    <el-footer>
      <el-button @click="handleTestSendMessage">WTF?</el-button>
    </el-footer>
  </el-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "ServerInfoPanel",

    data() {
      return {
        websocket: null,
        timer: null
      }
    },

    computed: {
      ...mapGetters(["status"]),
      ...mapGetters('system', ['configured'])
    },

    activated() {
      console.log("activated");
    },

    beforeDestroy() {
      console.log(this.$store.state.system.configured, '$store.state.system.configured')
      clearInterval(this.timer);
      this.$message.info("Disconnected");
    },

    mounted() {
      console.log("mounted");

      this.timer = setInterval(this.loadBackendConnectionStatus, 2000);
    },

    methods: {
      ...mapActions(["loadBackendConnectionStatus"]),

      handleTestSendMessage() {
        this.$stomp.publish("test message wtf", {});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .server-info-header {
    padding: 20px;
    font-weight: 900;
  }

  .server-info-detail {
    .detail-name-value {
      padding-bottom: 10px;

      &:last-of-type {
        padding-bottom: 0;
      }

      display: flex;
      justify-content: space-between;

      .detail-name {
        font-weight: normal;
      }

      .detail-value {
        overflow: hidden;
      }
    }
  }
</style>