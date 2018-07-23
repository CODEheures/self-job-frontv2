<!--
  This component displayed an editable list of chips
  V-model: Array
  Events:
    - @progress: value of the input before validate it on chips
-->
<template>
  <v-combobox
    v-model="dataList"
    :label="$t('home.search.searchs.label')"
    chips
    multiple
    solo
    prepend-icon="format_list_bulleted"
    clearable
    @input="updateList"
    @update:searchInput="$emit('progress', $event)"
  >
    <template slot="selection" slot-scope="data">
      <v-chip
        :selected="data.selected"
        close
        @input="remove(data.item)"
        color="primary"
        outline
      >
        <strong>{{ data.item }}</strong>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
  import _ from 'lodash'
  export default {
    model: {
      prop: 'list',
      event: 'change'
    },
    props: {
      list: {
        type: Array
      }
    },
    watch: {
      list () {
        this.dataList = _.clone(this.list)
      }
    },
    data () {
      return {
        dataList: _.clone(this.list)
      }
    },
    methods: {
      updateList () {
        let newList = _.clone(this.dataList)
        this.$emit('change', newList)
      },
      remove (item) {
        this.dataList.splice(this.dataList.indexOf(item), 1)
        this.dataList = [...this.dataList]
        this.updateList()
      }
    }
  }
</script>