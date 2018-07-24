<template>
    <div class="hello">
        <keep-alive>
            <div id="myMap"></div>
        </keep-alive>
    </div>
</template>

<script>
import DataService from '@/services/DataService'
export default {
    name: 'app',
    data () {
        return {
        }
    },
    mounted: async function() {

         function Get(yourUrl){
            var Httpreq = new XMLHttpRequest(); // a new request
            Httpreq.open("GET",yourUrl,false);
            Httpreq.send(null);
            return Httpreq.responseText;          
        }

        var mks = JSON.parse(Get("http://localhost:8081/markers"));
        console.log("map: ", google.maps)
        var map = new google.maps.Map(document.getElementById('myMap'), {
            center: {lat:17.3346992, lng: 120.6602026},
            zoom: 8,
            minZoom: 8,
            mapTypeId: google.maps.MapTypeId.HYBRID
        })

        function getInfoWinContent(i) {
             var contentString = `
                 <div>
                     <h3>`+mks.markers[i].name+`</h3>
                     <br>
                     <h5>`+mks.markers[i].addr+`</h5>
                 </div>
             `;
             return contentString;
         }
 
         var iconSuffix = '';
 
         for (var i = 0; i < mks.markers.length; i++) {
            var iconBase = 'http://localhost:8081/icon_'
            var icons = {
            parking: {
                name: 'LCP',
                icon: iconBase + 'parking_lot_maps.png'
            },
            library: {
                name: 'Library',
                icon: iconBase + 'library_maps.png'
            },
            info: {
                name: 'Info',
                icon: iconBase + 'info-i_maps.png'
            }
            };

            var iconBase = 'http://localhost:8081/icon_'
            if(/NAP7/.test(mks.markers[i].name) && /nap/.test(mks.markers[i].type)) {
                iconSuffix = '7';
            } else if (/NAP8/.test(mks.markers[i].name) && /nap/.test(mks.markers[i].type)) {
                iconSuffix = '8';
            } else {
                iconSuffix = '';
            }

            var infowindow = new google.maps.InfoWindow();

            let marker = new google.maps.Marker({  
                position: {lat: mks.markers[i].position.lat, lng: mks.markers[i].position.lng},
                map: this.map,
                map: map,
                icon: iconBase + mks.markers[i].type + iconSuffix,
                title: mks.markers[i].name,
                info: getInfoWinContent(i)
            })
        //     var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // // Add some markers to the map.
        // // Note: The code uses the JavaScript Array.prototype.map() method to
        // // create an array of markers based on a given "locations" array.
        // // The map() method here has nothing to do with the Google Maps API.
        // var markers = locations.map(function(location, i) {
        //   return new google.maps.Marker({
        //     position: location,
        //     label: labels[i % labels.length]
        //   });
        // });

        // // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(map, markers,
        //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
        //     );
        // var location = [
        //     {lat: 17.570490, lng: 120.387330},
        //     {lat: 15.059394, lng: 120.656705}
        // ]
            iconSuffix = '';
 
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(this.info);  
                infowindow.open(this.map, this);
                infowindow.open(map, this);
            });
        }

        map.addListener('click', function(e) {
            placeMarkerAndPanTo(e.latLng, map);
        });


        function placeMarkerAndPanTo(latLng, map) {

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: 'http://localhost:8081/icon_null',
                draggable: true
            });
            map.panTo(latLng);

            var contentMarker = '<div style="position:relative; width: 18vw; ovevrflow: hidden;">'+
                                    '<form>'+
                                        '<input type"text" placeholder="LCP" style=" text-indent: 1.5vw; text-transform: uppercase; height: 5vh; width: 100%; color: #333333; background-color: #f2f2f2;">'+
                                        '<br>'+
                                        '<input type"text" placeholder="NAP" style=" margin-top: 2vh; text-transform: uppercase; text-indent: 1.5vw; height: 5vh; width: 100%; color: #333333; background-color: #f2f2f2;">'+
                                        '<br>'+
                                        '<input type"text" placeholder="Location" style=" margin-top: 2vh; text-transform: uppercase; text-indent: 1.5vw; height: 5vh; width: 100%; color: #333333; background-color: #f2f2f2;">'+
                                        '<br>'+
                                        '<button type="button" style="background-color: red; color: #ffffff; height: 5vh; padding: 0.2vh; margin-top: 2vh; margin-right: 5px; width: 48%;">Delete</button>'+
                                        '<button type="button" style="background-color: green; color: #ffffff; height: 5vh; padding: 0.2vh; margin-top: 2vh; width: 48%;">Add</button>'+
                                    '</form>'+
                                '</div>'
            // var contentMarker =  '<v-layout>'+
            //                         '<v-flex xs12 sm6 offset-sm3>'+
            //                         '<v-card>'+
            //                             '<v-card-media'+
            //                            ' src="https://s3.amazonaws.com/vuetify-docs/images/cards/desert.jpg"'+
            //                             'height="200px"'+
            //                             '></v-card-media>'+

            //                             '<v-card-title primary-title>'+
            //                             '<div>'+
            //                                 '<h3 class="headline mb-0">Kangaroo Valley Safari</h3>'+
            //                                 '<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>'+
            //                             '</div>'+
            //                             '</v-card-title>'+

            //                             '<v-card-actions>'+
            //                             '<v-btn flat color="orange">Share</v-btn>'+
            //                             '<v-btn flat color="orange">Explore</v-btn>'+
            //                             '</v-card-actions>'+
            //                         '</v-card>'+
            //                         '</v-flex>'+
            //                     '</v-layout>'
            google.maps.event.addListener(marker, 'click', function() {
                var infowindow = new google.maps.InfoWindow({
                    content: contentMarker
                });
                infowindow.open(map, marker);
            });
        }
    },
    methods: {
    }
}
</script>

<style lang="sass" scoped>
#myMap 
    height: 94vh
    position: relative;
    top: 6vh
</style>
