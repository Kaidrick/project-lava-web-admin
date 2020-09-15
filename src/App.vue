<template>
  <div id="app">

    <web-port-config v-if="!configured"></web-port-config>

    <div v-if="configured" class="side-panel-right">
      <server-info-panel class="server-info-panel"
                         v-show="show"></server-info-panel>
      <el-button class="side-panel__show-hide-button" @click="show = !show">
        <i class="el-icon-d-arrow-left"></i>
      </el-button>
    </div>

    <el-container v-if="configured" class="main-panel-container">
      <el-aside class="main-panel-side-menu" width="180px">
        <panel-nav-menu>
          <el-dropdown @command="handleLocaleChangeCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item v-for="(lang, index) in languages"
                                :key="`lang${index}}`"
                                :command="lang">
                {{ getFlags(lang) }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </panel-nav-menu>
      </el-aside>

      <el-main class="main-panel-view">
        <el-scrollbar style="height: 100%">
          <router-view></router-view>
        </el-scrollbar>

      </el-main>


    </el-container>
  </div>
</template>

<script>
  import PanelNavMenu from "@/views/PanelNavMenu";
  import ServerInfoPanel from "@/views/logging/ServerInfoPanel";
  import WebPortConfig from "@/modules/system/components/WebPortConfig";

  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {WebPortConfig, ServerInfoPanel, PanelNavMenu},
    data() {
      return {
        LOCALE_NAMES: {
          'en': 'English',
          'fr': 'Français',
          'zh-cn': '中文（简体）',
          'jp': '日本語',
        },

        languages: ['en', 'fr', 'zh-cn', 'jp'],

        show: true,

      }
    },

    computed: {
      ...mapGetters('system', ['configured'])
    },

    methods: {
      ...mapActions('system', ['test']),

      getFlags(locale) {
        return this.LOCALE_NAMES[locale];
      },

      handleLocaleChangeCommand(command) {
        this.$i18n.locale = command;
        this.$message.success('Locale -> ' + command);
      },

      handleConfigWebOptions() {
        // validate if input
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/style/base";

  .side-panel-right {
    background-color: #42b983;
    position: absolute;
    //top: 50%;
    right: 0;
    z-index: 255;
    height: 60%;

    .side-panel__show-hide-button {
      height: 60px;
      padding-left: 0;
      padding-right: 0;
      position: absolute;
      left: -15px;
      top: calc(50% - 30px);

      .is-panel-hide {

      }
      .is-panel-show {

      }
    }

    .server-info-panel {
      .is-panel-hide {

      }
      .is-panel-show {

      }
    }
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: whitesmoke;
    background-color: #2c3e50;
    height: 100%;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: whitesmoke;

      &.router-link-exact-active {
        color: #42b983;
      }

      flex: 1;
      width: 100%;
    }
  }
</style>
