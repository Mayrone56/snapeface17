import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, filter, tap } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Les Observables souscrits avec le pipe  async  sont unsubscribe automatiquement par Angular lors de la destruction du component.
    // AsyncPipe,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // La norme est de mettre un $ à la fin de toute variable qui contient un observable
  // C'est l'mission final qui défini le type de l'observable on passe donc de number à string ici avec le modulo %
  interval$!: Observable<string>;

  ngOnInit(): void {
    // Tant qu'on ne souscrit pas à l'observable il n'emet rien
    // A chaque fois que l'on souscrit on emet une nouvel instance de l'observable auquel on souscrit
    // interval$.subscribe((value) => console.log(value));

    // On proscrit l'utilisation des observable et privilégie l'utilisation du pipe async
    // this.interval$ = interval(1000).pipe(map((value) => value * 10));
    // Grace au pipe à chaque emission on verfiei si le reste de la division est égale à 0
    this.interval$ = interval(1000).pipe(
      // L'ordre des operateurs est tres important car on filtre d'abord les valuers qui sont modulo 3 et à partir de ces valeurs on retourne le modulo % 2
      // Filter et map sont des operateurs bas niveau
      filter((value) => value % 3 === 0),
      // Map est un operateur qui permet de tranformer les emissions d'un observable
      // On passe une fonction à l'operateur map qui défini la transformation à effectuer, ici le modulo %
      map((value) =>
        value % 2 === 0
          ? `Je suis ${value} et je suis pair`
          : `Je suis ${value} et je suis impair`
      ),
      // Side effect, l'emission d'un observable à un effet (side effect) qui sort de l'observable, qui ne modifie pas l'observable
      // Permet de réagir aux différentes emissions sans les modifier
      tap((text) => this.logger(text))
    );
  }
  logger(text: string) {
    console.log(`Log: ${text}`);
  }
}
