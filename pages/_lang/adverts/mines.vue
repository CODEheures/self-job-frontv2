<!--
  This page display results of auth user adverts
  TODO Edit (redirection page) + Answer response
-->
<template>
  <v-layout justify-center align-center>
    <v-dialog v-model="dialogDelete.visible" max-width="400" class="d-flex align-center">
      <v-card>
        <v-card-title class="headline" primary-title>{{ $t('mines.confirmDialogTitle') }}</v-card-title>
        <v-card-text>{{ $t('mines.confirmDialogMessage') }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialogDelete={visible: false, id: null}">{{ $t('mines.confirmDialogBtnCancel') }}</v-btn>
          <v-btn color="red ligthen-2" dark @click="delAdvert">{{ $t('mines.confirmDialogBtnConfirm') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="adverts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td><nuxt-link :to="$options.filters.routeI18nReformat({name: 'lang-advert-id', params: {lang: $store.state.locale, id: props.item.id}})">{{ props.item.title }}</nuxt-link></td>
        <td class="text-xs-center">
          <nuxt-link v-if="props.item.responses_count > 0" :to="$options.filters.routeI18nReformat({name: 'lang-advert-id-answers', params: {lang: $store.state.locale, id: props.item.id}})">{{ props.item.responses_count.toString() }}</nuxt-link>
          <span v-else>{{ props.item.responses_count.toString() }}</span>
        </td>
        <td class="text-xs-center">
          <v-icon v-if="props.item.is_publish" small @click="publishAdvert(props.item)">visibility</v-icon>
          <v-icon v-else small @click="publishAdvert(props.item)">visibility_off</v-icon>
        </td>
        <td class="justify-center layout px-0">
          <v-icon :disabled="!props.item.is_updatable" small @click="" class="mr-2">edit</v-icon>
          <v-icon :disabled="!props.item.is_deletable" small @click.stop="dialogDelete={visible: true, id: props.item.id}">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="adverts.length === 0" color="error" icon="warning">
          {{ $t('mines.emptyMessage')}}
        </v-alert>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
  import Api from '~/plugins/api.js'
  import Filters from '~/vendors/filters.js'
  import echo from '~/vendors/echo.js'
  export default {
    middleware: 'auth',
    filters: Filters,
    watch: {
      adverts () {
        echo.subscribeToAnswers(this.$echo, this.adverts, (id, responsesCount) => { this.updateAdvertResponseCount(id, responsesCount) })
      }
    },
    data () {
      return {
        adverts: [],
        headers: [
          {
            text: this.$t('mines.tableTh1'),
            align: 'left',
            value: 'title'
          },
          {
            text: this.$t('mines.tableTh2'),
            align: 'center',
            value: 'responses_count'
          },
          {
            text: this.$t('mines.tableTh3'),
            align: 'center',
            value: 'is_publish'
          },
          {
            text: this.$t('mines.tableTh4'),
            align: 'center',
            sortable: false
          }
        ],
        dialogDelete: {
          visible: false,
          id: null
        }
      }
    },
    mounted () {
      this.getMyAdverts()
      echo.subscribeToNewAdvert(this.$echo, this.$store.state.user.info.company.id, () => { this.getMyAdverts(true) })
    },
    methods: {
      async getMyAdverts (onBack = false) {
        try {
          this.$root.$emit('xhr', true)
          let response = await Api.getMyAdverts(this.$store.state.user.token)
          this.adverts = response.data
        } catch (e) {
          if (!onBack) {
            this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
          }
        } finally {
          this.$root.$emit('xhr', false)
        }
      },
      async publishAdvert (advert) {
        try {
          this.$root.$emit('xhr', true)
          await Api.publishAdvert(advert.id, !advert.is_publish, this.$store.state.user.token)
          await this.getMyAdverts()
        } catch (e) {
          this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
        } finally {
          this.$root.$emit('xhr', false)
        }
      },
      async delAdvert () {
        this.dialogDelete.visible = false
        try {
          this.$root.$emit('xhr', true)
          await Api.deleteAdvert(this.dialogDelete.id, this.$store.state.user.token)
          await this.getMyAdverts()
        } catch (e) {
          this.$root.$emit('displaySnack', this.$t('home.search.errorApi'))
        } finally {
          this.$root.$emit('xhr', false)
          this.dialogDelete.id = null
        }
      },
      updateAdvertResponseCount (id, responsesCount) {
        this.adverts.forEach((advert) => {
          if (advert.id === id) {
            advert.responses_count = responsesCount
          }
        })
      }
    }
  }
</script>
