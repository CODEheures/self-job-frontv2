<template>
  <v-layout column justify-center align-center>
    <v-snackbar
      :timeout="6000"
      top
      v-model="snackBar.display"
    >
      {{ snackBar.text }}
      <v-btn flat color="pink" @click.native="snackBar.display = false">{{ $t('generics.close')}}</v-btn>
    </v-snackbar>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">{{ $t('home.search.title') }}</v-card-title>
        <v-card-text>
          <p>{{ $route.params.id }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="">{{ $t('home.search.button') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'
  import moment from 'moment'

  export default {
    data () {
      return {
        advert: undefined,
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
      this.getAdvert()
    },
    methods: {
      async getAdvert () {
        try {
          this.$root.$emit('xhr', true)
          let response = await Api.showAdvert(this.$route.params.id)
          this.$root.$emit('xhr', false)
          this.advert = response.data
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