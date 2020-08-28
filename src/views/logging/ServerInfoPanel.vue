<template>
  <el-container>
    <el-header class="server-info-header">
      <div>
        <span>SERVER CONNECTION</span>
      </div>
    </el-header>
    <el-main class="server-info-detail">
      <div class="detail-name-value">
        <span>WebGUI Connection</span>
        <span>{{ showWebGuiStatus }}</span>
      </div>
      <div class="detail-name-value">
        <span>Backend Status</span>
        <span>{{ showConnectionStatus }}</span>
      </div>
      <div class="detail-name-value">
        <span>Number of Players</span>
        <span>SOME TEST VALUE</span>
      </div>
      <div class="detail-name-value">
        <span>Map Theater</span>
        <span>SOME TEST VALUE</span>
      </div>
      <div class="detail-name-value">
        <span>Mission Time</span>
        <span>SOME TEST VALUE</span>
      </div>
      <div class="detail-name-value">
        <span>Current Local Time</span>
        <span>{{ showCurrentLocalTime }}</span>
      </div>
      <div class="detail-name-value">
        <span>Map Theater</span>
        <span>SOME TEST VALUE</span>
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
        serverTime: '',
      }
    },

    computed: {
      showConnectionStatus() {
        return this.connectionStatus;
      },

      showCurrentLocalTime() {
        return this.serverTime;
      },

      showWebGuiStatus() {
        return this.webGuiStatus;
      }
    },

    mounted() {
      setInterval(() => this.getConnectionStatus(), 2000)
    },

    methods: {
      getConnectionStatus() {
         connectionService.getBackendConnectionStatus().then(res => {
           if (res.status === 200) {
             this.connectionStatus = res.data.isConnected ? 'Connection OK' : 'Not connected';
             this.webGuiStatus = 'Good';
             this.serverTime = res.data.timestamp;
           } else {  // WebGUI failed to detect backend
             this.webGuiStatus = 'Bad';
           }
         }).catch(error => {
           this.webGuiStatus = 'Bad';
           if (error.response) {
             console.log(error.response.data);
             console.log(error.response.status);
             console.log(error.response.headers);
           }
         });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .server-info-header {
    padding: 20px;
  }

  .server-info-detail {
    .detail-name-value {
      padding-bottom: 10px;

      &:last-of-type {
        padding-bottom: 0;
      }

      display: flex;
      justify-content: space-around;
    }
  }
</style>