import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

// eslint-disable-next-line no-unused-vars
function loadLocaleMessages () {
  const locales = require.context('./locales', false, /[A-Za-z0-9-_,\s]+\.json$/i)

  console.log(locales.keys(), 'load locale messages -> locales')

  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}


function loadLocalizedMessagesSortedByFolder() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);

  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/^(?:.\/)([A-z0-9-_]+)(?:\/.+\.json)$|^(?:.\/)([A-z0-9-_]+)(?:\.json)$/i)
    // console.log(matched[1] || matched[2], '<-- matched');
    if (matched && matched.length > 1) {
      const locale = matched[1] || matched[2];  // use first or second matching rule result
      messages[locale] = messages[locale] || {};  // to avoid undefined field

      for (const messageKey in locales(key)) {
        if (Object.prototype.hasOwnProperty.call(locales(key), messageKey)) {
          messages[locale][messageKey] = locales(key)[messageKey];
        }
      }
    }
  })
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocalizedMessagesSortedByFolder()
})
