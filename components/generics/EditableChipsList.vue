<!--
  This component displayed an editable list of chips
  V-model: Array
-->
<template>
  <v-select
    v-model="dataList"
    :label="$t('home.search.searchs.label')"
    chips
    tags
    solo
    prepend-icon="format_list_bulleted"
    clearable
    @input="updateList"
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
  </v-select>
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
      },
      blurChips (event) {
        console.log('blur chips', event.target.value)
      }
    }
  }
</script>