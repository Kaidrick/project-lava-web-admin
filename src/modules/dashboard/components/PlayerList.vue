<template>
    <div class="player-list-wrapper">
      <span>Connected Players</span>
      <el-table class="player-data-table"
                :data="playerData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.id }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="Player Name" prop="name"></el-table-column>
        <el-table-column label="Net ID" prop="id"></el-table-column>
        <el-table-column label="UCID" prop="ucid"></el-table-column>
        <el-table-column label="I.P. Address" prop="ipaddr"></el-table-column>
        <el-table-column label="Ping">
          <template slot-scope="scope">
            {{ scope.row.ping }}ms
          </template>
        </el-table-column>
        <el-table-column label="Client Language" prop="lang"></el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button @click="console.log(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
        <span slot="empty">No data</span>
      </el-table>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "PlayerList",

        computed: {
            ...mapGetters('dashboard', ['playerData'])
        },

        data() {
          return {
              timer: null
          }
        },

        mounted() {
            this.timer = setInterval(this.getPlayerList, 2000);
        },

        beforeDestroy() {
            clearInterval(this.timer);
        },

        methods: {
            ...mapActions('dashboard', ['getPlayerList'])
        }
    }
</script>

<style lang="scss" scoped>
    .player-list-wrapper {
      height: 420px;
      display: flex;
      flex-direction: column;

      .player-data-table {

      }
    }
</style>