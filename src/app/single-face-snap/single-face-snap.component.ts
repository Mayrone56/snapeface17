import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { ActivatedRoute } from '@angular/router';
import {
  NgStyle,
  NgClass,
  UpperCasePipe,
  LowerCasePipe,
  TitleCasePipe,
  DatePipe,
  // DecimalPipe,
  // PercentPipe,
  // CurrencyPipe,
} from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { LikeType } from '../models/like-type.type';

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
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {
  txtLikeButton!: string;
  isLiked!: boolean;

  largeNumber: number = 123456789.456;
  percentNumber: number = 0.4567;
  currencyNumber: number = 12345.45;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.txtLikeButton = 'Like it !';
    this.isLiked = false;
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onLike(): void {
    if (this.isLiked) {
      this.unLike();
    } else {
      this.addLike();
    }
  }

  addLike() {
    this.faceSnapsService.likeFaceSnapById(this.faceSnap.id, 'like');
    this.txtLikeButton = 'Liked !';
    this.isLiked = true;
  }

  unLike() {
    this.faceSnapsService.likeFaceSnapById(this.faceSnap.id, 'unlike');
    this.txtLikeButton = 'Like it !';
    this.isLiked = false;
  }
}
