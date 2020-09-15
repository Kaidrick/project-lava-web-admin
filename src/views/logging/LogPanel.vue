<template>
  <el-container>
    <el-main>
      <el-scrollbar>
        <el-table class="log-table" :data="logData" height="600px" :show-header="false">
          <el-table-column show-overflow-tooltip title="Time Stamp" prop="timestamp"></el-table-column>
          <el-table-column show-overflow-tooltip title="Category" prop="category" width="80px"></el-table-column>
          <el-table-column show-overflow-tooltip title="Source" prop="source"></el-table-column>
          <el-table-column show-overflow-tooltip title="Message" prop="message"></el-table-column>
          <div slot="empty">{{ $t('no data') }}</div>
        </el-table>
      </el-scrollbar>
    </el-main>
    <el-footer>
      <el-button @click="addTestData">Test Add Data</el-button>
      <el-button @click="clearLog">Clear Log</el-button>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: "LogPanel",

    data() {
      return {
        logData: [],  // contains 1,000 log messages at maximum
      }
    },

    methods: {
      addTestData() {
        const time = new Date();
        this.logData.push({
          timestamp: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
          category: 'INFO',
          message: 'This is a test log message',
          source: 'some class name here maybe?'
        })
      },

      clearLog() {
        this.logData.splice(0, this.logData.length);  // empty the array
      }
    }
  }
</script>

<style lang="scss" scoped>
  .log-table {

  }
</style>