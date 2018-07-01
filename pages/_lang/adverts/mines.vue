<!--
  This page display results of auth user adverts
-->
<template>
  <v-layout justify-center align-center>
    <v-container fluid grid-list-lg pa-0>
      <v-layout row wrap>
        <p>Hello mes adverts</p>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'

  export default {
    middleware: 'auth',
    data () {
      return {
        adverts: []
      }
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
      }
    }
  }
</script>
