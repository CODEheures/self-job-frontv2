<!--
  This page display searchCard with locality center, distance and keyword
  Call adverts page on click button
-->
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="~/assets/images/logo.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">{{ $t('home.search.title') }}</v-card-title>
        <v-card-text>
          <p>{{ $t('home.search.helper') }}</p>
          <autocomplete-mapbox-input v-model="place" />
          <v-slider v-model="mileage" prepend-icon="360" :min="10" :max="mileageStop" ticks step="10" thumb-label validate-on-blur id="slide-distance"></v-slider>
          <editable-chips-list v-model="searchs" @progress="progressChips = $event"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="toResults" :disabled="!isComplete">{{ $t('home.search.button') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  // import AutocompleteGoogleplaceInput from '~/components/generics/AutocompleteGoogleplaceInput'
  import AutocompleteMapboxInput from '~/components/generics/AutocompleteMapboxInput'
  import EditableChipsList from '~/components/generics/EditableChipsList'
  import _ from 'lodash'
  export default {
    components: {
      // AutocompleteGoogleplaceInput,
      AutocompleteMapboxInput,
      EditableChipsList
    },
    computed: {
      isComplete () {
        return 'coords' in this.place
      }
    },
    data () {
      return {
        mileage: 0,
        mileageStop: 250,
        searchs: [],
        place: {},
        progressChips: null
      }
    },
    mounted () {
      if (process.client) {
        // Place text after slider
        document.querySelector('#slide-distance .input-group__input .slider').dataset.after = this.$t('home.search.distance')
      }
    },
    methods: {
      toResults () {
        let params = {
          'searchs': this.progressChips !== null ? _.uniq((this.searchs).concat(this.progressChips)) : this.searchs,
          'position': {latitude: this.place.coords.lat, longitude: this.place.coords.lon},
          'mileage': {min: 0, max: this.mileage, stop: this.mileageStop}
        }
        this.$router.push({path: '/adverts', query: params})
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