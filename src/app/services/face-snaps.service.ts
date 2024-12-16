import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  private faceSnaps: FaceSnap[] = [
    new FaceSnap(
      'Le sanglier de cornouaille',
      '"Mi-ours, Mi-sanglier',
      'https://www.serieously.com/app/uploads/2021/08/sans-titre-28-13.jpg',
      new Date(),
      10
    ),
    new FaceSnap(
      "Coco l'asticot",
      "Mais évidemment c'est sans alcool!!",
      'https://www.serieously.com/app/uploads/2024/08/merlin-kaamelott.jpg',
      new Date(),
      10
    ).withLocation('Laboratiore de Merlin'),
    new FaceSnap(
      'Provencal le Gaulois',
      "Tout le monde s'accorde à dire que c'est une tanche et ça c'est pas une légende",
      'https://www.serieously.com/app/uploads/2023/12/perceval-dans-kaamelott.jpg',
      new Date(),
      10
    ),
  ];

  getFaceSnaps(): FaceSnap[] {
    return [...this.faceSnaps];
  }
}
