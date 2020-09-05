<template>
  <div id="app">
    <el-container class="main-panel-container" style="border: 1px solid #eee">
      <el-aside class="main-panel-side-menu">
        <panel-nav-menu></panel-nav-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
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
          <div>
            <div class="lang">
              <el-select v-model="$i18n.locale">
                <el-option v-for="(lang, index) in languages" :key="`lang${index}}`" :value="lang">
                  {{ getFlags(lang) }}
                </el-option>
              </el-select>
            </div>
          </div>
        </el-header>

        <el-main>
          <keep-alive include="LuaConsole">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import PanelNavMenu from "@/views/PanelNavMenu";
  export default {
    components: {PanelNavMenu},
    data() {
      return {
        LOCALE_NAMES: {
          'en': 'English',
          'fr': 'Français',
          'zh-cn': '中文（简体）',
          'jp': '日本語',
        },

        languages: ['en', 'fr', 'zh-cn', 'jp']
      }
    },

    methods: {
      getFlags(locale) {
        return this.LOCALE_NAMES[locale];
      },

      handleLocaleChangeCommand(command) {
        this.$i18n.locale = command;
        this.$message.success('Locale -> ' + command);
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: whitesmoke;

    //::v-deep button,
    //input,
    //select,
    //textarea {
    //  font-family: inherit;
    //  font-size: inherit;
    //  line-height: inherit;
    //  color: #2c3e50;
    //}

    a {
      //color: aqua;
    }

    background-color: #2c3e50;

    .main-panel-container {
      height: 100vh;

      .main-panel-side-menu {
        width: 180px !important;
        height: 100%;
      }
    }
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
