<!--
 Display a question as of her type
 Props
  - index: integer for question number
  - question: object question
-->
<template>
  <div>
    <template v-if="question.type === 0">
      <question-type0-view
        :index="index"
        :question="question"
        :preview="preview"
        v-model="dataAnswer"
      ></question-type0-view>
    </template>
    <template v-if="question.type === 1">
      <question-type1-view
        :index="index"
        :question="question"
        :preview="preview"
        v-model="dataAnswer"
      ></question-type1-view>
    </template>
    <template v-if="question.type === 2">
      <question-type2-view
        :index="index"
        :question="question"
        :preview="preview"
        v-model="dataAnswer"
      ></question-type2-view>
    </template>
    <template v-if="question.type === 3">
      <question-type3-view
        :index="index"
        :question="question"
        :preview="preview"
        v-model="dataAnswer"
      ></question-type3-view>
    </template>
  </div>
</template>

<script>
  import QuestionType0View from '~/components/generics/questions/type0/View.vue'
  import QuestionType1View from '~/components/generics/questions/type1/View.vue'
  import QuestionType2View from '~/components/generics/questions/type2/View.vue'
  import QuestionType3View from '~/components/generics/questions/type3/View.vue'

  export default {
    components: {
      QuestionType0View,
      QuestionType1View,
      QuestionType2View,
      QuestionType3View
    },
    model: {
      prop: 'answer',
      event: 'change'
    },
    props: {
      index: Number,
      question: Object,
      preview: Boolean,
      answer: Object
    },
    watch: {
      dataAnswer () {
        this.$emit('change', this.dataAnswer === undefined ? undefined : {'order': this.question.order, 'answer': this.dataAnswer})
      }
    },
    data () {
      return {
        dataAnswer: undefined
      }
    }
  }
</script>
