import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);
  auth = inject(AuthService);

  formulaire = this.formBuilder.group({
    email: ['z@z.com', [Validators.required, Validators.email]],
    password: ['root', [Validators.required]],
  })

  onConnexion() {
    if(this.formulaire.valid) {

      this.http
        .post(
          "http://localhost:8080/inscription",
          this.formulaire.value)
        .subscribe({
          next : jwt => {
            this.router.navigateByUrl("/connexion")
            this.notification.show("un lien de confiramtion couas a été envoyé sur l'adresse email que vous avez fourni, " +
              "cliquez sur ce lien avant de vous connecter", "warning")
          },

          error : erreur => {
            if(erreur.status === 409) {
              this.notification.show("Cet email est déjà utilisé", "error")
            }
          }

        })



    }

  }
}
