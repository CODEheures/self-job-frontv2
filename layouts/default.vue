<template>
  <v-app>
    <v-navigation-drawer :mobile-break-point="mobileBreakPoint" :mini-variant.sync="miniVariant" v-model="drawer" fixed app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" v-if="$store.state.user.auth">
              <img src="~/assets/images/logonb.png" v-else>
            </v-list-tile-avatar>
            <v-list-tile-content v-if="$store.state.user.auth">
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="miniVariant = !miniVariant">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile nuxt exact :to="item.to" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-tooltip bottom>
              <span slot="activator"><v-icon v-html="item.icon"></v-icon></span>
              <span>{{ item.title }}</span>
            </v-tooltip>
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
      <v-toolbar-title v-text="title" class="mr-2"></v-toolbar-title>
      <v-avatar
        tile
        size="30"
      >
        <img src="~/assets/images/logo.png" alt="Vuetify.js" class="" />
      </v-avatar>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-snackbar
      :timeout="6000"
      top
      v-model="snackBar.display"
    >
      {{ snackBar.text }}
      <v-btn flat color="pink" @click.native="snackBar.display = false">{{ $t('generics.close')}}</v-btn>
    </v-snackbar>
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
    computed: {
      items () {
        let items = [
          { icon: 'apps', title: this.$t('home.search.title'), to: '/' }
        ]
        if (!this.$store.state.user.auth) {
          items.push({ icon: 'account_box', title: this.$t('login.title'), to: '/login' })
        } else {
          items.push({ icon: 'list', title: this.$t('mines.title'), to: '/adverts/mines' })
          items.push({ icon: 'exit_to_app', title: this.$t('logout.title'), to: '/logout' })
        }
        return items
      }
    },
    beforeMount () {
      // listen $xhr root event
      this.$root.$on('displaySnack', (payload) => {
        this.snackBar.text = payload
        this.snackBar.display = true
      })
    },
    data () {
      return {
        drawer: false,
        miniVariant: true,
        mobileBreakPoint: 960,
        title: 'SelfJob',
        icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
        snackBar: {
          display: false,
          text: ''
        }
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
  main.v-content
    background url("~/assets/images/background3.png") repeat
    & > .v-content__wrap
      display flex
      flex-flow row wrap
      align-content space-between
</style>