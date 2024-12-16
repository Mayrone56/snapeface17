import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
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
  selector: 'app-face-snap',
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
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  txtLikeButton!: string;
  isLiked!: boolean;

  largeNumber: number = 123456789.456;
  percentNumber: number = 0.4567;
  currencyNumber: number = 12345.45;

  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit(): void {
    this.txtLikeButton = 'Like it !';
    this.isLiked = false;
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
