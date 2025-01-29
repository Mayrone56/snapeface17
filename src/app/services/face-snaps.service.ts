import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { snapType } from '../models/like-type.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  constructor(
    private http: HttpClient
  ) { }

  // private faceSnaps: FaceSnap[] = [
  //   new FaceSnap(
  //     'Le sanglier de cornouaille',
  //     '"Mi-ours, Mi-sanglier',
  //     'https://www.serieously.com/app/uploads/2021/08/sans-titre-28-13.jpg',
  //     new Date(),
  //     10
  //   ),
  //   new FaceSnap(
  //     "Coco l'asticot",
  //     "Mais évidemment c'est sans alcool!!",
  //     'https://www.serieously.com/app/uploads/2024/08/merlin-kaamelott.jpg',
  //     new Date(),
  //     10
  //   )
  //   // .withLocation('Laboratiore de Merlin')
  //   ,
  //   new FaceSnap(
  //     'Provencal le Gaulois',
  //     "Tout le monde s'accorde à dire que c'est une tanche et ça c'est pas une légende",
  //     'https://www.serieously.com/app/uploads/2023/12/perceval-dans-kaamelott.jpg',
  //     new Date(),
  //     10
  //   ),
  // ];

  faceSnaps: FaceSnap[] = [];

  // getAllFaceSnaps(): FaceSnap[] {
  //   return [...this.faceSnaps];
  // }

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    // Requete HTTP pour récupérer les facesnaps
    // Retroune des Observables qui gerent l'asynchrone
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    // const foundFaceSnap = this.faceSnaps.find(
    //   (faceSnap) => faceSnap.id === faceSnapId
    // );
    // if (!foundFaceSnap) {
    //   throw new Error('FaceSnap not found!');
    // }
    // return foundFaceSnap;
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`)
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);

  }

  snapFaceSnapById(faceSnapId: string, snapType: snapType): void {
    // const faceSnap = this.getFaceSnapById(faceSnapId);
    // snapType === "like" ? faceSnap.snaps++ : faceSnap.snaps--;
    // // faceSnap.like(snapType);
  }

  addFaceSnap(formValue: {
    title: string,
    description: string,
    imageUrl: string,
    location?: string
  }): void {
    const faceSnap: FaceSnap = {
      ...formValue,
      createdDate: new Date(),
      snaps: 0,
      // This increments the id of the last element by 1 to generate a new unique id
      // For the new item being added to the array
      // Detailed explanation for the id:
      // this.faceSnaps is the table above
      // this.faceSnaps.length allows you to retrieve the length of the table which starts at 0
      // // To retrieve the id of the last element you must therefore remove 1 from the table
      // Finally we retrieve the id with .id and we add +1 to the id to create the new id
      id: this.faceSnaps[this.faceSnaps.length - 1].id + 1,
    };
    // On ajoute alors le facesnap qu'on vient de creer
    this.faceSnaps.push(faceSnap);
  }

}
