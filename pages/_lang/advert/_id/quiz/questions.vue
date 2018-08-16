<!--
  This page display quiz of an advert
-->
<template>
  <v-layout justify-center align-center>
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
  import QuestionView from '~/components/generics/questions/View.vue'
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
        this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
      }
    },
    data () {
      return {
        valid: false,
        questions: [],
        answers: []
      }
    },
    methods: {
      async showQuiz () {
        try {
          this.$root.$emit('xhr', true)
          let response = await Api.showQuiz(this.$route.params.id)
          this.questions = response.data
        } catch (e) {
          this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
        } finally {
          this.$root.$emit('xhr', false)
        }
      },
      testQuizValidity () {
        let answersNotUndefined = _.filter(this.answers, function (v) { return v !== undefined })
        this.quizIsValid = answersNotUndefined.length === this.questions.length
      }
    }
  }
</script>