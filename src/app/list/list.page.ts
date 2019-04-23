import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Polyline,
  LatLng,
  GoogleMapsAnimation,
  Marker,
  ILatLng,
  BaseArrayClass
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  map: GoogleMap;
  LINEA:ILatLng[] = [];

  constructor(private platform: Platform) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 4.662235,
          lng: -74.068886
        },
        zoom: 18,
        tilt: 30
      }
    });

   


  this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((params: any[]) => {
    // let position: LatLng = <LatLng>params[0];
    const position: LatLng = params[0];
    this.LINEA.push(position);
   this.map.addMarkerSync({
      position: position,
      title: position.toUrlValue(),
      animation: GoogleMapsAnimation.DROP,
      icon: { url : './assets/img/cuerpo_de_agua.png' }
      //disableAutoPan: true
    });
    //marker.showInfoWindow();
  });
  }

  async ObtonBorrar(){
this.map.clear();
this.LINEA=[];
  }
async pintarLinea(){
 let polyline: Polyline = this.map.addPolylineSync({
    points: this.LINEA,
    color: '#3e8dc9',
    width: 10,
    geodesic: true,
 //iconData: './assets/img/cuerpo_de_agua.png'
 icon: { url : './assets/img/cuerpo_de_agua.png' }
    //clickable: true  // clickable = false in default
  });
 
}
 
}
