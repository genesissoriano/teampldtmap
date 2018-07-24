<template>
    <v-toolbar id="navbar">
    <v-toolbar-title>
        <img src="./../assets/logo.png" alt="">
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items fixed flat class=" mr-5 navi">
      <v-btn flat depressed :to="{name: 'dashboard'}">Dashboard</v-btn>
      <v-btn flat depressed :to="{name: 'ViewMap'}">View Map</v-btn>
      <v-btn flat depressed :to="{name: 'markers'}">Markers</v-btn>
      <v-btn flat depressed :to="{name: 'Subscribers'}">Subscribers</v-btn>
        <v-menu offset-y class="menuAccounts">
          <v-btn
            slot="activator"
            color=""
            dark
            flat
            depressed
          >
            Accounts
          </v-btn>
          <v-list>
            <v-list-tile
              :to="{name: 'Accounts'}"
            >
            <i class="material-icons">
            create
            </i>&nbsp;Accounts
            </v-list-tile>
            <v-list-tile
              :to="{name: 'Logout'}"
            >
            <img src="../assets/logout.svg" alt="" class="menuImg">
            &nbsp;Logout
            </v-list-tile>
          </v-list>
        </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
data: () => ({
      items: [
        { title: 'Create Accounts' },
        { title: 'Logout' }
      ]
    })
}
</script>


<style lang="sass" scoped>
#navbar
  position: fixed
  height: 6vh
  position: absolute
  padding: 0rem
  .navi
    height: 6vh
    position: fixed
    top: 0rem
    right: 0rem
  img
    width: 12vh !important
.menuImg
  width: 3vh !important
</style>
