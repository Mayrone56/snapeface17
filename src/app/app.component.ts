import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnap } from './models/face-snap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FaceSnapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  myFirstSnap!: FaceSnap;
  mySnap!: FaceSnap;
  myLastSnap!: FaceSnap;

  ngOnInit(): void {
    this.myFirstSnap = new FaceSnap(
      'Le sanglier de cornouaille',
      '"Mi-ours, Mi-sanglier',
      'https://www.serieously.com/app/uploads/2021/08/sans-titre-28-13.jpg',
      new Date(),
      10
    );
    this.mySnap = new FaceSnap(
      "Coco l'asticot",
      "Mais évidemment c'est sans alcool!!",
      'https://www.serieously.com/app/uploads/2024/08/merlin-kaamelott.jpg',
      new Date(),
      10
    );
    this.myLastSnap = new FaceSnap(
      'Provencal le Gaulois',
      "Tout le monde s'accorde à dire que c'est une tanche et ça c'est pas une légende",
      'https://www.serieously.com/app/uploads/2023/12/perceval-dans-kaamelott.jpg',
      new Date(),
      10
    );
  }
}
