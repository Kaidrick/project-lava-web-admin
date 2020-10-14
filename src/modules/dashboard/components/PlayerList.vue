<template>
    <div class="player-list-wrapper">
        <span>Connected Players</span>
        <el-table :data="playerData">
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

    }
</style>