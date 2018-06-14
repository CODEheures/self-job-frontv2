<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="~/assets/images/logo.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">{{ $t('home.search.title') }}</v-card-title>
        <v-card-text>
          <p>{{ $t('home.search.helper') }}</p>
          <hr class="my-3">
          <v-text-field id="place" name="place" :label="$t('home.search.place')" prepend-icon="place"/>
          <v-slider v-model="media" prepend-icon="360" max="250" ticks step="10" thumb-label validate-on-blur id="slide-distance"></v-slider>
          <v-select
            v-model="searchs"
            :label="$t('home.search.searchs.label')"
            chips
            tags
            solo
            prepend-icon="format_list_bulleted"
            clearable
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">{{ $t('home.search.button') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  // import Api from '~/plugins/api'
  export default {
    asyncData (ctx) {
      return {
        // apiDomain: Api.listRoutes()
      }
    },
    data () {
      return {
        media: 0,
        searchs: []
      }
    },
    mounted () {
      if (process.client) {
        document.querySelector('#slide-distance .input-group__input .slider').dataset.after = this.$t('home.search.distance')
      }
    },
    methods: {
      remove (item) {
        this.searchs.splice(this.searchs.indexOf(item), 1)
        this.searchs = [...this.searchs]
      }
    }
  }
</script>

<style lang="stylus">
  #slide-distance > .input-group__input > .slider
    &:after
      content attr(data-after)
      color #757575
      position absolute
      right 0
      bottom -8px
  .slider__thumb--label__container
    display block !important
    transition none
    & div.slider__thumb--label
      width 36px
      height 36px
      left -18px
      top -50px
      & span:after
        content "km"
</style>