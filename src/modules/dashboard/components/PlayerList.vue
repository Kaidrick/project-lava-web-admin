<template>
    <div class="player-list-wrapper">
      <span>Connected Players</span>
        <el-table :data="tableData">
            <el-table-column label="Net ID" prop="id"></el-table-column>
            <el-table-column label="Player Name" prop="name"></el-table-column>
            <el-table-column label="UCID" prop="ucid"></el-table-column>
            <el-table-column label="I.P. Address" prop="ipaddr"></el-table-column>
            <el-table-column label="Ping" prop="ping"></el-table-column>
            <el-table-column label="Client Language" prop="lang"></el-table-column>
            <el-table-column label="Operation">
              <template slot-scope="scope">
                <span>{{ scope.$index }}</span>
                <el-button>Edit</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
      name: "PlayerList",

      data() {
        return {
          tableData: [],
        }
      },

      mounted() {
        this.tableData.push({
          id: 1,
          name: "test",
          ucid: "a-a-a-a-a-a-a",
          ping: 14,
          lang: "cn"
        });
      }
    }
</script>

<style lang="scss" scoped>
    .player-list-wrapper {

    }
</style>