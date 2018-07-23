<template>
  <q-card>
    <q-card-title class="bg-tertiary text-white">
      {{ strings.title }}
    </q-card-title>
    <q-card-main>
      <q-collapsible icon="live help" :label="strings.example">
        <q-field
          :helper="strings.field_helper"
          :label="example.label">
          <q-input
            v-model="response"
            type="textarea"
            :float-label="strings.float_helper"
            :min-rows="3"
          />
        </q-field>
      </q-collapsible>
    </q-card-main>
    <q-card-actions>
      <q-btn flat @click="addQuestion">{{ strings.add }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  export default {
    props: {
      strings: Object,
      example: Object
    },
    data () {
      return {
        response: ''
      }
    },
    methods: {
      addQuestion () {
        this.$emit('addQuestion')
      }
    }
  }
</script>

<style>
</style>
