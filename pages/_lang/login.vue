<!--
  This page display the login form
-->
<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">{{ $t('login.title') }}</v-card-title>
        <v-card-text>
          <v-form v-model="isComplete" v-if="!$store.state.user.auth">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              :label="$t('login.email')"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="hidePass ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidePass = !hidePass)"
              :type="hidePass ? 'password' : 'text'"
              :rules="[rules.required]"
              :label="$t('login.password')"
              required
            ></v-text-field>
          </v-form>
          <p v-else>{{ $t('login.alreadyConnected')}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="" :disabled="!isComplete" v-if="!$store.state.user.auth">{{ $t('login.title') }}</v-btn>
          <v-btn color="primary" flat @click="" v-else>{{ $t('login.logout') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        hidePass: true,
        isComplete: false,
        email: '',
        password: '',
        rules: {
          required: (value) => !!value || this.$t('generics.required'),
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || this.$t('generics.invalidEmail')
          }
        }
      }
    },
    methods: {

    }
  }
</script>
