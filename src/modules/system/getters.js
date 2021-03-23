export default {
    webConfig: state => state.webConfig,
    configured: state => state.configured,
    wizardRun: state => state.wizardRun,
    websocketConnected: state => state.websocketConnected,
    systemRouteMap: state => state.systemRouteMap,
    dataServiceResource: state => state.dataServiceResource,

    wizardStep: state => state.wizardStep,
    wizardSteps: state => state.wizardSteps,

    isFinishStep: state => state.wizardStep === state.wizardStepUpperLimit,
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
            localStorage.removeItem('access_token');
            return null;
        } else {
            return token;
        }
    }
}