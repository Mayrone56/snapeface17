import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../services/face-snaps.service';
import { interval, Observable, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [FaceSnapComponent],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss',
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps!: FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;
  // On crée un subject qu'on déclare et initialise qui va emettre des boolean
  // Subject est un type special d'observable, on peut le faire emttre à la demande
  // Un subject est typé comme tout Observable
  private destroy$!: Subject<boolean>;

  constructor(private faceSnapsServices: FaceSnapsService) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    // this.faceSnaps = this.faceSnapsServices.getAllFaceSnaps();

    interval(1000)
      .pipe(
        // Prendre des valeurs de l'observable jusqu'à ce que this.destroy$ emette quelque chose, ici la destruction du composant
        // Evite les fuites de memoire
        // On passe a takeUnitil le subject
        // Cet opérateur dit à l'Observable interval de continuer à émettre tant que destroy$ n'a pas émis
        // Mais dès que destroy$ émet, de compléter l'Observable.
        takeUntil(this.destroy$),
        // On utilise l'operator take quand on sait combien d'emission nous interesse, ici la premiere
        // take(1),
        tap(console.log)
      )
      .subscribe();
  }

  // Methode appelée au moment de la destruction du composant
  // ngOnDestroy se met à la fin de la classe
  ngOnDestroy(): void {
    // On fait emettre le subject au moment de la destruction du composant
    // La methode next vient de l'observable Subject
    this.destroy$.next(true);
  }
}
