<template>
  <div>
    <p>{{ $t('message') }}</p>
    <div class="lang">
      <el-select v-model="$i18n.locale">
        <el-option v-for="(lang, index) in languages" :key="`lang${index}}`" :value="lang">
          {{ lang }}
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloI18n',

  data() {
    return {
      languages: ['en', 'fr', 'zh']
    }
  }
}
</script>

<!--<i18n>-->
<!--{-->
<!--  "en": {-->
<!--    "hello": "Hello i18n in SFC!"-->
<!--  }-->
<!--}-->
<!--</i18n>-->
