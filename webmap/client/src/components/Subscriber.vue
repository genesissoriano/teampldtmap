<template>
  <v-container mt-5>
    <div>
    <v-toolbar>
      <i class="material-icons">
          people
      </i>
      <v-toolbar-title>Subscribers</v-toolbar-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        class="mx-5"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog2" persistent max-width="500px">
      <v-btn slot="activator" color="deep-orange darken-4" dark class="mb-2"><i class="material-icons">
          person_add
        </i>&nbsp; &nbsp; Add Subscriber
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add Subscriber</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Telephone no." v-model="tel_no" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Name" v-model="subsname"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="address"
                  label="Address"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Package" v-model="package_type" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-menu
                  :close-on-content-click="false"
                  v-model="menudate"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    hint=" Date Installed (MM/DD/YYYY)"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" no-title @input="menudate = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex s12 sm12 md12>
                <v-autocomplete
                  v-model="LCP_NAP_search"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search_facility"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="LCP-NAP"
                  solo
                >
                  <template slot="no-data">
                    <v-list-tile>
                      <v-list-tile-title>
                        Search for your facility
                        <strong>LCP NAP</strong>
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
                    <v-list-tile-content
                      class="tile-search"
                    >
                      <v-list-tile-title v-text="item.name"></v-list-tile-title>
                      <v-list-tile-sub-title 
                      v-text="item.addr"
                      class="sub_addr"
                      ></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>mdi-coin</v-icon>
                    </v-list-tile-action>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex s12 sm12 md12>
                <v-text-field label="Port" v-model="port_no" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog2 = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog2 = false" @click="submit" type="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.sip_no" label="Telephone no." class="input-subscriber"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.addr" label="Address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.package" label="Package"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.d_installed" label="Date Installed"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.lcpnap" label="LCP-NAP"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.port" label="PORT"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="subscribers"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.sip_no }}</td>
        <td class="text-center">{{ props.item.name }}</td>
        <td class="text-center">{{ props.item.addr }}</td>
        <td class="text-center">{{ props.item.package }}</td>
        <td class="text-center">{{ props.item.d_installed }}</td>
        <td class="text-center">{{ props.item.lcpnap }}</td>
        <td class="text-center">{{ props.item.port }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item,props.item._id)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
  </v-container>
</template>
<script>
import axios from 'axios'
import { error } from 'util'
import DataService from '@/services/DataService'
  export default {
    data: () => ({
      pagination: {
        rowsPerPage: 10
      },
      isLoading: false,
      items: [],
      tel_no: '',
      port_no: '',
      subsname: '',
      address: '',
      package_type: '',
      date: null,
      dateFormatted: null,
      menudate: false,
      LCP_NAP_search: null,
      search_facility: null,
      menu: false,
      dialog2: false,
      dialog: false,
      search: null,
      headers: [
        { text: 'TELEPHONE NO.', value: 'sip_no', align: 'center' },
        { text: 'NAME', value: 'name', align: 'center' },
        { text: 'ADDRESS', value: 'addr', align: 'center' },
        { text: 'PACKAGE', value: 'package', align: 'center' },
        { text: 'DATE INSTALLED', value: 'd_installed', align: 'center' },
        { text: 'LCP/NAP', value: 'nap', align: 'center' },
        { text: 'PORT', value: 'port', align: 'center' },
        { text: 'ACTION', value: null, align: 'center' }
      ],
      subscribers: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        sip_no: 0,
        name: '',
        addr: '',
        package: '',
        d_installed: '',
        lcpnap: '',
        port: ''
      },
      defaultItem: {
        _id: '',
        sip_no: '',
        name: '',
        addr: '',
        package: '',
        d_installed: '',
        lcpnap: '',
        port: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Subscriber' : 'Edit Information'
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      search_facility (val) {
        // Items have already been loaded
        if (this.items.length > 0) return
        this.isLoading = true

        // Lazily load input items
        axios.get('http://localhost:8081/markers/nap')
          .then(res => {
            this.items = res.data.markers
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => (this.isLoading = false))
      },
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    mounted () {
      this.getSubscribers()
    },

    methods: {
      async getSubscribers () {
        const response = await DataService.fetchSubscribers()
        this.subscribers = response.data.subscribers
        console.log(this.subscribers)
      },
      async getSubscriber (sip) {
        const response = await DataService.getSubscriber(sip)
        return response.data.subscribers
      },
      // add subscriber
      submit() {
        var response
        var newsub = {
          sip_no: this.tel_no,
          name: this.subsname,
          addr: this.address,
          package: this.package_type,
          d_installed: this.date,
          lcpnap: this.LCP_NAP_search,
          port: this.port_no
        }
        axios.post('http://localhost:8081/addsubscriber', newsub)
        .then(
          response = DataService.getSubscriber(this.tel_no)
        ).then(resp => {
          newsub = resp.data
          this.subscribers.push(newsub)
          console.log(this.subscribers)
        })
        .catch(error => {
          console.log(error);
        })
      },

      editItem (item) {
        this.editedIndex = this.subscribers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item, id) {
        var response
        const index = this.subscribers.indexOf(item)
          console.log(index)
          // alert('Are you sure you want to delete this item?') && this.subscribers.splice(index, 1)
        axios.delete('http://localhost:8081/subscribers/delete/'+id)
        .then(() => {
          this.subscribers.splice(index, 1)
        })
        .catch(error => {
          console.log(error);
        })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.subscribers[this.editedIndex], this.editedItem)
          axios.put('http://localhost:8081/subscribers/edit/'+this.editedItem._id, this.editedItem)
          .catch(error => {
            console.log(error);
          })
        } else {
          this.subscribers.push(this.editedItem)
          }
        this.close()
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}.${day}.${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('.')
        return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`
      }
    }
  }
</script>

<style lang="sass" scoped>
td
    cursor: pointer
.tile-search
  max-width: 20vw !important
  .sub_addr
    font-size: 0.8rem !important
    max-width: 20vw !important
</style>
