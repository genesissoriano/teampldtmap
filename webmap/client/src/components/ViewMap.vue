<template>
    <div>
        <v-layout row-wrap>
            <v-flex lg9>
                <div id="myMap"></div>
            </v-flex>
            <v-flex lg3>
                <v-card class="v_card">
                    <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="markers"
                    :search="search"
                    hide-actions
                    hide-headers
                    >
                    <template slot="items" slot-scope="props">
                        <td @click="panToMarker(props.item.name, props.item.position.lat, props.item.position.lng)" class="text-xs-left td_header">{{ props.item.name }}<br><span class="desc">{{ props.item.addr }}</span></td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>


<script>
import DataService from '@/services/DataService'
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Addr',
            sortable: false,
            value: 'addr'
          }
        ],
        markers: [],
        map: null
      }
    },

    created () {
        this.getMarkers(),
        $(document).ready(function() {        
				function Get(yourUrl){
					var Httpreq = new XMLHttpRequest(); // a new request
					Httpreq.open("GET",yourUrl,false);
					Httpreq.send(null);
					return Httpreq.responseText;          
				}

				var mks = JSON.parse(Get("http://localhost:8081/markers"));

				window.map = new google.maps.Map(document.getElementById('myMap'), {
					center: {lat:17.3346992, lng: 120.6602026},
					zoom: 9,
					minZoom: 7,
					mapTypeId: google.maps.MapTypeId.HYBRID
                })
                
				var iconSuffix = '';
				for (var i = 0; i < mks.markers.length; i++) {
					var mID = mks.markers[i]._id
					var iconBase = 'http://localhost:8081/icon_'

					var iconBase = 'http://localhost:8081/icon_'
					if(/NP7/.test(mks.markers[i].name) && /nap/.test(mks.markers[i].type)) {
						iconSuffix = '7';
					} else if (/NP8/.test(mks.markers[i].name) && /nap/.test(mks.markers[i].type)) {
						iconSuffix = '8';
					} else {
						iconSuffix = '';
					}

					var showRemoveBtn = 
						`<button name="remove-marker" class="remove-marker"
							style="background-color: #618772;
								color: #ffffff;
									height: 2.5rem;
									padding: 0.2vh;
									width: 48%;
									float: right;
									border-radius:8px">Remove Marker</button>`

					var showBtn = 
						`<button name="edit-marker" class="edit-marker"
							style="background-color: #618772;
								color: #ffffff;
									height: 2.5rem;
									padding: 0.2vh;
									width: 48%;
									float: left;
									border-radius:8px">Edit Marker</button>`
				

					//Content structure of info Window for the Markers
					var contentString = $(`
					<div class="marker-info-win" style="width: 250px">
						<div class="marker-inner-win">
							<span class="info-content">
							<h1 class="marker-heading">`+mks.markers[i].name+`</h1>
							<p>`+mks.markers[i].addr+`</p>`
							+showBtn+showRemoveBtn+`
							</span>
						</div>
					</div>`);	

					window.marker = new google.maps.Marker({
						position: {lat: mks.markers[i].position.lat, lng: mks.markers[i].position.lng},
						map: map,
						draggable: false,
						title: mks.markers[i].name,
						addr: mks.markers[i].addr,
						icon: iconBase + mks.markers[i].type + iconSuffix,
						info: contentString[0],
						id: mks.markers[i]._id
					});
					
					var showRemoveBtn = 
						`<button name="remove-marker" class="remove-marker"
							style="background-color: #618772;
								color: #ffffff;
									height: 2.5rem;
									padding: 0.2vh;
									width: 48%;
									float: right;
									border-radius:8px">Remove Marker</button>`

					var showBtn = 
						`<button name="edit-marker" class="edit-marker"
							style="background-color: #618772;
								color: #ffffff;
									height: 2.5rem;
									padding: 0.2vh;
									width: 48%;
									float: left;
									border-radius:8px">Edit Marker</button>`
				

					//Content structure of info Window for the Markers
					var contentString = $(`
					<div class="marker-info-win" style="width: 250px">
						<div class="marker-inner-win">
							<span class="info-content">
							<h1 class="marker-heading">`+mks.markers[i].name+`</h1>
							<p>`+mks.markers[i].addr+`</p>`
							+showBtn+showRemoveBtn+`
							</span>
						</div>
					</div>`);	

					window.infowin = new google.maps.InfoWindow();
					
					var removeBtn 	= $(marker.info).find('button.remove-marker')[0];
					var editBtn 	= $(marker.info).find('button.edit-marker')[0];
					
					google.maps.event.addListener(marker, 'click', function() {
						infowin.setContent(this.info);
						infowin.open(map, this);
					});

					google.maps.event.addDomListener(removeBtn, 'click', () => {
						remove_marker(marker, marker.id)
					})

					if(typeof editBtn !== 'undefined') {
						google.maps.event.addDomListener(editBtn, 'click', () => {
							var mReplace = $(marker.info).find('span.info-content'); //html to be replaced after success
							showBtn = 
							`<button name="save-edited-marker" class="save-edited-marker"
								style="background-color: #618772;
									color: #ffffff;
										height: 2.5rem;
										padding: 0.2vh;
										width: 48%;
										float: left;
										border-radius:8px">Save Edited Marker</button>`

							edit_marker(marker.id, marker, marker.title, showForm(marker.title, marker.addr), mReplace, showBtn)
					
						})
					}
					
					
                }

				//############### Remove Marker Function ##############
				function remove_marker(Marker, mID)
				{
					/* determine whether marker is draggable 
					new markers are draggable and saved markers are fixed */
					if(Marker.getDraggable()) 
					{
						Marker.setMap(null); //just remove new marker
					}
					else
					{
						//Remove saved marker from DB and map using jQuery Ajax
						$.ajax({
							type: "DELETE",
							url: "http://localhost:8081/markers/delete/"+mID,
							success:function(){
									Marker.setMap(null)
								},
								error:function (xhr, ajaxOptions, thrownError){
									alert(thrownError); //throw any errors
								}
						});
					}

				}

				//############### Save Marker Function ##############
				function save_marker(Marker, mName, mAddr, mType, replaceWin, showBtn)
				{
					//Save new marker using jQuery Ajax
					var mLat = Marker.getPosition().lat(); //get marker position
					var mLng = Marker.getPosition().lng(); //get marker position
					var myData = {name : mName, addr : mAddr, lat : mLat, lng : mLng, type : mType }; //post variables
					console.log(myData);		
					$.ajax({
					type: "POST",
					url: "http://localhost:8081/add_marker",
					data: myData,
					success:function(data){
							data = $(
							`<div class="marker-info-win" style="width: 250px">
								<div class="marker-inner-win">
									<span class="info-content">
									<h1 class="marker-heading">`+mName+`</h1>
									<p>`+mAddr+`</p>`
									+showBtn+
									`<button name="remove-marker" class="remove-marker" title="Remove Marker"
										style="background-color: #618772;
												color: #ffffff;
												height: 2.5rem;
												padding: 0.2vh;
												width: 48%;
												float: right;
												border-radius:8px">Remove Marker</button>
									</span>
								</div>
							</div>`)

							if(/NP7/.test(mName) && /nap/.test(mType)) {
								iconSuffix = '7';
							} else if (/NP8/.test(mName) && /nap/.test(mType)) {
								iconSuffix = '8';
							} else {
								iconSuffix = '';
							}
					
							replaceWin.html(data[0]); //replace info window with new html
							Marker.setDraggable(false); //set marker to fixed
							Marker.setIcon('http://localhost:8081/icon_'+mType+iconSuffix);
							Marker.setTitle(mName)
						},
						error:function (xhr, ajaxOptions, thrownError){
							alert(thrownError); //throw any errors
						}
					});
				}

				//############### Edit Marker Function ##############
				function edit_marker(mID, Marker, mName, mAddr, replaceWin, showBtn)
				{		
					$.ajax({
					success:function(data){
							data = $(
							`<div class="marker-info-win" style="width: 250px">
								<div class="marker-inner-win">
									<span class="info-content">
									<h1 class="marker-heading">`+mName+`</h1>
									<p>`+mAddr+`</p>`
									+showBtn+
									`<button name="remove-marker" class="remove-marker" title="Remove Marker"
										style="background-color: #618772;
												color: #ffffff;
												height: 2.5rem;
												padding: 0.2vh;
												width: 48%;
												float: right;
												border-radius:8px">Remove Marker</button>
									</span>
								</div>
							</div>`)
					
							replaceWin.html(data[0]); //replace info window with new html

							google.maps.event.addListener(Marker, 'click', () => {
								console.log(Marker)
								var saveEditedBtn = data.find('button.save-edited-marker')[0]
								google.maps.event.addDomListener(saveEditedBtn, 'click', () => {
									
									console.log(saveEditedBtn)
									var mNap = "-NP"+data.find('select.napNum')[0].value;
									var mAddr = data.find('input.addr')[0].value.toUpperCase();
									var mType //type of marker

									if (data.find('select.napNum')[0].value == "null") {
										mType = "lcp"
										mNap = ""
									} else if (data.find('input.res')[0].checked) {
										mType = "reserved"
									} else {
										mType = "nap"
									}

									var mName = data.find('input.lcpCode')[0].value.toUpperCase()+"LP"+
										data.find('input.lcpNum')[0].value+
										mNap.toUpperCase();

									showBtn = 
										`<button name="edit-marker" class="edit-marker"
											style="background-color: #618772;
												color: #ffffff;
												height: 2.5rem;
												padding: 0.2vh;
												width: 48%;
												float: left;
												border-radius:8px">Edit Marker</button>`

									save_edited_marker(mID, Marker, mName, mAddr, mType, replaceWin, showBtn)
								});
							})
							
							
						},
						error:function (xhr, ajaxOptions, thrownError){
							alert(thrownError); //throw any errors
						}
					});
				}

				//############### Save Edited Marker Function ##############
				function save_edited_marker (mID, Marker, mName, mAddr, mType, replaceWin, showBtn) {
					var mLat = Marker.getPosition().lat(); //get marker position
					var mLng = Marker.getPosition().lng(); //get marker position
					var myData = {name : mName, addr : mAddr, lat : mLat, lng : mLng, type : mType }; //post variables
					console.log(myData);		
					$.ajax({
					type: "PUT",
					url: "http://localhost:8081/markers/update/"+mID,
					data: myData,
					success:function(data){
							data = 
							`<div class="marker-info-win" style="width: 250px">
								<div class="marker-inner-win">
									<span class="info-content">
									<h1 class="marker-heading">`+mName+`</h1>
									<p>`+mAddr+`</p>`
									+showBtn+
									`<button name="remove-marker" class="remove-marker" title="Remove Marker"
										style="background-color: #618772;
												color: #ffffff;
												height: 2.5rem;
												padding: 0.2vh;
												width: 48%;
												float: right;
												border-radius:8px">Remove Marker</button>
									</span>
								</div>
							</div>`

							if(/NP7/.test(mName) && /nap/.test(mType)) {
								iconSuffix = '7';
							} else if (/NP8/.test(mName) && /nap/.test(mType)) {
								iconSuffix = '8';
							} else {
								iconSuffix = '';
							}
							replaceWin.html(data); //replace info window with new html
							Marker.setDraggable(false); //set marker to fixed
							Marker.setIcon('http://localhost:8081/icon_'+mType+iconSuffix);
							Marker.setTitle(mName)
						},
						error:function (xhr, ajaxOptions, thrownError){
							alert(thrownError); //throw any errors
						}
					});
				}

				function showForm (MapTitle, MapDesc) {
					if(MapTitle.includes("-")){
                        var lcpNapValue = MapTitle.split("-")
                        var lcpValue = lcpNapValue[0]

                        var area = lcpValue.split("LP")[0]
                        var lcpValue = lcpValue.split("LP")[1]

                        var napValue = lcpNapValue[1].replace("NP","")
                    } else if (MapTitle == "" && MapDesc == "") {
						var area = ""
						var lcpValue = ""
						var napValue = "null"
					} else {
                        var area = MapTitle.split("LP")[0]
                        var lcpValue = MapTitle.split("LP")[1]
                        var napValue = "null"
                    }

					var EditForm = 
						`<div class="marker-edit" style="text-align: left;">
							<form method="POST" name="SaveMarker" id="SaveMarker">
								<label for="lcpCode">Area:</label>
								<input class="lcpCode" name="lcpCode" type="text" placeholder="SFU" value="`+area+`"
									style="text-transform: uppercase; 
											height: 2.5rem; 
											width: 18%; 
											color: #333333;
											background-color: #dad2e2;
											text-indent: 5px;
											border-radius: 5px;
											margin-right: 5px;">
								<label for="lcpNum">LCP:</label>
								<input class="lcpNum" name="lcpNum" type="text" placeholder="168" value="`+lcpValue+`"
									style="text-transform: uppercase; 
											height: 2.5rem; 
											width: 18%; 
											color: #333333;
											background-color: #dad2e2;
											text-indent: 5px;
											border-radius: 5px;
											margin-right: 5px;">
								<label for="napNum">NAP:</label>
								<select class="napNum" name="napNum"
									style="text-transform: uppercase; 
											height: 2.5rem; 
											width: 18%; 
											color: #333333;
											background-color: #dad2e2;
											border-radius: 5px;
											text-indent: 5px">
									`+listOptions(napValue)+`
								</select>
								<br><br>
								<input class="addr" type="text" 
									placeholder="Enter Location (Landmark)..." 
									value="`+MapDesc+`"
									style="text-transform: uppercase; 
											height: 2.5rem; 
											width: 100%; 
											color: #333333;
											background-color: #dad2e2;
											text-indent: 1.5vw;
											border-radius: 5px;"><br><br>
								<input type="checkbox" class="res" name="type" value="reserved"> Reserved
							</form>
						</div>`
					return EditForm
            	}
				
				function listOptions(napValue) {
					var options
					if (napValue == "null") {
						options = `<option value="null" selected>Null</option>`
						for (var i = 1 ; i < 9 ; i++) {
							options += `<option value=`+i+`>`+i+`</option>`
						}
					} else {
						options = `<option value="null">Null</option>`
						var add
						for (var i = 1 ; i < 9 ; i++) {
							if (i == napValue) {
								add = " selected"
							} else {
								add = ""
							}
							options += `<option value=`+i+``+add+`>`+i+`</option>`
						}
					}
				return options
                }
                return map
            }
        )
    },

    methods: {
        async getMarkers () {
            const response = await DataService.fetchMarkers()
            this.markers = response.data.markers
        },
        
        async panToMarker(lpname, lati, long) {
            // window.map.panTo(new google.maps.LatLng(lati,long));
            // window.map.setZoom(15)

            const map = new google.maps.Map(document.getElementById('myMap'), {
				center: {lat: lati, lng: long},
				zoom: 16,
				minZoom: 7,
				mapTypeId: google.maps.MapTypeId.HYBRID
            })

            if (/NP/.test(lpname)) {
                const response = await DataService.getMarker(lpname)
				var mkr = response.data.markers
				
                var iconBase = 'http://localhost:8081/icon_'
                    var iconSuffix
                    if(/NP7/.test(mkr[0].name) && /nap/.test(mkr[0].type)) {
                        iconSuffix = '7';
                    } else if (/NP8/.test(mkr[0].name) && /nap/.test(mkr[0].type)) {
                        iconSuffix = '8';
                    } else {
                        iconSuffix = '';
                    }
                    
                    var contentString = $(`
                        <div class="marker-info-win" style="width: 250px">
                            <div class="marker-inner-win">
                                <span class="info-content">
                                <h1 class="marker-heading">`+mkr[0].name+`</h1>
                                <p>`+mkr[0].addr+`</p>
                                </span>
                            </div>
                        </div>`);	

                    marker = new google.maps.Marker({
                        position: {lat: lati, lng: long},
                        map: map,
                        draggable: false,
                        title: mkr[0].name,
                        addr: mkr[0].addr,
                        icon: iconBase + mkr[0].type + iconSuffix,
                        info: contentString[0],
                        id: mkr[0]._id
                    });

                    var infowin = new google.maps.InfoWindow({
                        content: marker.info
                    });

                    infowin.open(map,marker)
            } else {
				var response = await DataService.getMarker(lpname)
				var lcpMarker =  response.data.markers

				var contentString = $(`
                        <div class="marker-info-win" style="width: 250px">
                            <div class="marker-inner-win">
                                <span class="info-content">
                                <h1 class="marker-heading">`+lcpMarker[0].name+`</h1>
                                <p>`+lcpMarker[0].addr+`</p>
                                </span>
                            </div>
                        </div>`);	

                    marker = new google.maps.Marker({
                        position: {lat: lati, lng: long},
                        map: map,
                        draggable: false,
                        title: lcpMarker[0].name,
                        addr: lcpMarker[0].addr,
                        icon: 'http://localhost:8081/icon_lcp',
                        info: contentString[0],
                        id: lcpMarker[0]._id
                    });

                    var infowin = new google.maps.InfoWindow({
                        content: marker.info
                    });

                    infowin.open(map,marker)

                response = await DataService.fetchLCPMarkers(lpname)
                var markers = response.data.markers

                for (var i = 0; i < markers.length; i++) {
                    var iconBase = 'http://localhost:8081/icon_'
                    var iconSuffix
                    if(/NP7/.test(markers[i].name) && /nap/.test(markers[i].type)) {
                        iconSuffix = '7';
                    } else if (/NP8/.test(markers[i].name) && /nap/.test(markers[i].type)) {
                        iconSuffix = '8';
                    } else {
                        iconSuffix = '';
                    }
                    
                    var contentString = $(`
                        <div class="marker-info-win" style="width: 250px">
                            <div class="marker-inner-win">
                                <span class="info-content">
                                <h1 class="marker-heading">`+markers[i].name+`</h1>
                                <p>`+markers[i].addr+`</p>
                                </span>
                            </div>
                        </div>`);	

                    marker = new google.maps.Marker({
                        position: {lat: markers[i].position.lat, lng: markers[i].position.lng},
                        map: map,
                        draggable: false,
                        title: markers[i].name,
                        addr: markers[i].addr,
                        icon: iconBase + markers[i].type + iconSuffix,
                        info: contentString[0],
                        id: markers[i]._id
                    });
                }
            }
        },
    }
  }
</script>

<style lang="sass" scoped>
.v_card
    margin-top: 6vh
    height: 94vh
    overflow-y: scroll
.td_header
    font-size: 1rem
    color: #e9f5f4
    cursor: pointer
.desc
    font-size: 0.75rem
    color: #74beec
#myMap
    margin-top: 6vh !important
    margin: 0
    height: 94vh
</style>
