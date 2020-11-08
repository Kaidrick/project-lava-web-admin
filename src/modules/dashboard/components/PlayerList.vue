<template>
    <div class="dashboard-block-wrapper">
      <div class="block-title">
        <span>Connected Players</span>
        <div class="player-search-bar">
          <el-input v-model="searchCriteria" clearable size="small" placeholder="Search by player name"></el-input>
        </div>
      </div>

      <el-scrollbar style="height: calc(100% - 30px)">
        <div class="player-info-wrapper" v-for="data in tableData" :key="data.ucid">
          <div class="player-info-block"
               @click="handlePlayerInfoExpansion(data)"
               :class="{'expand': currentSelection === data.ucid}">
            <el-row style="width: 100%">
              <el-col :span="6" class="player-name">{{ data.name }}</el-col>
              <el-col :span="14" class="player-ucid">{{ data.ipaddr }}</el-col>
              <el-col :span="3" class="player-lang">{{ data.lang }}</el-col>
              <el-col :span="1" class="player-side" :style="getPlayerSideIndicatorStyle(data.side)">
              </el-col>
            </el-row>

          </div>
          <el-collapse-transition>
            <div class="player-info-expander" v-show="currentSelection === data.ucid">
              <div class="info-item">
                <div>Ping: {{ data.ping }}ms</div>
                <div>
                  <span>UCID: {{ data.ucid }}&nbsp;</span>
                  <el-button title="copy player UCID"
                             type="text"
                             @click="copyToClipboard(data.ucid)">
                    <i class="el-icon-document-copy"></i>
                  </el-button>
                </div>
                <div>Net ID: {{ data.netId }}</div>
                <div>Pilot ID: {{ data.pilotId }}</div>
                <div>Slot: {{ data.slot }}</div>
                <div>Slot Unit: $placeholder id$, $placeholder unit name$</div>
              </div>
              <div class="operation-button-wrapper">
                <el-button v-for="(action, index) in disciplinaryActions"
                           size="mini"
                           @click="$refs.discActionDetail.show(action.type, data)"
                           :key="index">
                  {{ action.name }}
                </el-button>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </el-scrollbar>

      <disciplinary-action-detail ref="discActionDetail"></disciplinary-action-detail>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import DisciplinaryActionDetail from "./DisciplinaryActionDetail";

    export default {
        name: "PlayerList",
      components: {DisciplinaryActionDetail},
      computed: {
            ...mapGetters('dashboard', ['playerData'])
        },

        data() {
          return {
              timer: null,

            disciplinaryActions: [],

            tableData: [],  // view array generated from player data map

            playerDataMap: [],

            selectedRowUcid: '',

            currentSelection: '',  // ucid

            searchCriteria: ''
          }
        },

        mounted() {
          // when this view is mounted, send a request to get a initial rednering of the player list
          // player data are maintained in an map with player ucid as key, and thus the data can be
          // immediately accessed by ucid when a update is detected
          this.getDisciplineCategories().then(res => {
            if (res.data.success) {
              console.log(res.data.data);
              this.disciplinaryActions = res.data.data;
            }
          });


          this.getPlayerList()  // data is already in the state
              .then(() => {
                this.tableData = this.playerData;
              });

          // FIXME: can do update but cannot replace table data
          // FIXME: replace the table data and then expand previously expanded rows
            this.timer = setInterval(() => {
              this.getPlayerList().then(() => {
                this.tableData = this.playerData;
                this.tableData.forEach(player => player.name = 'Player_' + (Math.random() * 1000000)
                    .toFixed(0));
              })
            }, 2000);
        },

        beforeDestroy() {
            clearInterval(this.timer);
        },

        methods: {
            ...mapActions('dashboard', ['getPlayerList', 'getDisciplineCategories']),
            ...mapMutations('dashboard', ['setPlayerTableExpandedRows']),

          // eslint-disable-next-line no-unused-vars
          handlePlayerInfoExpansion(player) {
              // compare: if different ucid, assign ucid; otherwise assign null
              this.currentSelection = this.currentSelection !== player.ucid ? player.ucid : null;
          },

          // eslint-disable-next-line no-unused-vars
          handleRowExpanded(row, expandedRows) {
              console.log(row, expandedRows);
              const { ucid } = row;
              if (this.selectedRowUcid === ucid) {
                this.selectedRowUcid = '';
              } else {
                this.selectedRowUcid = ucid;
              }

              this.$message.warning(this.selectedRowUcid);

            // this.$refs.playerDataTable.toggleRowExpansion(row, false);
            // this.setPlayerTableExpandedRows(expandedRow);
          },

          getPlayerSideIndicatorStyle(side) {
              if (side === 2) {
                return 'background-color: blue';
              } else if (side === 1) {
                return 'background-color: red';
              } else {
                return 'background-color: #d3d3d3';
              }

          },

          copyToClipboard(text) {
            const elem = document.createElement('textarea');
            elem.value = text;
            document.body.appendChild(elem);
            elem.select();
            document.execCommand('copy');
            document.body.removeChild(elem);

            this.$message.info('UCID copied to clipboard');
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";
    .dashboard-block-wrapper {
      height: 420px;

      .block-title {
        display: flex;
        justify-content: space-between;
      }

      .player-info-wrapper {
        .player-info-block {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          cursor: pointer;

          &:hover {
            background-color: $primary_light;
          }

          &:active {
            background-color: lighten($primary_light, 10);
          }

          &.expand {
            background-color: #42b983;
          }

          .player-name {
            font-weight: bold;
          }

          .player-side {
            width: 6px;
            height: 100%;
            float: right;
          }
        }

        .player-info-expander {
          background-color: $primary_dark;
          padding: 10px;
          line-height: 24px;

          .operation-button-wrapper {
            margin-top: 10px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            //padding: 20px;
          }
        }
      }

    }
</style>