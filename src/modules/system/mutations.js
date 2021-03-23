export default {
    setWebConfig: (state, webConfig) => state.webConfig = webConfig,
    setConfigured: (state, configured) => state.configured = configured,
    setWizardRun: (state, wizardRun) => state.wizardRun = wizardRun,
    setWebsocketConnected: (state, websocketConnected) => state.websocketConnected = websocketConnected,
    setSystemRouteMap: (state, systemRouteMap) => state.systemRouteMap = systemRouteMap,
    setDataServiceResource: (state, dataServiceResource) => state.dataServiceResource = dataServiceResource,
    setAccessToken: (state, token) => {
        localStorage.setItem('access_token', token)
    },

    setRefreshToken: (state, token) => {
        localStorage.setItem('refresh_token', token)
    },

    setupWizardStep: (state, step) => state.wizardStep = step,
}
