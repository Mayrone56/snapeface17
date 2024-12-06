import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';

@Component({
  selector: 'app-face-snap',
  imports: [],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  txtLike!: string;
  isLiked!: boolean;

  ngOnInit(): void {
    this.title = 'Teddy Bear';
    this.description = 'My best friend';
    this.imgUrl =
      'https://plus.unsplash.com/premium_photo-1664373233010-7c4abae40f78?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    this.createdDate = new Date();
    this.likeNb = 0;
    this.txtLike = 'Like it !';
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
    this.likeNb += 1;
    this.txtLike = 'Liked !';
    this.isLiked = true;
  }

  unLike() {
    this.likeNb -= 1;
    this.txtLike = 'Like it !';
    this.isLiked = false;
  }
}
