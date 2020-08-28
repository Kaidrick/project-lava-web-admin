<template>
  <el-container>
    <el-main>
      <el-scrollbar>
        <el-table class="log-table" :data="logData" height="600px" :show-header="false">
          <el-table-column title="Time Stamp" prop="timestamp"></el-table-column>
          <el-table-column title="Category" prop="category"></el-table-column>
          <el-table-column title="Message" prop="message"></el-table-column>
          <el-table-column title="Source" prop="source"></el-table-column>
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
        this.logData.push({
          timestamp: new Date().toISOString(),
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