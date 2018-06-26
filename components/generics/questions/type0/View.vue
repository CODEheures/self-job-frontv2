<!--
  Display a view of question Type 0: Radio buttons
  v-model: Number
-->
<template>
  <v-card>
    <v-card-title class="indigo lighten-1 white--text">
      <h3 class="headline mb-0">{{ $t('questions.common.questionCardTitle') }} {{ index +1 }}</h3>
      <v-spacer></v-spacer>
      <v-chip color="orange" text-color="white" v-if="preview">
        {{ $t('questions.common.questionCardtype.preview') }}
        <v-icon right color="white">format_paint</v-icon>
      </v-chip>
    </v-card-title>
    <v-card-title v-if="library==='private'" class="indigo lighten-5">
      <v-layout d-flex column >
        <v-radio-group v-model="question.library_type" :label="$t('questions.common.questionVisibilityLabel')">
          <v-radio
            :label="$t('questions.common.questionTypePrivate')"
            :value="0"
          ></v-radio>
          <v-radio
            :label="$t('questions.common.questionTypeCorporate')"
            :value="1"
          ></v-radio>
          <v-radio
            :label="$t('questions.common.questionTypePublic')"
            :value="2"
          ></v-radio>
        </v-radio-group>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-radio-group v-model="option" :hint="$t('questions.0.field_helper')" persistent-hint :label="question.form.label">
        <v-radio v-for="questionOption,key in question.form.options" :key="key"
          :label="questionOption.label"
          :value="questionOption.value"
        ></v-radio>
      </v-radio-group>
    </v-card-text>
    <v-card-actions v-if="library">
      <v-btn color="orange" flat @click="$emit('addQuestion')">{{ $t('generics.add') }}</v-btn>
      <v-btn color=orange v-if="library==='private'" flat @click="$emit('removeOfLibrary')">{{ $t('generics.remove') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    model: {
      prop: 'answer',
      event: 'change'
    },
    props: {
      question: Object,
      index: Number,
      answer: Number,
      preview: {
        type: Boolean,
        required: false,
        default: false
      },
      library: {
        type: String,
        required: false,
        default: undefined
      }
    },
    watch: {
      option () {
        this.$emit('change', this.option)
      }
    },
    data () {
      return {
        option: -1
      }
    }
  }
</script>

<style>
</style>
