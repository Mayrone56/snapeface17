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
  mySnap!: FaceSnap;

  ngOnInit(): void {
    this.mySnap = new FaceSnap(
      "Coco l'asticot",
      'Mon meilleur ami depuis tout petit !',
      'https://www.serieously.com/app/uploads/2024/08/merlin-kaamelott.jpg',
      new Date(),
      10
    );
  }
}
