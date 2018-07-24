import Api from '@/services/Api'

export default {
  fetchMarkers () {
    return Api().get('markers')
  },

  fetchNapMarkers () {
    return Api().get('markers/nap')
  },

  fetchLcpMarkers () {
    return Api().get('markers/lcp')
  },

  fetchReservedMarkers () {
    return Api().get('markers/reserved')
  },

  fetchLCPMarkers (lpname) {
    return Api().get('markers/lcp/' + lpname)
  },

  getMarker (name) {
    return Api().get('markers/' + name)
  },

  fetchSubscribers () {
    return Api().get('subscribers')
  },

  getSubscriber (sip_no) {
    return Api().get('subscribers/' + sip_no)
  },

  addPost (params) {
    return Api().post('add_post', params)
  },

  editSubscriber (id) {
    return Api().put('subscribers/edit/' + id)
  },

  deleteSubscriber (id) {
    return Api().delete('subscribers/delete/' + id)
  }
}
