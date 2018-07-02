<!--
  This page display the login form
-->
<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">{{ $t('logout.information') }} <span v-for="i in (compteur % 4)">.</span></v-card-title>
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
        compteur: 1
      }
    },
    mounted () {
      if (process.client && this.$store.state.user.auth && this.$store.state.user.token) {
        this.logout()
      } else {
        this.$root.$emit('displaySnack', this.$t('logout.isAlreadyLogout'))
        this.$router.push({path: '/'})
      }
    },
    methods: {
      logout () {
        this.$root.$emit('xhr', true)
        let interval = setInterval(() => {
          this.compteur++
        }, 1000)
        Api.logout(this.$store.state.user.token)
          .finally(() => {
            clearInterval(interval)
            this.$root.$emit('displaySnack', this.$t('logout.isLogout'))
            document.cookie = process.env.tokenCookieName + this.$store.state.user.token + '; expires=' + moment().subtract(1, 'days').toDate() + '; path=/'
            setTimeout(() => {
              this.$router.push({path: '/'})
            }, 1000)
            this.$root.$emit('xhr', false)
          })
      }
    }
  }
</script>
