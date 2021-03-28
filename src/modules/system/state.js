import wizards from './components/wizards';

const wizardStepUpperLimit = Object.values(wizards).length - 1;
const wizardStepLowerLimit = 0;

const wizardRun = localStorage.getItem('wizard');

export default {
    systemLocale: 'en',

    webConfig: {
        host: 'localhost',
        port: 8080
    },

    configured: false,

    wizardRun: (wizardRun === null || wizardRun === undefined) ? true : wizardRun === 'true',

    websocketConnected: false,

    systemRouteMap: [],

    dataServiceResource: '',

    wizardStep: 0,

    wizardComponents: wizards,

    wizardStepUpperLimit,
    wizardStepLowerLimit
}