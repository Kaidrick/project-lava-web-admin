export default {
    webConfig: state => state.webConfig,
    configured: state => state.configured,
    wizardRun: state => state.wizardRun,
    websocketConnected: state => state.websocketConnected,
    systemRouteMap: state => state.systemRouteMap,
    dataServiceResource: state => state.dataServiceResource,

    wizardStep: state => state.wizardStep,
    wizardSteps: state => state.wizardSteps,

    wizardComponents: state => state.wizardComponents,

    isFinishStep: state => state.wizardStep === state.wizardStepUpperLimit + 1,  // allow last step to be marked as finished
    isInitialStep: state => state.wizardStep === state.wizardStepLowerLimit,

    accessToken: () => {
        const token = localStorage.getItem('access_token')
        if (token === 'undefined') {
            localStorage.removeItem('access_token');
            return null;
        } else {
            return token;
        }
    },

    refreshToken: () => {
        const token = localStorage.getItem('refresh_token')
        if (token === 'undefined') {
            localStorage.removeItem('refresh_token');
            return null;
        } else {
            return token;
        }
    },

    userName: () => localStorage.getItem('username'),

    systemLocale: state => state.systemLocale || localStorage.getItem('locale') || 'en'
}