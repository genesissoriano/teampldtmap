<template>
  <div>
    <div>
    <v-layout mt-5>
    <v-container mt-3>
      <v-layout align-center justify-center>
        <v-flex xs12 lg2 s3>
          <v-card>
            <v-card-title primary-title>
              <v-layout row-wrap>
                <v-flex md6 class="text-md-left">
                  <h3>LCP</h3>
                </v-flex>
                <v-flex md6 class="text-md-right">
                  <img src="../assets/tower.svg">
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-container>
              <v-layout row-wrap>
                <v-flex md12 class="text-md-left">
                  <h1>{{lcps.length}}</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <v-flex xs12 lg2 ml-3>
          <v-card>
            <v-card-title primary-title>
              <v-layout row-wrap>
                <v-flex md6 class="text-md-left">
                  <h3>NAP</h3>
                </v-flex>
                <v-flex md6 class="text-md-right">
                  <img src="../assets/electric-tower.svg">
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-container>
              <v-layout row-wrap>
                <v-flex md12 class="text-md-left">
                  <h1>{{naps.length}}</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <v-flex xs12 lg2 ml-3>
          <v-card>
            <v-card-title primary-title>
              <v-layout row-wrap>
                <v-flex md6 class="text-md-left">
                  <h3>RESERVED</h3>
                </v-flex>
                <v-flex md6 class="text-md-right">
                  <img src="../assets/signal-tower.svg">
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-container>
              <v-layout row-wrap>
                <v-flex md12 class="text-md-left">
                  <h1>{{reserved.length}}</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <v-flex xs12 lg2 ml-3>
          <v-card>
            <v-card-title primary-title>
              <v-layout row-wrap>
                <v-flex md6 class="text-md-left">
                  <h3>Subscribers</h3>
                </v-flex>
                <v-flex md6 class="text-md-right">
                  <img src="../assets/group.svg">
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-container>
              <v-layout row-wrap>
                <v-flex md12 class="text-md-left">
                  <h1>{{subscribers.length}}</h1>
                </v-flex>
              </v-layout>
              <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn 
      slot="activator" 
      color="red"
      dark
      small
      absolute
      bottom
      left
      fab
      >
      <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <i class="material-icons">
            person_add
          </i>
          &nbsp;&nbsp;&nbsp;
          <span class="headline">Add Subscriber</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Telephone no."></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="LCP"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['1', '2', '3', '4', '5', '6', '7', '8']"
                  label="NAP"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="PORT" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="Address" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['FIBR', 'DSL', '1299', '1399', '2800']"
                  label="Subscription"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Date Installed"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
  </div>
    <div>
      <v-container>
        <v-layout justify-center align-center>
          <v-flex xs12 md12 lg9 s3>
            <v-card>
                <v-card-title class="nav">
                Report
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    class="search-data"
                ></v-text-field>
                </v-card-title>
                <v-data-table
                :headers="headers"
                :items="subscribers"
                :search="search"
                >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.lcp }}</td>
                    <td class="text-xs-center">{{ props.item.nap }}</td>
                    <td class="text-xs-center">{{ props.item.nap }}</td>
                    <td class="text-xs-center">{{ props.item.subscribers }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
                </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
  </v-container>
  </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService'
  export default {
    data () {
      return {
        date: null,
        menu: false,
        modal: false,
        menu2: false,
        dialog: false,
        search: '',
        headers: [
          { 
          text: 'LCP',
          align: 'center',
          sortable: true,
          value: 'lcp'
          },
          { 
          text: 'NAP USED', 
          align: 'center',
          value: ''
          },
          { 
          text: 'RESERVED', 
          align: 'center',
          value: ''
          },
          { 
          text: 'SUBSCRIBERS', 
          align: 'center',
          value: 'subscribers' 
          }
        ],
        subscribers: [],
        markers: [],
        naps: [],
        lcps: [],
        reserved: []
      }
    },
    mounted () {
      this.getSubcribers(),
      this.getMarkers(),
      this.getNapMarkers(),
      this.getLcpMarkers(),
      this.getReservedMarkers()
    },

    updated () {
      this.getNapMarkers(),
      this.getLcpMarkers(),
      this.getReservedMarkers()
    },

    methods: {
      async getSubcribers () {
        const response = await DataService.fetchSubscribers()
        this.subscribers = response.data.subscribers
      },
      async getMarkers () {
        const response = await DataService.fetchMarkers()
        this.markers = response.data.markers
      },
      async getNapMarkers () {
        const response = await DataService.fetchNapMarkers()
        this.naps = response.data.markers
      },
      async getLcpMarkers () {
        const response = await DataService.fetchLcpMarkers()
        this.lcps = response.data.markers
      },
      async getReservedMarkers () {
        const response = await DataService.fetchReservedMarkers()
        this.reserved = response.data.markers
      }
    }
  }
</script>

<style lang="sass" scoped>
img
  width: 5vh
</style>
