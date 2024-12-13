import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-face-snap',
  imports: [NgStyle, NgClass],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  txtLikeButton!: string;
  isLiked!: boolean;

  ngOnInit(): void {
    this.txtLikeButton = 'Like it !';
    this.isLiked = false;
  }

  onLike(): void {
    // this.likeNb === 0 ? (this.likeNb += 1) : (this.likeNb -= 1);
    if (this.isLiked) {
      this.unLike();
    } else {
      this.like();
    }
  }

  like() {
    this.faceSnap.like();
    this.txtLikeButton = 'Liked !';
    this.isLiked = true;
  }

  unLike() {
    this.faceSnap.unLike();
    this.txtLikeButton = 'Like it !';
    this.isLiked = false;
  }
}
