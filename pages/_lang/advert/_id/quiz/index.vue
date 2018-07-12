<!--
  This page display quiz of an advert
-->
<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm10 md6 lg4>
      <p>{{ $t('quiz.infoForAccess') }}</p>
      <v-form ref="form" v-model="valid" >
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          :label="$t('generics.email')"
          required
        ></v-text-field>
        <v-layout row wrap>
          <v-flex xs12 md3>
            <v-autocomplete
              :items="countryCodes"
              v-model="countryCode"
              :label="$t('generics.country')"
              :rules="[rules.required]"
              single-line
              required
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 md9>
            <v-text-field
              v-model="phone"
              :label="$t('generics.phone')"
              :rules="[rules.required, rules.phone]"
              :hint="hintPhone"
              required
              :disabled="countryCode.length < 2"
              @input="phoneChange"
              persistent-hint
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn :disabled="!valid" nuxt
               :to="{name: 'lang-advert-id-quiz-questions', params: {lang: $store.state.locale, id: $route.params.id}, query: {email: this.email, phone: this.phone, phoneCountry: this.countryCode}} | routeI18nReformat ">
          {{ $t('quiz.submit')}}
        </v-btn>
        <v-btn @click="clear">{{ $t('quiz.clear' )}}</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import countries from '~/vendors/countriesCode.js'
  import { AsYouType, isValidNumber, formatNumber, getNumberType } from 'libphonenumber-js'
  import Filters from '~/vendors/filters.js'
  export default {
    asYouType: null,
    filters: Filters,
    watch: {
      countryCode (val) {
        this.phone = ''
        this.$options.asYouType = new AsYouType(val)
      }
    },
    mounted () {
      Object.keys(countries).forEach((key) => {
        this.countryCodes.push({text: countries[key], value: key})
      })
    },
    data () {
      return {
        valid: false,
        email: '',
        phone: '',
        rules: {
          required: (value) => !!value || this.$t('generics.required'),
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || this.$t('generics.invalidEmail')
          },
          phone: (value) => {
            let isValid = isValidNumber(value, this.countryCode)
            if (isValid) {
              let numberType = getNumberType(value, this.countryCode)
              this.hintPhone = formatNumber({ country: this.countryCode, phone: value }, 'International')
              this.hintPhone += numberType && numberType.length > 0 ? (' (' + numberType.toLowerCase() + ')') : ''
              return true
            } else {
              this.hintPhone = ''
              return this.$t('generics.invalidPhone')
            }
          }
        },
        countryCodes: [],
        countryCode: '',
        hintPhone: ''
      }
    },
    methods: {
      phoneChange (event) {
        this.phone = new AsYouType(this.countryCode).input(event.toString())
      },
      clear () {
        this.email = ''
        this.countryCode = ''
      }
    }
  }
</script>