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
      <h1 class="headline mb-2">{{ $t('quiz.quizTitle') }}</h1>
      <v-alert :value="true" outline color="info" icon="info">
        {{ $t('quiz.quizInfo') }}
      </v-alert>
      <template v-for="question, index in questions">
        <question-view
          :index="index"
          :question="question"
          v-model="answers[index]"
        ></question-view>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'
  import QuestionView from '~/components/generics/questions/view'
  import _ from 'lodash'
  export default {
    components: {
      QuestionView
    },
    watch: {
      answers () {
        this.testQuizValidity()
      }
    },
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
        questions: [],
        answers: []
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
      },
      testQuizValidity () {
        let answersNotUndefined = _.filter(this.answers, function (v) { return v !== undefined })
        this.quizIsValid = answersNotUndefined.length === this.questions.length
      }
    }
  }
</script>