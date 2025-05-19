import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-validation-email',
  imports: [
    FormsModule,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './validation-email.component.html',
  styleUrl: './validation-email.component.scss'
})
export class ValidationEmailComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute)
  http = inject(HttpClient)
  notification = inject(NotificationService)
  router = inject(Router)
  token? : string;

  ngOnInit() {

    this.activatedRoute.params.
    subscribe(parametres => {

      if (parametres['token']) {
        this.token = parametres['token']

      }
    })
  }

  // TODO à mettre dans un service d'authentification
  onValidationInscription() {

    this.http
      .post<{
        token: string,
        consentementUtilisationDonnees: boolean
      }>("http://localhost:8080/validation-email/", {token: this.token, consentementUtilisationDonnees: true})
      .subscribe({
        next: resultat => {
          this.notification.show("Votre inscription est finalisée, vous pouvez vous connecter", "valid")
          this.router.navigateByUrl("/connexion")
        }

      })
  }
}
