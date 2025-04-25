import { Routes } from '@angular/router';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {ConnexionComponent} from './pages/connexion/connexion.component';
import {Page404Component} from './pages/page404/page404.component';
import {EditProductComponent} from './pages/edit-product/edit-product.component';
import {connecteGuard} from './services/connecte.guard';
import {ListeProduitsComponent} from './pages/liste-produits/liste-produits.component';
import {vendeurGuard} from './services/vendeur.guard';

export const routes: Routes = [
  {path : "accueil", component: AccueilComponent, canActivate: [connecteGuard]},
  {path : "connexion", component: ConnexionComponent},
  {path : "ajout-product", component: EditProductComponent, canActivate: [vendeurGuard]},
  {path : "modifier-product/:id", component: EditProductComponent, canActivate: [vendeurGuard]},
  {path : "liste-produit", component: ListeProduitsComponent, canActivate: [vendeurGuard]},
  {path : "", redirectTo: "accueil", pathMatch: "full"},
  {path : "**", component: Page404Component},
];

