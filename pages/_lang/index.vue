<!--
  This page display searchCard with locality center, distance and keyword
  Call API on btn search click.
  Call next route if API result is not empty
-->
<template>
  <v-layout column justify-center align-center>
    <v-snackbar
      :timeout="6000"
      top
      v-model="snackBar.display"
    >
      {{ snackBar.text }}
      <v-btn flat color="pink" @click.native="snackbar.display = false">Close</v-btn>
    </v-snackbar>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="~/assets/images/logo.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-progress-linear :indeterminate="true" v-show="submit"></v-progress-linear>
        <v-card-title class="headline">{{ $t('home.search.title') }}</v-card-title>
        <v-card-text>
          <p>{{ $t('home.search.helper') }}</p>
          <autocomplete-place-input v-model="place" />
          <v-slider v-model="mileage" prepend-icon="360" max="250" ticks step="10" thumb-label validate-on-blur id="slide-distance"></v-slider>
          <editable-chips-list v-model="searchs"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="getResults" :disabled="!isComplete || submit">{{ $t('home.search.button') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import AutocompletePlaceInput from '~/components/generics/AutocompletePlaceInput'
  import EditableChipsList from '~/components/generics/EditableChipsList'
  import Api from '~/plugins/api.js'

  export default {
    components: {
      AutocompletePlaceInput,
      EditableChipsList
    },
    asyncData (ctx) {
      return {
        // apiDomain: Api.listRoutes()
      }
    },
    computed: {
      isComplete () {
        return 'geometry' in this.place &&
          'location' in this.place.geometry &&
          this.searchs.length > 0
      }
    },
    data () {
      return {
        mileage: 0,
        searchs: [],
        place: {},
        submit: false,
        haveAFirstSubmited: false,
        adverts: [],
        totalHits: 0,
        snackBar: {
          display: false,
          text: ''
        }
      }
    },
    mounted () {
      if (process.client) {
        // Place text after slider
        document.querySelector('#slide-distance .input-group__input .slider').dataset.after = this.$t('home.search.distance')
      }
    },
    methods: {
      async getResults () {
        try {
          this.submit = true
          let response = await Api.getAdverts(
            this.searchs,
            {latitude: this.place.geometry.location.lat(), longitude: this.place.geometry.location.lng()},
            {min: 0, max: this.mileage},
            0,
            this.$store.state.locale
          )
          this.submit = false
          this.adverts = response.data.adverts
          this.totalHits = response.data.totalHits
          this.haveAFirstSubmited = true
          if (this.totalHits === 0) {
            this.snackBar.text = this.$t('home.search.zeroResult')
            this.snackBar.display = true
          }
        } catch (e) {
          this.submit = false
          this.snackBar.text = this.$t('home.search.errorApi')
          this.snackBar.display = true
        }
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