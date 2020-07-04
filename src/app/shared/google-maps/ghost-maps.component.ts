import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-ghost-maps',
  templateUrl: './ghost-maps.component.html',
  styleUrls: ['./ghost-maps.component.css']
})
export class GhostMapsComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  @Input('lat') lat: number = -17.4131228;
  @Input('lng') lng: number = -66.0939994;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 16
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    draggable: true
  });

  constructor() { }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.marker.addListener('dragend', () => this.setPosition(this.marker.getPosition()))
  }

  setPosition(position) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: position }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        /**
         * @TODO do something with the response { results[0]: { formatted_address, geometry } }
         */
      }
      else {
        /**
         * @TODO do something with if parse fail, maybe return direclty the position?
         */
      }
    }
    );
  }

}
