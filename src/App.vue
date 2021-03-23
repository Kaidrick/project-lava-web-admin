<template>
  <div id="app">

    <web-port-config v-if="!configured && !wizardRun"></web-port-config>

    <setup-wizard v-if="wizardRun"></setup-wizard>

    <side-dock-panel :visible="configured">
      <server-info-panel></server-info-panel>
    </side-dock-panel>

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
  import WebPortConfig from "@/modules/system/components/LoginConfig";

  import { mapGetters, mapActions } from 'vuex';
  import SideDockPanel from "@/components/SideDockPanel";
  import ServerInfoPanel from "@/views/logging/ServerInfoPanel";
  import SetupWizard from "@/modules/system/components/SetupWizard";

  export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {SetupWizard, ServerInfoPanel, SideDockPanel, WebPortConfig, PanelNavMenu},
    data() {
      return {
        LOCALE_NAMES: {
          'en': 'English',
          'fr': 'Français',
          'zh-cn': '中文（简体）',
          'jp': '日本語',
        },

        languages: ['en', 'fr', 'zh-cn', 'jp'],
      }
    },

    computed: {
      ...mapGetters('system', ['configured', 'wizardRun'])
    },

    mounted() {
      // eslint-disable-next-line no-debugger
      // debugger;
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
