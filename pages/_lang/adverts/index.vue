<!--
  This page display results of adverts search
  Call API on btn search click.
  Call next route if API result is not empty
-->
<template>
  <v-layout justify-center align-center>
    <v-container fluid grid-list-lg pa-0>
      <v-layout row wrap>
        <v-flex xs12 v-show="adverts.length === 0">
          <div class="text-xs-center">
            <img src="~/assets/images/logonb.png" alt="Vuetify.js" class="mb-5" />
          </div>
        </v-flex>
        <v-flex v-for="advert,index in adverts" :key="advert.id" xs12 md6 lg4 xl3>
          <v-card>
            <v-card-title primary-title class="indigo lighten-1">
              <h3 class="headline mb-0 white--text">{{ advert.title | capitalize }} &#0149 {{ advert.contract | uppercase }}</h3>
              <v-spacer></v-spacer>
              <div class="hidden-sm-and-up caption white--text">
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
                <span class="hidden-xs-only">{{ advert.formatted_address }} <v-icon>place</v-icon><br /></span>
                <span>{{ advert.mileage }}Km <v-icon>360</v-icon></span><br />
                <span>{{ formatMyDate(advert.created) }} <v-icon>schedule</v-icon></span>
              </div>
            </v-card-title>
            <v-card-text>
              <p>{{ advert.description.slice(0,90) + '...' | capitalize }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="orange" nuxt :to="{name: 'lang-advert-id', params: {lang: $store.state.locale, id: advert.id}, query:{mileage: advert.mileage}} | routeI18nReformat ">{{ $t('generics.see') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'
  import moment from 'moment'
  import Filter from '~/vendors/filters.js'

  export default {
    data () {
      return {
        haveAFirstSubmited: false,
        adverts: [],
        totalHits: 0
      }
    },
    filters: Filter,
    mounted () {
      this.getResults()
    },
    methods: {
      async getResults () {
        try {
          this.$root.$emit('xhr', true)
          let response = await Api.getAdverts(
            this.$route.query.searchs,
            this.$route.query.position,
            this.$route.query.mileage,
            0,
            this.$store.state.locale
          )
          this.$root.$emit('xhr', false)
          this.adverts = response.data.adverts
          this.totalHits = response.data.totalHits
          this.haveAFirstSubmited = true
          if (this.totalHits === 0) {
            this.$root.$emit('displaySnack', this.$t('home.search.zeroResult'))
          }
        } catch (e) {
          this.$root.$emit('xhr', false)
          this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
        }
      },
      formatMyDate (myDate) {
        moment.locale(this.$store.state.locale)
        return moment(myDate).fromNow()
      }
    }
  }
</script>

<style lang="stylus">
  #slide-distance > .input-group__input > .slider
    &:after
      content attr(data-after)
      color #757575
      position absolute
      right 0
      bottom -8px
  .slider__thumb--label__container
    display block !important
    transition none
    & div.slider__thumb--label
      width 36px
      height 36px
      left -18px
      top -50px
      & span:after
        content "km"
</style>