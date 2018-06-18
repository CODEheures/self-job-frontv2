<!--
  This page display results of adverts search
  Call API on btn search click.
  Call next route if API result is not empty
-->
<template>
  <v-layout justify-center align-center>
    <v-snackbar
      :timeout="6000"
      top
      v-model="snackBar.display"
    >
      {{ snackBar.text }}
      <v-btn flat color="pink" @click.native="snackBar.display = false">{{ $t('generics.close')}}</v-btn>
    </v-snackbar>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 v-show="adverts.length === 0">
          <div class="text-xs-center">
            <img src="~/assets/images/logonb.png" alt="Vuetify.js" class="mb-5" />
          </div>
        </v-flex>
        <v-flex v-for="advert,index in adverts" :key="advert.id" xs12 md6 lg4 xl3>
          <v-card>
            <v-card-title>
              <span><v-icon>business</v-icon> {{ advert.company.name | capitalize }}</span>
              <v-spacer></v-spacer>
              <div>
                <span><v-icon>360</v-icon> {{ advert.mileage }}Km</span><br />
                <span><v-icon>schedule</v-icon> {{ formatMyDate(advert.created) }}</span>
              </div>
            </v-card-title>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ advert.title | capitalize }}</h3>
                <p>{{ advert.description.slice(0,90) + '...' | capitalize }}</p>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="orange" nuxt :to="{name: 'advert-id', params: {id: advert.id}}">{{ $t('generics.see') }}</v-btn>
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

  export default {
    data () {
      return {
        haveAFirstSubmited: false,
        adverts: [],
        totalHits: 0,
        snackBar: {
          display: false,
          text: ''
        }
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
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
            this.snackBar.text = this.$t('home.search.zeroResult')
            this.snackBar.display = true
          }
        } catch (e) {
          this.$root.$emit('xhr', false)
          this.snackBar.text = this.$t('home.search.errorApi')
          this.snackBar.display = true
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