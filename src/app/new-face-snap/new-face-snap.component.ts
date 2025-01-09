import { Component, OnInit } from '@angular/core';
// Le fait d'avoir importé ReactiveFormsModule vous permet de lier un objet de type FormGroup à un <form> avec l'attribut formGroup .
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap';
import { UpperCasePipe, DatePipe, CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    DatePipe,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss',
})
export class NewFaceSnapComponent implements OnInit {
  // FormGroup va permettre de sauvegarder le formulaire et recuperer la valeur des champs
  snapForm!: FormGroup;
  // L'interet ici est à chaque fois que cet observable va emettre la preview deu facesnap on va pouvoir afficher sa valeur en temps réel
  faceSnapPreview$!: Observable<FaceSnap>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Formulaire reactif qui peut se faire à la place des formulaires template que l'on trouve directement dans le html
    this.snapForm = this.formBuilder.group({
      title: [null],
      description: [null],
      imgUrl: [null],
      location: [null],
    });
    // Les formulaire sont reactifs
    // valueChanges est un observable qui va emettre tout l'objet du formGroup à chaque fois que la valeur d'un des champs va
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        createdDate: new Date(),
        id: 0,
        likeNb: 0,
      }))
    );
  }

  onSubmitForm(): void {
    console.log(this.snapForm.value);
  }
}
