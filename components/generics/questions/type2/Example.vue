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
          <draggable-list
            :list="list"
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
  import DraggableList from '../../DraggableList.vue'
  export default {
    components: {
      DraggableList
    },
    props: {
      strings: Object,
      example: Object
    },
    data () {
      return {
        option: []
      }
    },
    computed: {
      list: {
        get () {
          let list = []
          this.example.options.forEach((item) => {
            list.push(item.label)
          })
          return list
        },
        set () {
          console.log('list bouge')
        }
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
