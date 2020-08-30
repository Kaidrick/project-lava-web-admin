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
        <span class="detail-value">{{ showWebGuiStatus }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('lava_backend_connection') }}</span>
        <span class="detail-value">{{ showConnectionStatus }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('lava_backend_phase') }}</span>
        <span class="detail-value">{{ showBackendOperationPhase }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('player_count') }}</span>
        <span class="detail-value">SOME TEST VALUE</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ 'In Game Objects' }}</span>
        <span class="detail-value">{{ objectCount }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('mission_time') }}</span>
        <span class="detail-value">SOME TEST VALUE</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('local_time') }}</span>
        <span class="detail-value">{{ showCurrentLocalTime }}</span>
      </div>
      <div class="detail-name-value">
        <span class="detail-name">{{ $t('mission_map_theater') }}</span>
        <span class="detail-value">{{ showTheaterName }}</span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import connectionService from '@/services/ConnectionService';
  export default {
    name: "ServerInfoPanel",

    data() {
      return {
        webGuiStatus: '',
        connectionStatus: '',
        phaseCode: -1,
        timestamp: '',
        theater: '',  // should only be updated at first connection or at mission restart trigger
        objectCount: 0
      }
    },

    computed: {
      showConnectionStatus() {
        return this.connectionStatus;
      },

      showCurrentLocalTime() {
        return this.timestamp;
      },

      showWebGuiStatus() {
        return this.webGuiStatus;
      },

      showBackendOperationPhase() {
        switch (this.phaseCode) {
          case 0:
            return "PREPARING";
          case 1:
            return "LOADING";
          case 2:
            return "STOPPING";
          case 3:
            return "IDLE";
          case 4:
            return "RUNNING";
          default:
            return "UNKNOWN";
        }
      },

      showTheaterName() {
        return this.theater;
      }
    },

    activated() {
      console.log("activated");
    },

    mounted() {
      console.log("mounted");
      setInterval(this.getConnectionStatus, 2000);
    },

    methods: {
      getConnectionStatus() {
         connectionService.getBackendConnectionStatus().then(res => {
           const connectionStatus = res.data;
           if (res.status === 200) {
             this.connectionStatus = connectionStatus.connected ? 'Connection OK' : 'Not connected';
             this.webGuiStatus = 'Good';
             this.timestamp = new Date(connectionStatus.timestamp).toLocaleTimeString();
             this.phaseCode = connectionStatus.phaseCode;
             this.theater = connectionStatus.theater;
             this.objectCount = connectionStatus.objectCount;

           } else {  // WebGUI failed to detect backend
             this.webGuiStatus = 'Bad';
           }

           // if backend functionality is OK, query theater info and player count
         }).catch(error => {
           this.webGuiStatus = 'Bad';
           if (error.response) {
             console.log(error.response.data);
             console.log(error.response.status);
             console.log(error.response.headers);
           }
         });
      }
    },
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

      }
    }
  }
</style>