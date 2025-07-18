import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agmmap',
  templateUrl: './agmmap.component.html',
  styleUrls: ['./agmmap.component.css'],
})
export class AgmmapComponent implements OnInit {
  start_end_mark: any = [];
  public lat = 24.799448;
  public lng = 120.979021;

  public origin: any;
  public destination: any;

  latlng: any = [
    [12.91085968511271, 77.59732158021465],
    [12.957026562282568, 77.70376059233313],
  ];
  constructor() {
    this.start_end_mark.push(this.latlng[0]);
    this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
  }
  markers: any = [];
  ngOnInit(): void {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
    this.markers = [
      {
        lat: 12.918141262573174,
        lng: 77.59920749555883,
        label: 'JayDeva Hospital',
        draggable: true,
      },
      {
        lat: 12.916770077148108,
        lng: 77.62327540719872,
        label: 'Silkboard junction',
        draggable: false,
      },
      {
        lat: 12.921102609111188,
        lng: 77.64108460217038,
        label: 'Agara',
        draggable: true,
      },
    ];
  }

  zoom: number = 12;

  // initial center position for the map


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    });
  }

  markerDragEnd(m: any, $event: any) {
    console.log('dragEnd', m, $event);
  }
}
