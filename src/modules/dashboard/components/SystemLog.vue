<template>
    <div class="dashboard-block-wrapper">
      <div class="block-title">System Logs</div>
<!--        <el-table :data="systemLogData"-->
<!--                  height="800px">-->
<!--          <el-table-column label="Time" prop="time"></el-table-column>-->
<!--          <el-table-column label="Level" width="90px" prop="logLevel"></el-table-column>-->
<!--          <el-table-column label="Message" prop="message"></el-table-column>-->
<!--          <el-table-column label="Source" prop="source"></el-table-column>-->
<!--        </el-table>-->

        <div class="infinite-list" v-infinite-scroll="load" infinite-scroll-distance="-20" style="overflow:auto;height: 400px">
            <div v-for="(entry, index) in systemLogData" :key="index" class="infinite-list-item">
                {{ entry.time }}
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
    export default {
        name: "SystemLog",

        data() {
            return {
                count: 0,

                pageObject: {
                    currentPageNo: 1,
                    pageSize: 30
                }
            }
        },

      computed: {
          ...mapGetters('dashboard', ['systemLogData']),
      },

      methods: {
          ...mapActions('dashboard', ['getSystemLogList', 'getMoreSystemList']),

        tableRowClass({row}) {
          return 'log-level-' + row.logLevel.toLowerCase();
        },

          load () {
              this.pageObject.currentPageNo++;
              this.getMoreSystemList(this.pageObject);
          }
      },

      mounted() {
          this.getSystemLogList(this.pageObject);
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