<template>
  <q-card>
    <q-card-title class="bg-secondary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <q-icon v-if="dataQuestion.isValid" name="thumb up" color="white" size="20px"></q-icon>
      <q-icon v-if="!dataQuestion.isValid" name="thumb down" color="warning" size="20px"></q-icon>
      <p slot="right" class="text-white">{{ strings.questionCardtype.constructor }}</p>
    </q-card-title>
    <q-card-main>
      <q-field>
        <q-input v-model="dataQuestion.datas.label" type="text" :float-label="strings.label_helper" clearable @change="emitChange" />
      </q-field>
      <p>{{ strings.label_helper2 }}</p>
      <draggable-input-list v-model="wantedTerms" />
      <p>{{ strings.label_helper3 }}</p>
      <draggable-input-list v-model="unwantedTerms" />
    </q-card-main>
    <q-card-actions>
      <q-btn flat @click="removeQuestion">{{ strings.remove }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  /**
   * v-model: question
   * Props
   *  - strings: array of strings for i18n
   *  - index: integer for question number
   *
   * Events:
   *  - @removeQuestion
   */
  import DraggableInputList from '../../../generics/DraggableInputList.vue'
  import _ from 'lodash'

  export default {
    components: {
      DraggableInputList
    },
    model: {
      prop: 'question',
      event: 'change'
    },
    props: {
      strings: Object,
      question: Object,
      index: Number
    },
    data () {
      return {
        dataQuestion: _.cloneDeep(this.question),
        wantedTerms: this.getList(this.question.datas.wantedTerms),
        unwantedTerms: this.getList(this.question.datas.unwantedTerms)
      }
    },
    watch: {
      wantedTerms () {
        this.updateWantedList()
        this.emitChange()
      },
      unwantedTerms () {
        this.updateUnwantedTerms()
        this.emitChange()
      }
    },
    mounted () {
      this.emitChange()
    },
    methods: {
      getList (options) {
        let list = []
        options.forEach((item) => {
          list.push(item.label)
        })
        return list
      },
      updateWantedList () {
        let newWantedList = []
        this.wantedTerms.forEach((item) => {
          newWantedList.push({label: item})
        })
        this.dataQuestion.datas.wantedTerms = newWantedList
      },
      updateUnwantedTerms () {
        let newUnwantedTerms = []
        this.unwantedTerms.forEach((item) => {
          newUnwantedTerms.push({label: item})
        })
        this.dataQuestion.datas.unwantedTerms = newUnwantedTerms
      },
      testIfValid () {
        let isValid = true
        if (this.dataQuestion.datas.label.length === 0) {
          isValid = false
        }
        if (this.dataQuestion.datas.wantedTerms.length + this.dataQuestion.datas.unwantedTerms.length < 1) {
          isValid = false
        }
        this.dataQuestion.isValid = isValid
        return isValid
      },
      removeQuestion () {
        this.$emit('removeQuestion', this.index)
      },
      emitChange () {
        let newQuestion = _.cloneDeep(this.dataQuestion)
        newQuestion.form = _.cloneDeep(newQuestion.datas)
        newQuestion.isValid = this.testIfValid()
        this.$emit('change', newQuestion)
      }
    }
  }
</script>

<style>
</style>
