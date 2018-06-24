<!--
  This component displayed an autocomplete place input
  V-model: Object
-->
<template>
  <v-select
    :loading="loading"
    :items="mapBoxResponse"
    :search-input.sync="search"
    v-model="select"
    prepend-icon="place"
    :label="$t('home.search.place')"
    autocomplete
    required
    flat
    dense
    return-object
    persistent-hint
  ></v-select>
  <!--<:rules="[() => select.length > 0 || 'You must choose at least one']" -->
</template>

<script>
  import axios from 'axios'
  export default {
    model: {
      prop: 'place',
      event: 'change'
    },
    watch: {
      search (val) {
        if (val && val.length >= 2) {
          let existVal = false
          this.mapBoxResponse.forEach((item) => {
            if (item.text === val) {
              existVal = true
            }
          })
          if (existVal || (this.select && val === this.select.text)) return
          this.querySelections(val)
        }
      },
      select (val) {
        this.$emit('change', {text: val.text, raw: val.value, coords: {lat: val.value.center[1], lon: val.value.center[0]}})
      }
    },
    props: {
      place: {
        type: Object
      }
    },
    data () {
      return {
        loading: false,
        mapBoxResponse: [],
        mapBoxResponseCached: [],
        search: null,
        select: null
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true
        axios.request({
          method: 'get',
          url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.search + '.json',
          params: {'limit': 5, 'access_token': process.env.mapBoxApiKey},
          headers: {
            'Accept': 'application/json'
          }
        }).then((response) => {
          // First construct a formatted result
          let mapBoxResponseFormattedItems = []
          response.data.features.forEach((item) => {
            mapBoxResponseFormattedItems.push({
              text: item.place_name,
              value: item
            })
          })
          this.mapBoxResponse = mapBoxResponseFormattedItems
        }).catch(function (e) {
          // null
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>