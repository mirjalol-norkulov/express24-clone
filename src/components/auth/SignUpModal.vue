<template>
  <e-modal v-bind="$attrs" v-on="$listeners" width="400px">
    <div class="px-4 py-8">
      <h1 class="text-4xl font-bold text-black text-center">{{ $t('auth.signUp') }}</h1>
      <div v-if="!isPhoneNumberValid" class="my-4">
        <p class="text-center">
          {{ $t('auth.alreadyHaveAccount') }}
        </p>
        <p class="text-center">
          <router-link class="link" :to="{name: $route.name, query: {modal: 'sign-in'}}">
            {{ $t('auth.signIn') }}
          </router-link>
        </p>
      </div>

      <form
        class="mt-4"
        v-show="current.matches('signUp')"
        action="#" @submit.prevent="handleRegister">
        <e-input class="w-full mb-6" v-model="name" :label="$t('auth.yourName')"/>
        <e-input
          class="w-full mb-2"
          :unmasked-value.sync="phoneNumber"
          :is-complete.sync="isPhoneNumberValid"
          :label="$t('phoneNumber')"
          mask="+\9\9\8 99 999 99 99"/>

        <e-checkbox
          class="mt-4"
          :label="$t('auth.iAcceptUserAgreement')"
          v-model="isUserAgreementAccepted"/>

        <e-button
          color="primary"
          class="w-full mt-6"
          type="submit"
          :disabled="isSignUpBtnDisabled"
          :loading="current.matches('signUp.loading')">
          {{ $t('auth.signUp') }}
        </e-button>
      </form>

      <form
        class="mt-4"
        v-show="current.matches('signIn')"
        action="#"
        @submit.prevent="handleSignIn">
        <e-input
          :unmasked-value.sync="code"
          :is-complete.sync="isCodeValid"
          class="w-full"
          :label="$t('auth.verificationCode')"
          mask="9 9 9 9"
        />
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
          :loading="current.matches('signIn.loading')">
          {{ $t('auth.signIn') }}
        </e-button>
      </form>

      <i18n
        path="auth.byRegisteringYouWillAccept"
        tag="p"
        class="mt-3 text-center text-sm text-gray">
        <template #userAgreement>
          <router-link :to="{name: 'user-agreement'}" class="link font-normal">
            {{ $t('auth.userAgreement') }}
          </router-link>
        </template>
      </i18n>
    </div>
  </e-modal>
</template>

<script>
import EModal from '@/components/ui/EModal.vue';
import EInput from '@/components/ui/EInput.vue';
import ECheckbox from '@/components/ui/ECheckbox.vue';
import EButton from '@/components/ui/EButton.vue';
import CountDown from '@/components/CountDown.vue';

import { createMachine, interpret } from 'xstate';

const toggleMachine = createMachine({
  id: 'signUp',
  initial: 'signUp',
  states: {
    signUp: {
      initial: 'idle',
      on: {
        SWITCH: 'signIn',
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
    signIn: {
      initial: 'idle',
      on: {
        GET_CODE_AGAIN: 'signUp.loading',
      },
      states: {
        idle: {
          on: { SWITCH: 'loading' },
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
  name: 'SignUpModal',
  components: {
    EButton,
    ECheckbox,
    EInput,
    EModal,
    CountDown,
  },
  data() {
    return {
      toggleService: interpret(toggleMachine),
      current: toggleMachine.initialState,
      name: '',
      phoneNumber: '',
      isPhoneNumberValid: false,
      code: '',
      isCodeValid: false,
      isUserAgreementAccepted: false,
      sendCodeDelay: 180,
      isCountdownComplete: false,
    };
  },
  computed: {
    isSignUpBtnDisabled() {
      return !(this.isPhoneNumberValid && this.isUserAgreementAccepted);
    },
    isSignInBtnDisabled() {
      return !this.isCodeValid;
    },
    showCountDown() {
      return this.current.matches('signIn') && !this.isCountdownComplete;
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
    handleRegister() {
      this.toggleService.send('SWITCH');
      setTimeout(() => {
        this.toggleService.send('SWITCH');
      }, 1000);
    },
    handleSignIn() {
    },
    handleGetCodeAgain() {
      this.toggleService.send('GET_CODE_AGAIN');
    },
  },
};
</script>

<style scoped>

</style>
