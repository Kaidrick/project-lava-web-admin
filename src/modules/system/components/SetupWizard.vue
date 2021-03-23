<template>
  <div class="lava-setup-wizard-wrapper">
    <div class="logo">
      <img alt="Vue logo" src="../../../../src/assets/logo.png">
    </div>

    <el-steps :active="wizardStep">
      <el-step v-for="(step, index) in wizardSteps"
               :key="index"
               :title="step.name" :status="step.status"></el-step>
    </el-steps>

    <div class="content">
      <component :is="currentStepComponent"></component>
    </div>

    <div class="wizard-operation-button-wrapper">
      <el-button size="small"
                 class="wizard-operation-button-wrapper__previous-button"
                 :class="{'active': wizardStep > 0}"
                 @click="wizardPreviousStep">PREVIOUS</el-button>
      <el-button size="small" @click="wizardNextStep">
        {{ isFinishStep ? 'DONE' : 'NEXT' }}
      </el-button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import wizards from './wizards';
  export default {
    name: "SetupWizard",

    components: {...wizards},

    data() {
      return {
        currentStepItem: null
      }
    },

    computed: {
      ...mapGetters('system', ['wizardStep', 'wizardSteps', 'isFinishStep', 'isInitialStep']),

      currentStepComponent() {
        if (this.currentStepItem) {
          let {componentName} = this.currentStepItem;
          return componentName
        } else {
          return 'Introduction'
        }

      }
    },

    methods: {
      ...mapActions('system', ['wizardNextStep', 'wizardPreviousStep']),
    },

    mounted() {
      this.currentStepItem = this.wizardSteps[0];

      console.log(this.components, 'this.components');
    }
  }
</script>

<style lang="scss" scoped>
  .lava-setup-wizard-wrapper {
    padding: 50px;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;

    .logo {
      margin: 20px auto;
    }

    .content {
      margin: 20px auto;
    }

    .wizard-operation-button-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .wizard-operation-button-wrapper__previous-button {
        &.active {
          visibility: visible;
        }

        visibility: hidden;
      }
    }
  }
</style>