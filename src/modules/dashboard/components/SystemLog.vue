<template>
    <div class="system-log-list-wrapper">
        <el-table :data="systemLogData"
                  height="300px"
                  :row-class-name="tableRowClass">
          <el-table-column label="Time" prop="time"></el-table-column>
          <el-table-column label="Level" width="90px" prop="logLevel"></el-table-column>
          <el-table-column label="Message" prop="message"></el-table-column>
          <el-table-column label="Source" prop="source"></el-table-column>
        </el-table>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
    export default {
        name: "SystemLog",

      computed: {
          ...mapGetters('dashboard', ['systemLogData']),
      },

      methods: {
          ...mapActions('dashboard', ['getSystemLogList']),

        tableRowClass({row}) {
          return 'log-level-' + row.logLevel.toLowerCase();
        }
      },

      mounted() {
          this.getSystemLogList();
      }
    }
</script>

<style lang="scss" scoped>

  ::v-deep .log-level-info {
    background-color: #13ce66 !important;
  }

  ::v-deep .log-level-warn {
    background-color: #ebb563 !important;
  }

  ::v-deep .log-level-debug {
    background-color: #3a8ee6 !important;
  }

  ::v-deep .log-level-error {
    background-color: #dd6161 !important;
  }

  .log-level-event {
    background-color: #9876AA !important;
  }

  ::v-deep .log-level-addon {
    background-color: #41e3c9 !important;
  }
</style>