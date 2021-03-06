<template>
  <div class="lava-setup-wizard-wrapper">
    <div class="logo">
      <img class="logo__image-display" alt="Vue logo" :src="lavaLogo">
    </div>

    <div class="wizard-step-bar-wrapper">
      <el-steps class="wizard-step-bar" align-center :active="wizardStep" finish-status="success">
        <el-step v-for="(step, index) in wizards"
                 :key="index"
                 :title="step.name" >
          <template slot="title">
            <el-button class="clickable-step-title"
                       type="text" @click="switchCurrentStep(index)">{{ $t(step.name) }}</el-button>
          </template>
        </el-step>
      </el-steps>
    </div>

    <div class="content">
      <el-scrollbar style="height: 100%">
        <component :is="currentStepComponent"></component>
      </el-scrollbar>
    </div>

    <div class="wizard-operation-button-wrapper">
      <div class="start">
        <el-button size="medium"
                   class="wizard-operation-button-wrapper__skip-button"
                   :class="{'active': wizardStep === 0}"
                   @click="wizardSkipAndUseDefaultSettings">
          {{ $t('SKIP AND USE DEFAULT') }}
        </el-button>
      </div>

      <div class="end">
        <el-button size="medium"
                   class="wizard-operation-button-wrapper__previous-button"
                   :class="{'active': wizardStep > 0}"
                   @click="wizardPreviousStep">
          {{ $t('BACK') }}
        </el-button>

        <el-button size="medium"
                   class="wizard-operation-button-wrapper__next-button"
                   @click="wizardNextStep">
          {{ $t(isFinishStep ? 'DONE' : 'NEXT') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import lavaLogo from '@/assets/lava-logo.svg';
  import {mapActions, mapGetters} from 'vuex';
  import wizards from './wizards';
  export default {
    name: "SetupWizard",

    components: {...wizards},

    data() {
      return {
        wizards: Object.values(wizards),
        lavaLogo
      }
    },

    computed: {
      ...mapGetters('system', [
          'wizardStep', 'wizardComponents',
        'isFinishStep', 'isInitialStep']),

      currentStepComponent() {
        try {
          return Object.values(wizards)[this.wizardStep].name
        } catch (e) {
          console.log(e);
          return 'Introduction';
        }
      }
    },

    methods: {
      ...mapActions('system',
          ['wizardNextStep', 'wizardPreviousStep',
            'switchCurrentStep', 'wizardSkipAndUseDefaultSettings']),

      testComponent() {
        console.log(wizards);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .lava-setup-wizard-wrapper {
    padding: 50px 250px;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      margin: 20px auto;

      height: 200px;
      display: flex;
      justify-content: center;

      .logo__image-display {
        //width: 200px;
        //height: 200px;
      }
    }

    .wizard-step-bar-wrapper {
      height: 80px;
      display: flex;
      width: 100%;

      .wizard-step-bar {
        margin: auto;
        width: 100%;

        .clickable-step-title {
          font-size: 18px;
        }
      }
    }

    ::v-deep .el-steps {
      .el-step__head {
        color: whitesmoke;
        border-color: whitesmoke;

        .el-step__icon {
          color: #42b983;
        }

        &.is-success {

          border-color: #42b983;

          .el-step__icon {
            color: whitesmoke;
            background-color: #42b983;
          }
        }

        &.is-process {
          .el-step__icon {
            color: whitesmoke;
            background-color: #42b983;
          }
        }

        &.is-finish {
          color: #42b983;
          border-color: #42b983;
        }
      }

      .el-step__main {
        .el-step__title {
          font-weight: bolder;

          &.is-wait {
            color: #606366;
          }

          &.is-success {
            color: #42b983;
          }

          &.is-process {
            color: whitesmoke;
          }

          &.is-finish {
            color: #42b983;
          }
        }
      }
    }

    .content {
      margin: 20px;
      height: calc(100vh - 480px);
    }

    .wizard-operation-button-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 20px;
      position: absolute;
      bottom: 0;
      width: calc(100% - 540px);

      .start {
        .wizard-operation-button-wrapper__skip-button {
          &.active {
            visibility: visible;
          }

          visibility: hidden;

          border: 1px solid $secondary_light;
          background-color: transparent;
        }
      }

      .end {
        .wizard-operation-button-wrapper__previous-button {
          &.active {
            visibility: visible;
          }

          visibility: hidden;
        }
      }

      .el-button {
        width: 200px;
      }
    }
  }
</style>