<template>
  <e-modal v-bind="$attrs" v-on="$listeners" width="400px">
    <div class="px-4 py-8">
      <h1 class="text-4xl font-bold text-black text-center">{{ $t('auth.signIn') }}</h1>
      <p class="my-2 text-center text-lg">{{ $t('auth.dontHaveAccount') }}</p>
      <div class="text-center">
        <router-link class="link text-lg" :to="{name: $route.name, query: {modal: 'sign-up'}}">
          {{ $t('auth.signUp') }}
        </router-link>
      </div>
      <div
        v-show="current.matches('getCode')"
        class="mt-10">
        <form action="#" @submit.prevent="handleGetCode">
          <e-input
            v-model="phoneNumber"
            class="w-full"
            :label="$t('phoneNumber')"
            mask="+\9\9\8 99 999 99 99"
            @complete-change="handlePhoneMaskCompleteChange"/>

          <p v-if="current.matches('getCode.error')" class="my-1 text-red-500">
            Error on sending code. Please try again.
          </p>
          <e-button
            type="primary"
            class="w-full mt-10"
            color="primary"
            :disabled="isGetCodeBtnDisabled"
            :loading="current.matches('getCode.loading')"
          >
            {{ $t('auth.getTheCode') }}
          </e-button>
        </form>
      </div>
      <div v-show="current.matches('sendCode')" class="mt-10">
        <form action="#" @submit.prevent="handleSignIn">
          <e-input
            v-model="code"
            class="w-full"
            :label="$t('auth.verificationCode')"
            mask="9 9 9 9"
            @complete-change="handleCodeCompleteChange"/>
          <i18n path="auth.verificationCodeSendToNumber" tag="p" class="my-2 text-center text-lg">
            <template #phoneNumber>
              <span class="font-bold block">{{ phoneNumber }}</span>
            </template>
          </i18n>

          <i18n v-if="showCountDown" path="auth.canGetCodeAgain" tag="p" class="my-4">
            <template #seconds>
              <count-down :seconds="sendCodeDelay" @complete="isCountdownComplete=true">
                <template v-slot="{value}">
                  {{ value }}
                </template>
              </count-down>
            </template>
          </i18n>

          <e-button
            v-if="isCountdownComplete"
            type="button"
            class="w-full my-4"
            color="primary"
            @click="handleGetCodeAgain">
            {{ $t('auth.getTheCode') }}
          </e-button>

          <e-button
            type="submit"
            class="w-full"
            color="primary"
            :disabled="isSignInBtnDisabled"
            :loading="current.matches('sendCode.loading')">
            {{ $t('auth.signIn') }}
          </e-button>
        </form>
      </div>
    </div>
  </e-modal>
</template>

<script>
import { createMachine, interpret } from 'xstate';

import EModal from '@/components/ui/EModal.vue';
import EInput from '@/components/ui/EInput.vue';
import EButton from '@/components/ui/EButton.vue';
import CountDown from '@/components/CountDown.vue';

const toggleMachine = createMachine({
  id: 'login',
  initial: 'getCode',
  states: {
    getCode: {
      on: { SWITCH: 'sendCode' },
      initial: 'idle',
      states: {
        idle: {
          on: {
            SWITCH: 'loading',
          },
        },
        loading: {
          on: {
            ERROR: 'error',
          },
        },
        error: {
          on: {
            SWITCH: 'loading',
          },
        },
      },
    },
    sendCode: {
      initial: 'idle',
      on: {
        SWITCH: 'getCode',
        GET_CODE_AGAIN: 'getCode.loading',
      },
      states: {
        idle: {
          on: {
            SWITCH: 'loading',
          },
        },
        loading: {
          on: {
            ERROR: 'error',
          },
        },
        error: {
          on: {
            SWITCH: 'loading',
          },
        },
      },
    },
  },
});

export default {
  name: 'LoginModal',
  components: {
    CountDown,
    EButton,
    EInput,
    EModal,
  },
  data() {
    return {
      phoneNumber: undefined,
      code: undefined,
      isGetCodeBtnDisabled: true,
      isSignInBtnDisabled: true,
      toggleService: interpret(toggleMachine),
      current: toggleMachine.initialState,
      isCountdownComplete: false,
      sendCodeDelay: 180,
    };
  },
  computed: {
    showCountDown() {
      return this.current.matches('sendCode') && !this.isCountdownComplete;
    },
  },
  created() {
    this.toggleService
      .onTransition((state) => {
        this.current = state;
      })
      .start();
  },
  methods: {
    handlePhoneMaskCompleteChange(isComplete) {
      this.isGetCodeBtnDisabled = !isComplete;
    },
    handleCodeCompleteChange(isComplete) {
      this.isSignInBtnDisabled = !isComplete;
    },
    handleGetCode() {
      this.toggleService.send('SWITCH');
      setTimeout(() => {
        const success = Math.random() > 0.5;
        this.toggleService.send(success ? 'SWITCH' : 'ERROR');
      }, 2000);
    },
    handleGetCodeAgain() {
      this.toggleService.send('GET_CODE_AGAIN');
      this.isCountdownComplete = false;
      setTimeout(() => {
        this.toggleService.send('SWITCH');
      }, 2000);
    },
    handleSignIn() {
      this.toggleService.send('SWITCH');
      setTimeout(() => {
        if (this.code === '1 1 1 1') {
          this.$emit('close');
          this.toggleService.send('SWITCH');
          this.resetFields();
        }
      }, 1000);
    },
    resetFields() {
      this.phoneNumber = '';
      this.isCountdownComplete = false;
      this.isGetCodeBtnDisabled = true;
      this.isSignInBtnDisabled = true;
      this.code = '';
    },
  },
};
</script>

<style scoped>

</style>
