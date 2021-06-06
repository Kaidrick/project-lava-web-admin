export default {
    setWebConfig: (state, webConfig) => state.webConfig = webConfig,
    setConfigured: (state, configured) => state.configured = configured,
    setWizardRun: (state, wizardRun) => {
        state.wizardRun = wizardRun;
        localStorage.setItem('wizard', wizardRun.toString());
    },
    setWebsocketConnected: (state, websocketConnected) => state.websocketConnected = websocketConnected,
    setSystemRouteMap: (state, systemRouteMap) => state.systemRouteMap = systemRouteMap,
    setDataServiceResource: (state, dataServiceResource) => state.dataServiceResource = dataServiceResource,

    setUserName: (state, username) => {
        localStorage.setItem('username', username);
    },

    setAccessToken: (state, token) => {
        localStorage.setItem('access_token', token)
    },

    setRefreshToken: (state, token) => {
        localStorage.setItem('refresh_token', token)
    },

    setSystemLocale: (state, locale) => {
        localStorage.setItem('locale', locale);
        state.systemLocale = locale;
    },

    setupWizardStep: (state, step) => state.wizardStep = step
}
