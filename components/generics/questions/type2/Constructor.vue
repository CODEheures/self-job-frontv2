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
      <draggable-input-list v-model="list" />
      <p>{{ strings.label_helper2 }}</p>
      <draggable-list v-model="rankingList" />
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
  import DraggableList from '../../../generics/DraggableList.vue'
  import _ from 'lodash'

  export default {
    components: {
      DraggableList,
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
        list: this.getList(this.question.datas.options),
        rankingList: this.getRankingList(this.question.datas.options)
      }
    },
    watch: {
      list () {
        this.updateOptions()
        this.rankingList = this.getRankingList(this.dataQuestion.datas.options)
        this.emitChange()
      },
      rankingList () {
        this.updateOptions()
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
      getRankingList (options) {
        let list = []
        // clone because sorting affect object by reference
        let cloneOptions = _.cloneDeep(options)
        cloneOptions
          .sort((item1, item2) => {
            return item1.rank - item2.rank
          })
          .forEach((item) => {
            list.push(item.label)
          })
        return list
      },
      getRanking (item, index) {
        let rank = this.rankingList.indexOf(item)
        if (rank !== -1) {
          return [rank]
        }
        else {
          return [index]
        }
      },
      updateOptions () {
        let newOptions = []
        this.list.forEach((item, index) => {
          newOptions.push({label: item, value: index, rank: this.getRanking(item, index)})
        })
        this.dataQuestion.datas.options = newOptions
      },
      testIfValid () {
        let isValid = true
        if (this.dataQuestion.datas.label.length === 0) {
          isValid = false
        }
        if (this.dataQuestion.datas.options.length < 2) {
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
        newQuestion.form.options.forEach(item => {
          delete item.rank
          delete item.value
        })
        newQuestion.isValid = this.testIfValid()
        this.$emit('change', newQuestion)
      }
    }
  }
</script>

<style>
</style>
