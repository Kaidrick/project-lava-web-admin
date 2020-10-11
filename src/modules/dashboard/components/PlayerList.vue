<template>
    <div class="player-list-wrapper">
        <el-table>
            <el-table-column label="Net ID"></el-table-column>
            <el-table-column label="Player Name"></el-table-column>
            <el-table-column label="UCID"></el-table-column>
            <el-table-column label="Ping"></el-table-column>
            <el-table-column label="Client Language"></el-table-column>
            <el-table-column label=""></el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        name: "PlayerList"
    }
</script>

<style lang="scss" scoped>
    .player-list-wrapper {

    }
</style>