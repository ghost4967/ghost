import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Modes } from './modes';

@Component({
  selector: 'app-ghost-maps',
  templateUrl: './ghost-maps.component.html',
  styleUrls: ['./ghost-maps.component.css']
})
export class GhostMapsComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  private _mode = '';
  @Output() positionEmitter = new EventEmitter<object>();
  @Input() lat: number = -17.4131228;
  @Input() lng: number = -66.0939994;
  @Input('mode')
  set mode(mode: string) {
    this._mode = (mode === Modes.Edit || mode === Modes.View) ? mode : 'Invalid mode';
  };
  get mode(): string { return this._mode; };

  mapOptions: google.maps.MapOptions = {
    zoom: 16
  };
  marker = new google.maps.Marker({
    map: this.map
  });

  ngAfterViewInit() {
    const position = new google.maps.LatLng(this.lat, this.lng);
    this.initMap(position);
  }

  initMap(position: google.maps.LatLng) {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.marker.setDraggable(this.mode === Modes.Edit);
    if (this.mode == Modes.Edit) {
      this.marker.addListener('dragend', () => this.setPosition(this.marker.getPosition()));
      this.initGeolocation(this.map, this.marker);
    } else {
      this.map.setCenter(position);
      this.marker.setPosition(position);
    }
  }

  setPosition(position) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: position }, this.handlePosition());
  }

  handlePosition() {
    const emitter = this.positionEmitter;
    return function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        emitter.emit({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng() 
        });
      }
      else {
        /**
         * @TODO do something with if parse fail, maybe return direclty the position?
         */
      }
    }
  }

  initGeolocation(map, marker) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          marker.setPosition(pos);
        },
        function () {
          this.handleLocationError(true, map.getCenter(), map);
        }
      );
    } else {
      this.handleLocationError(false, map.getCenter(), map);
    }
  }

  handleLocationError(browserHasGeolocation, pos, map) {
    /**
     * @TODO show toast of info if geolocation no available
     */
    map.setCenter(pos);
  }

}
