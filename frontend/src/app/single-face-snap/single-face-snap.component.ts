import {
  DatePipe,
  LowerCasePipe,
  NgClass,
  NgStyle,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    // DecimalPipe,
    // PercentPipe,
    // CurrencyPipe,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {
  // faceSnap local remplacé par le faceSnap$ Observable
  // faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>;
  txtLikeButton!: string;
  isLiked!: boolean;

  largeNumber: number = 123456789.456;
  percentNumber: number = 0.4567;
  currencyNumber: number = 12345.45;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }

  // onLike(): void {
  //   if (this.isLiked) {
  //     this.unLike();
  //   } else {
  //     this.addLike();
  //   }
  // }

  // addLike(faceSnapId: number) {
  //   // this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'like');
  //   // this.txtLikeButton = 'Liked !';
  //   // this.isLiked = true;
  //   this.faceSnapsService.snapFaceSnapById(faceSnapId, 'like');
  //   this.txtLikeButton = 'Liked !';
  //   this.isLiked = true;
  // }

  // unLike(faceSnapId: number) {
  //   // this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unlike');
  //   // this.txtLikeButton = 'Like it !';
  //   // this.isLiked = false;
  //   this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unlike');
  //   this.txtLikeButton = 'Like it !';
  //   this.isLiked = false;
  // }

  onLike(faceSnapId: number): void {
    // if (this.txtLikeButton === "Like it !") {
    if (!this.isLiked) {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, "like").pipe(
        tap(() => {
          // With this implementation, there is no need to even call .subscribe() because the template's async pipe subscribes for us
          this.txtLikeButton = "Liked !"
          this.isLiked = true
        })
      );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, "unlike").pipe(
        tap(() => {
          this.txtLikeButton = "Like it !"
          this.isLiked = false;

        })
      );
    }
  }

  // Les private se mettent à la fin
  // Private car appelé uniquement à l'interieur de la classe
  private getFaceSnap() {
    // Snapshot est un aperçu instantané d'une valeur qui change au cours du temps
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  private prepareInterface() {
    this.txtLikeButton = 'Like it !';
    this.isLiked = false;
  }
}
