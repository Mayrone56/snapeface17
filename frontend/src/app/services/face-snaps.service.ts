import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { snapType } from '../models/like-type.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: snapType): Observable<FaceSnap> {
    // const faceSnap = this.getFaceSnapById(faceSnapId);
    // snapType === "like" ? faceSnap.snaps++ : faceSnap.snaps--;
    // // faceSnap.like(snapType);
    // The return type is a Observable<FaceSnap> because the final PUT request return a modified FaceSnap 
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        // snpas number is incremented or decremented depending on the snapType
        snaps: faceSnap.snaps + (snapType === "like" ? 1 : -1)
      })),
      // SwitchMap takes the modified FaceSbap and generate a PUT request witch put of httpClient
      // Put takes url for first parameter and the request body for the second parameter
      // And return the Observable
      //// Here we use switchMap (but a GET is issued once and completes) but all other operators (mergeMap...) can be used, this is just a use case in this situation
      switchMap(updateFaceSnap => this.http.put<FaceSnap>(
        `http://localhost:3000/facesnaps/${faceSnapId}`,
        updateFaceSnap
      ))
    )
  }

  // addFaceSnap(formValue: {
  //   title: string,
  //   description: string,
  //   imageUrl: string,
  //   location?: string
  // }): void {
  //   const faceSnap: FaceSnap = {
  //     ...formValue,
  //     createdDate: new Date(),
  //     snaps: 0,
  //     // This increments the id of the last element by 1 to generate a new unique id
  //     // For the new item being added to the array
  //     // Detailed explanation for the id:
  //     // this.faceSnaps is the table above
  //     // this.faceSnaps.length allows you to retrieve the length of the table which starts at 0
  //     // // To retrieve the id of the last element you must therefore remove 1 from the table
  //     // Finally we retrieve the id with .id and we add +1 to the id to create the new id
  //     id: this.faceSnaps[this.faceSnaps.length - 1].id + 1,
  //   };
  //   // On ajoute alors le facesnap qu'on vient de creer
  //   this.faceSnaps.push(faceSnap);
  // }

  addFaceSnap(formValue: {
    title: string,
    description: string,
    imageUrl: string,
    location?: string
  }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      // / We sort the faceSnaps by their id
      // We separate the map operator for the readability of the code
      map(faceSnaps => [...faceSnaps].sort((a, b) => a.id - b.id)),
      // We take the latest facesnap from the array that we find with the array length -1
      map(sortedFacesnpas => sortedFacesnpas[sortedFacesnpas.length - 1]),
      // We add a facesnap by taking the last id and incrementing it by 1
      map(previousFacesnap => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnap.id + 1
      })),
      // As PUT request the POST request takes 2 arguments, the url and the request body
      // The return type is a Observable<FaceSnap> because the final POST request return a modified FaceSnap
      switchMap(newFacesnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFacesnap))
    )
  }
}
