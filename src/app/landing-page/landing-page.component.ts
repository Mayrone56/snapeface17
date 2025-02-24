import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  // Relé avec le two way binding
  userEmail!: string;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onContinue() {
    // navigation programmatique, qui est une autre façon que routerLink
    this.router.navigateByUrl('facesnaps');
  }

  // onSubmitForm() {
  //   console.log(this.userEmail);
  // }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
  }
}
