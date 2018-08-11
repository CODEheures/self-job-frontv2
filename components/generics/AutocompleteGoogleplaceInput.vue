<!--
  This component displayed an autocomplete place input
  V-model: Object
-->
<template>
  <v-text-field
    ref="place"
    v-model="formattedAddress"
    required
    clearable
    :label="$t('home.search.place')"
    :prepend-icon="!noicon ? 'place' : ''"
    @place="setPlace"
   />
</template>

<script>
  import { PlacesAutocomplete } from '~/plugins/placesAutocomplete.js'
  export default {
    model: {
      prop: 'place',
      event: 'change'
    },
    props: {
      place: {
        type: Object
      },
      noicon: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        googleResponse: {},
        formattedAddress: ''
      }
    },
    mounted () {
      if (process.client) {
        // Init autocomplete google place API
        let autoCompleteInput = this.$refs.place.$el.getElementsByTagName('input')[0]
        let clearIcon = this.$refs.place.$el.getElementsByTagName('i')[1]
        // eslint-disable-next-line no-unused-vars
        let AutoComplete = new PlacesAutocomplete(autoCompleteInput)
        // Add personal event change to input
        autoCompleteInput.addEventListener('keyup', (event) => {
          this.testChange(event)
        })
        autoCompleteInput.addEventListener('change', (event) => {
          this.testChange(event)
        })
        autoCompleteInput.addEventListener('blur', (event) => {
          this.restore(event)
        })
        clearIcon.addEventListener('click', (event) => {
          this.testChange(event)
        })
      }
    },
    methods: {
      setPlace (event) {
        // When choice in autocomplete
        this.googleResponse = event.detail
        this.formattedAddress = this.googleResponse.formatted_address
        this.$emit('change', {text: this.formattedAddress, raw: this.googleResponse, coords: {lat: this.googleResponse.geometry.location.lat(), lon: this.googleResponse.geometry.location.lng()}})
      },
      testChange (event) {
        // Emit empty place if empty input
        if (event.target.value === undefined || event.target.value === null || event.target.value === '') { this.$emit('change', {}) }
      },
      restore (event) {
        // restore google value if input not empty and value not match
        if (this.formattedAddress !== undefined && this.formattedAddress !== null && this.formattedAddress.length > 0 && this.formattedAddress !== this.googleResponse.formatted_address) { this.formattedAddress = this.googleResponse.formatted_address }
      }
    }
  }
</script>