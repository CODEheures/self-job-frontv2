<!--
  This page display answers of an advert
-->
<template>
  <v-layout justify-center align-center>
    <v-data-table
      :headers="headers"
      :items="answers"
      hide-actions
      disable-initial-sort
      class="elevation-1"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th :class="['column']">
            {{ $t('answers.answersTitle') }}
          </th>
          <th>
            <v-icon small>email</v-icon>
          </th>
          <th>
            <v-icon small>phone</v-icon>
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.score }}%</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="answers.length === 0" color="error" icon="warning">
          {{ $t('answers.emptyMessage')}}
        </v-alert>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'
  import Filters from '~/vendors/filters.js'
  export default {
    middleware: 'auth',
    filters: Filters,
    data () {
      return {
        answers: [],
        headers: [{}, {}, {}]
      }
    },
    mounted () {
      this.getAdvertAnswers()
    },
    methods: {
      async getAdvertAnswers () {
        try {
          this.$root.$emit('xhr', true)
          let response = await Api.getAdvertAnswers(this.$route.params.id, this.$store.state.user.token)
          this.answers = response.data
        } catch (e) {
          this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
        } finally {
          this.$root.$emit('xhr', false)
        }
      }
    }
  }
</script>
