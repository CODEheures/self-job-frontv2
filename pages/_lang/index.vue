<!--
  This page display searchCard with locality center, distance and keyword
  Call API on btn search click.
  Call next route if API result is not empty
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
          <autocomplete-place-input v-model="place" />
          <v-slider v-model="mileage" prepend-icon="360" max="250" ticks step="10" thumb-label validate-on-blur id="slide-distance"></v-slider>
          <editable-chips-list v-model="searchs"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="" :disabled="!isComplete">{{ $t('home.search.button') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import AutocompletePlaceInput from '~/components/generics/AutocompletePlaceInput'
  import EditableChipsList from '~/components/generics/EditableChipsList'
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
        place: {}
      }
    },
    mounted () {
      if (process.client) {
        // Place text after slider
        document.querySelector('#slide-distance .input-group__input .slider').dataset.after = this.$t('home.search.distance')
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