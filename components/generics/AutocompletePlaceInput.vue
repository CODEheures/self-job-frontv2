<!--
  This component displayed an autocomplete place input
  Props:
  Events:
    @newPlace:
      When: input place change
      What: emit place object
-->
<template>
  <v-text-field
    ref="place"
    v-model="place"
    required
    clearable
    :label="$t('home.search.place')"
    prepend-icon="place"
    @place="setPlace"
   />
</template>

<script>
  import { PlacesAutocomplete } from '~/plugins/placesAutocomplete.js'
  export default {
    data () {
      return {
        googleResponse: {},
        place: ''
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
        this.place = this.googleResponse.formatted_address
        this.$emit('newPlace', this.googleResponse)
      },
      testChange (event) {
        // Emit empty place if empty input
        if (event.target.value === undefined || event.target.value === null || event.target.value === '') { this.$emit('newPlace', {}) }
      },
      restore (event) {
        // restore google value if input not empty and value not match
        if (this.place !== undefined && this.place !== null && this.place.length > 0 && this.place !== this.googleResponse.formatted_address) { this.place = this.googleResponse.formatted_address }
      }
    }
  }
</script>