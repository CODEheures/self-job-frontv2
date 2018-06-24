<!--
  This page display quiz of an advert
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
    <v-flex xs12 sm10 md6 lg4>
      <p>questions</p>
      <v-form ref="form" v-model="valid" >

      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'

  export default {
    mounted () {
      if ('email' in this.$route.query &&
        'phone' in this.$route.query &&
        'phoneCountry' in this.$route.query
      ) {
        this.showQuiz()
      } else {
        this.snackBar.text = this.$t('home.search.errorApi')
        this.snackBar.display = true
      }
    },
    data () {
      return {
        valid: false,
        snackBar: {
          display: false,
          text: ''
        },
        questions: []
      }
    },
    methods: {
      showQuiz () {
        this.$root.$emit('xhr', true)
        Api.showQuiz(this.$route.params.id)
          .then((response) => {
            this.questions = response.data
          })
          .catch(() => {
            this.snackBar.text = this.$t('home.search.errorApi')
            this.snackBar.display = true
          })
          .finally(() => {
            this.$root.$emit('xhr', false)
          })
      }
    }
  }
</script>