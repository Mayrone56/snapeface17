import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent {
  @Input() faceSnap!: FaceSnap;

  constructor(private router: Router) {}

  onViewFaceSnap() {
    // Que l'on retrouve dans app.routes
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}
