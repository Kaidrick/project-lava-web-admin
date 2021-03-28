<template>
  <div class="wizard-introduction">
    <div class="system-language-selection">
<!--      <el-select v-model="testSelectedLocale">-->
<!--        <el-option v-for="(locale, index) in availableLocales"-->
<!--                   :key="index"-->
<!--                   :label="locale"-->
<!--                   :value="locale"></el-option>-->
<!--      </el-select>-->

      <el-button v-for="(locale, index) in availableLocaleNames"
                 :key="index"
                 class="locale-selection-button"
                 :class="{'current': locale === systemLocale}"
                 @click="handleClickSystemLocaleSelectionButton(locale)"
                 type="text">
        {{ nativeLangNameMap[locale] }} <!-- TODO: use translation map -->
      </el-button>
    </div>

    <article class="intro-content-wrapper">
      <p class="intro-content">{{ $t('wizard_welcome') }}</p>
      <p class="intro-content">{{ $t('wizard_description')}}</p>
      <p class="intro-content">{{ $t('wizard_content') }}</p>
      <p class="intro-content">{{ $t('wizard_next_instruction') }}</p>
    </article>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Introduction",

  data() {
    const nativeLangNameMap = {
      'en': 'English',
      'zh-cn': '简体中文',
      'fr': 'Français',
      'jp': '日本語'
    };

    return {
      availableLocaleNames: undefined,

      testSelectedLocale: '',

      nativeLangNameMap
    }
  },

  mounted() {
    const locales = require.context('../../../../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);

    this.availableLocaleNames = locales.keys()
        .map(k => k.match(/^(?:.\/)([A-z0-9-_]+)(?:\/.+\.json)$|^(?:.\/)([A-z0-9-_]+)(?:\.json)$/i))
        .map(g => Array.isArray(g) && g.length >= 3 ? (g[1] || g[2]) : null);

    this.availableLocaleNames = [...new Set(this.availableLocaleNames)];
  },

  computed: {
    ...mapGetters('system', ['systemLocale'])
  },

  methods: {
    ...mapActions('system', ['updateSystemLocale']),

    handleClickSystemLocaleSelectionButton(locale) {
      this.updateSystemLocale(locale);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .wizard-introduction {
    .system-language-selection {
      margin: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .locale-selection-button {
        flex: 1;
        padding: 10px;
        font-size: 24px;
        font-weight: bolder;

        &.current {
          background-color: #42b983;

          &:hover {
            background-color: #42b983;
          }
        }

        &:hover {
          background-color: $primary_light;
        }
      }
    }

    .intro-content-wrapper {
      padding: 20px;
      .intro-content {

      }
    }
  }
</style>