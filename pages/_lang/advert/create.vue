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
          <v-card color="grey lighten-5" class="mb-5">
            <v-form ref="form" v-model="valid">
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="advert.title"
                      :label="$t('create.form.title')"
                      clearable
                      :rules="[rules.required]"
                    ></v-text-field>
                    <v-text-field
                      v-model="advert.contract"
                      :label="$t('create.form.contract')"
                      clearable
                      :rules="[rules.required]"
                    ></v-text-field>
                    <autocomplete-mapbox-input v-model="advert.place" noicon/>
                    <v-textarea
                      v-model="advert.description"
                      auto-grow
                      rows="1"
                      :rules="[rules.required]"
                      :label="$t('create.form.description')"
                    ></v-textarea>
                    <v-combobox
                      v-model="advert.tags"
                      :items="advert.tags"
                      :label="$t('create.form.tags')"
                      chips
                      clearable
                      multiple
                      small-chips
                      hide-selected
                      :rules="[rules.requiredList]"
                      validate-on-blur
                    >
                      <template slot="selection" slot-scope="tag">
                        <v-chip
                          label
                          color="pink"
                          text-color="white"
                          :selected="tag.selected"
                          close
                          @input="removeTag(tag.item)"
                        >
                          <v-icon color="white" left>label</v-icon>
                          {{ tag.item }}
                        </v-chip>
                      </template>
                    </v-combobox>
                    <v-combobox
                      v-model="advert.requirements"
                      :items="advert.requirements"
                      :label="$t('create.form.requirements')"
                      chips
                      clearable
                      multiple
                      small-chips
                      hide-selected
                      :rules="[rules.requiredList]"
                      validate-on-blur
                    >
                      <template slot="selection" slot-scope="requirement">
                        <div class="mr-4">
                          <v-icon>check_box</v-icon>
                          {{ requirement.item }}
                          <v-icon @click="removeRequirement(requirement.item)">close</v-icon>
                          <br />
                        </div>

                      </template>
                    </v-combobox>
                    <v-divider class="mt-5"></v-divider>
                    <v-subheader>{{ $t('create.form.options') }}</v-subheader>
                    <div>
                      <uploader></uploader>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card>
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
  import AutocompleteMapboxInput from '~/components/generics/AutocompleteMapboxInput'
  import Filters from '~/vendors/filters.js'
  import Uploader from '~/components/generics/Uploader'

  export default {
    middleware: 'auth',
    filters: Filters,
    components: {
      AutocompleteMapboxInput,
      Uploader
    },
    data () {
      return {
        dialogQuit: false,
        step: 1,
        valid: false,
        advert: {
          title: '',
          description: '',
          contract: '',
          tags: [],
          requirements: [],
          place: {
            formatted_address: '',
            lat: '',
            lon: ''
          },
          is_internal_private: false
        },
        rules: {
          required: (value) => !!value || this.$t('generics.required'),
          requiredList: (value) => value.length > 0 || this.$t('generics.required')
        },
        myFiles: []
      }
    },
    methods: {
      removeTag (item) {
        this.advert.tags.splice(this.advert.tags.indexOf(item), 1)
        this.advert.tags = [...this.advert.tags]
      },
      removeRequirement (item) {
        this.advert.requirements.splice(this.advert.requirements.indexOf(item), 1)
        this.advert.requirements = [...this.advert.requirements]
      }
    }
  }
</script>
