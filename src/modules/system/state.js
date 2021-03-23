const wizardSteps = [
    {
        name: 'Step 0 - Introduction',
        description: 'Introduction',
        componentName: ''
    },
    {
        name: 'Step 1 - Ports',
        description: 'Configure TCP port numbers',
        componentName: ''
    },
    {
        name: 'Step 2 - GUI Preferences',
        description: 'Setup GUI side preferences',
        componentName: ''
    },
    {
        name: 'Step 3 - Welcome to Project Lava',
        description: 'You are done.',
        componentName: '',
        status: 'success'
    }
];

const wizardStepUpperLimit = wizardSteps.length - 1;
const wizardStepLowerLimit = 0;

export default {
    webConfig: {
        host: 'localhost',
        port: 8080
    },

    configured: false,

    wizardRun: !(localStorage.getItem('wizard')),

    websocketConnected: false,

    systemRouteMap: [],

    dataServiceResource: '',

    wizardStep: 0,

    wizardSteps,

    wizardStepUpperLimit,
    wizardStepLowerLimit
}