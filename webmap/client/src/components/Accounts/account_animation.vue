<template>
    <v-autocomplete
      v-model="lcpnap"
      :items="items"
      :loading="isLoading"
      :search-input.sync="searchfacility"
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="addr"
      label="Search for lcp nap"
      solo
    >
      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-title>
            Search for your favorite
            <strong>Cryptocurrency</strong>
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template
        slot="selection"
        slot-scope="{ item, selected }"
      >
        <v-chip
          color="blue-grey"
          class="white--text"
          :selected="selected"
        >
          <v-icon left>mdi-coin</v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template
        slot="item"
        slot-scope="{ item, tile }"
      >
        <v-list-tile-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="item.addr"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-tile-action>
      </template>
    </v-autocomplete>
</template>


<script>
import axios from 'axios'
  export default {
    data: () => ({
      isLoading: false,
      items: [],
      lcpnap: null,
      searchfacility: null
    }),

    watch: {
      searchfacility (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

        // Lazily load input items
        axios.get('http://localhost:8081/markers')
          .then(res => {
            this.items = res.data.markers
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    }
  }
</script>