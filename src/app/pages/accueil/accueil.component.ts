import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {NgStyle} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ImgSecuredDirective} from '../../components/img-secured/img-secured.directive';


// @ts-ignore
@Component({
  selector: 'app-accueil',
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterLink,
    NgStyle,
    ImgSecuredDirective
    ],
    templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  // titre = "Accueil"
  // compteur = 0
  //
  // onClic() {
  //   //console.log("coucou");
  //   this.compteur ++
  // }
  http = inject(HttpClient); // inject pour récupérer un service
  products: Product[] = []
  auth = inject(AuthService);

  // méthode qui se déclenche dès que le composant a fini d'etre initialisé
  ngOnInit() {

    // const jwt = localStorage.getItem("jwt"); // on dégage ça + le if ensuite puisque ce sera fait automatiquement
    // if (jwt) {

      this.http
        .get<Product[]>("http://localhost:8080/products")
        // {headers: {Authorization: "Bearer " + jwt }}) // lien entre front & back → ligne enlevée avec automatisation authorization jwt → voir jwt.interceptor
        .subscribe(products => this.products = products) // on récupère la liste products
    }


}
