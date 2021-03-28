import Vue from 'vue';

const vm = new Vue();

export default {
    // eslint-disable-next-line no-unused-vars
    handleStartWizard(context) {
        vm.$message.info("start wizard with default process");
    },

    // eslint-disable-next-line no-unused-vars
    wizardNextStep(context) {
        if (context.getters.isFinishStep) {
            vm.$message.success("configuration done!")

            // set wizard run to false
            context.commit('setWizardRun', false);
            return;
        }

        context.commit('setupWizardStep', context.getters.wizardStep + 1);
        vm.$message.info("current step is " + context.getters.wizardStep);
    },

    wizardPreviousStep(context) {
        if (context.getters.isInitialStep) return;

        const currentStep = context.getters.wizardStep;
        // step can only be equal or greater than zero
        context.commit('setupWizardStep', currentStep === 0 ? 0 : currentStep - 1);
        vm.$message.info("current step is " + context.getters.wizardStep);

    },

    switchCurrentStep(context, indexNumber) {
        context.commit('setupWizardStep', indexNumber);
        vm.$message.info("switching to " + context.getters.wizardStep);
    }
}