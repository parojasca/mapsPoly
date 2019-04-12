import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  LatLng,
  GoogleMapsAnimation,
  MyLocation,
  Polygon,
  BaseArrayClass,
  ILatLng,
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: GoogleMap;
  loading: any;
  GORYOKAKU_POINTS: ILatLng[] = [
    
  ];
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform) { }

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
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
   
  
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((params: any[]) => {
      const latLng: LatLng = params[0];
     let agr= this.GORYOKAKU_POINTS.push(latLng);
      console.log(JSON.stringify(location, null, 2));
      this.map.addMarkerSync({
        position: latLng,
        title: latLng.toString(),
        animation: GoogleMapsAnimation.DROP
      });
    });

  
    
  }
  async onButtonClick() {
    this.map.clear();
/* 
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
 */
}

async pintarPoligonp(){
 
  let polygon: Polygon = this.map.addPolygonSync({
    'points': this.GORYOKAKU_POINTS,
    'strokeColor' : '#AA00FF',
    'fillColor' : '#00FFAA',
    'strokeWidth': 10
  });
  let points: BaseArrayClass<ILatLng> = polygon.getPoints();

  points.forEach((latLng: ILatLng, idx: number) => {
    let marker: Marker = this.map.addMarkerSync({
      draggable: true,
      position: latLng
    });
    marker.on(GoogleMapsEvent.MARKER_DRAG).subscribe((params) => {
      let position: LatLng = params[0];
      points.setAt(idx, position);
    });
  });


}
}





