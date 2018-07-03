<!--
  This page display an advert and call quiz after requirements validation by user
-->
<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm10 md6 lg4>
      <v-card v-if="advert !== undefined" class="elevation-12">
        <v-card-title primary-title class="indigo lighten-1">
          <h3 class="headline mb-0 white--text">{{ advert.title | capitalize }} &#0149 {{ advert.contract | uppercase}}</h3>
          <v-spacer></v-spacer>
          <div class="caption white--text">
            <v-icon color="white">place</v-icon> {{ advert.formatted_address }}
          </div>
        </v-card-title>
        <v-card-title>
          <div>
            <v-avatar tile size="75">
              <img src="~/assets/images/logonb.png" />
            </v-avatar>
            <div class="caption">{{ advert.company.name | capitalize }}</div>
          </div>
          <v-spacer></v-spacer>
          <div class="text-xs-right caption grey--text text--lighten-1">
            <span>{{ $route.query.mileage }}Km <v-icon>360</v-icon></span><br />
            <span>{{ formatMyDate(advert.created_at) }} <v-icon>schedule</v-icon></span>
          </div>
        </v-card-title>
        <v-card-media ref="mediaCard" v-if="advert.pictureUrl" :src="advert.pictureUrl" :height="heightMediaCard + 'px'" v-resize="onResize"></v-card-media>
        <v-card-text class="text-xs-right">
          <v-chip label color="pink" text-color="white" v-for="tag,index in advert.tags" :key="index">
            <v-icon color="white" left>label</v-icon>{{ tag }}
          </v-chip>
        </v-card-text>
        <v-card-text>
          <p style="white-space: pre-wrap">{{ advert.description | capitalize }}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>{{ $t('advert.requirements') | capitalize }}</v-subheader>
          <v-list-tile avatar v-for="requirement,index in advert.requirements" :key="'req' + index">
            <v-list-tile-action>
              <v-checkbox v-model="check[index]" @change="testAllChecked"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ requirement }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-text>
          <transition name="slide-x-transition" mode="out-in">
            <v-alert :value="true" :type="allChecked ? 'success' : 'info'" :key="'alert-' + allChecked.toString()">
              {{ allChecked ? $t('advert.allChecked') : $t('advert.allUnchecked') }}
            </v-alert>
          </transition>
        </v-card-text>


        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" nuxt :to="{name: 'lang-advert-id-quiz', params: {lang: $store.state.locale, id: advert.id}} | routeI18nReformat" :disabled="!allChecked">{{ $t('advert.button') }}</v-btn>
        </v-card-actions>
      </v-card>
      <div class="text-xs-center" v-else>
        <img src="~/assets/images/logonb.png" alt="Vuetify.js" class="mb-5" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'
  import moment from 'moment'
  import Filters from '~/vendors/filters.js'

  export default {
    data () {
      return {
        advert: undefined,
        heightMediaCard: 200,
        check: [],
        allChecked: false
      }
    },
    filters: Filters,
    mounted () {
      this.getAdvert()
    },
    methods: {
      async getAdvert () {
        try {
          this.$root.$emit('xhr', true)
          let response = await Api.showAdvert(this.$route.params.id)
          this.$root.$emit('xhr', false)
          response.data.requirements.forEach((req, index) => {
            this.check[index] = false
          })
          this.advert = response.data
        } catch (e) {
          this.$root.$emit('xhr', false)
          this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
        }
      },
      formatMyDate (myDate) {
        moment.locale(this.$store.state.locale)
        return moment(myDate).fromNow()
      },
      onResize () {
        let mediaWidth = this.$refs.mediaCard.$el.clientWidth
        this.heightMediaCard = 9 / 16 * mediaWidth
      },
      testAllChecked () {
        let result = true
        this.check.forEach((value) => { result = result && value })
        this.allChecked = result
      }
    }
  }
</script>
