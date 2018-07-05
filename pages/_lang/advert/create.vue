<!--
  This page display form to add advert
-->
<template>
  <v-layout justify-center align-center>
    <v-dialog v-model="dialogQuit" max-width="400" class="d-flex align-center">
      <v-card>
        <v-card-title class="headline" primary-title>{{ $t('create.quitDialogTitle') }}</v-card-title>
        <v-card-text>{{ $t('create.quitDialogMessage') }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialogQuit = false">{{ $t('generics.cancel') }}</v-btn>
          <v-btn color="red ligthen-2" dark nuxt :to="$options.filters.routeI18nReformat({name: 'lang-adverts-mines', params: {lang: $store.state.locale}})">{{ $t('generics.quit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs12 sm8 md6>
      <v-stepper v-model="step" vertical>
        <v-stepper-step editable :complete="step > 1" step="1">
          {{ $t('create.stepOneTitle') }}
          <small>{{ $t('create.stepOneSubTitle') }}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="step = 2">{{ $t('generics.continue') }}</v-btn>
          <v-btn flat @click="dialogQuit = true">{{ $t('generics.cancel') }}</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">
          {{ $t('create.stepTwoTitle') }}
          <small>{{ $t('create.stepTwoSubTitle') }}</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="step = 3">{{ $t('generics.valid') }}</v-btn>
          <v-btn flat @click="dialogQuit = true">{{ $t('generics.cancel') }}</v-btn>
        </v-stepper-content>

      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
  // import AutocompleteGoogleplaceInput from '~/components/generics/AutocompleteGoogleplaceInput'
  // import AutocompleteMapboxInput from '~/components/generics/AutocompleteMapboxInput'
  // import EditableChipsList from '~/components/generics/EditableChipsList'
  // import _ from 'lodash'
  import Filters from '~/vendors/filters.js'
  export default {
    middleware: 'auth',
    filters: Filters,
    data () {
      return {
        dialogQuit: false,
        step: 1
      }
    }
  }
</script>
