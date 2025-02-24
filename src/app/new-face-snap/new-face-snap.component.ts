import { Component, OnInit } from '@angular/core';
// Le fait d'avoir importé ReactiveFormsModule vous permet de lier un objet de type FormGroup à un <form> avec l'attribut formGroup .
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap';
import { UpperCasePipe, DatePipe, CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

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
  // L'interet ici est à chaque fois que cet observable va emettre la preview de facesnap on va pouvoir afficher sa valeur en temps réel
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private faceSnapsService: FaceSnapsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    // Formulaire reactif qui peut se faire à la place des formulaires template que l'on trouve directement dans le html
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      // Contrairement aux Validators required, le Validator pattern prend un argument, il faut donc lui passer le regex en argument
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null],
    },
      //  updateOn: 'blur' permet de valider le formulaire uniquement lorsque l'utilisateur a fini de remplir le champ
      { updateOn: 'blur' }
    );
    // Les formulaire sont reactifs
    // valueChanges est un observable qui va emettre tout l'objet du formGroup à chaque fois que la valeur d'un des champs va
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        createdDate: new Date(),
        snaps: 0,
        id: 0,
      }))
    );
  }

  onSubmitForm(): void {
    // console.log(this.snapForm.value);
    this.faceSnapsService.addFaceSnap(this.snapForm.value)
    this.router.navigateByUrl('/facesnaps')
  }
}
