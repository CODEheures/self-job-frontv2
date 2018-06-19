<template>
  <v-app>
    <v-navigation-drawer :mobile-break-point="mobileBreakPoint" :mini-variant.sync="miniVariant" v-model="drawer" fixed app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="miniVariant = !miniVariant">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile router exact :to="item.to" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-spacer></v-spacer>
        <v-list-tile>
          <v-btn icon @click.stop="miniVariant = !miniVariant" v-if="miniVariant">
            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="goBack" v-show="$route.name !== 'index'">
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
      <v-footer height="auto" style="width: 100%;" >
        <v-card
          flat
          tile
          class="indigo lighten-1 white--text text-xs-center xs12"
          width="100%"
        >
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              icon
              class="mx-3 white--text"
            >
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="white--text pt-0">
            {{ $t('footer.description') }}
          </v-card-text>
          <v-card-text class="white--text">
            &copy;2018 — <strong>SelfJob</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        miniVariant: true,
        mobileBreakPoint: 960,
        title: 'SelfJob',
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram']
      }
    },
    mounted () {
      if (process.client) {
        this.drawer = this.$vuetify.breakpoint.mdAndUp
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus">
  main.content > .content--wrap
    display:flex
    flex-flow row wrap
    align-content: space-between
</style>