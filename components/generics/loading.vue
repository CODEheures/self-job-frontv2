<template lang="html">
  <div class="loading-page" v-if="loading || xhr">
    <v-progress-linear :indeterminate="true"></v-progress-linear>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      xhr: false
    }),
    beforeMount () {
      // listen $xhr root event
      this.$root.$on('xhr', (payload) => {
        this.xhr = payload
      })
    },
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .loading-page
    position fixed
    top 0
    left 0
    width 100%
    text-align center
    font-size 30px
    font-family sans-serif
    z-index 200

    .v-progress-linear
      margin 0
</style>