import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import ViewMap from '@/components/ViewMap'
import Markers from '@/components/Marker'
import Subscriber from '@/components/Subscriber'
import Accounts from '@/components/Accounts'
import Login from '@/components/Login'
import test from '@/components/Accounts/account_animation'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: main
    },
    {
      path: '/viewmap',
      name: 'ViewMap',
      component: ViewMap
    },
    {
      path: '/markers',
      name: 'markers',
      component: Markers
    },
    {
      path: '/subscribers',
      name: 'Subscribers',
      component: Subscriber
    },
    {
      path: 'accounts',
      name: 'Accounts',
      component: Accounts
    }
  ]
})
