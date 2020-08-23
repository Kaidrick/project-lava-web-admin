<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/lua">Lua Console</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/i18n">Localization</router-link>
    </div>
    <router-view/>

    <div>
      <p>{{ $t('message') }}</p>
      <div class="lang">
        <el-select v-model="$i18n.locale">
          <el-option v-for="(lang, index) in languages" :key="`lang${index}}`" :value="lang">
            {{ getFlags(lang) }}
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
